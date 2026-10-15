#!/usr/bin/env python3
"""
Arena badge renderer.

Reads 1024x1024 AI art from badges/src/, and produces:
  badges/gif/<slug>.gif  -> 256x256 looping animated badge (rounded corners, transparent outside)
  badges/png/<slug>.png  -> 512x512 static badge

Animation layers: rotating aura ring, orbiting sparkles, shine sweep, subtle glow pulse.
Run:  python3 badges/build_badges.py   (from the repo root)
"""
import colorsys
import numpy as np
import math
import os

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "src")
GIF_OUT = os.path.join(HERE, "gif")
PNG_OUT = os.path.join(HERE, "png")

GIF_SIZE = 224        # exported animation resolution
STATIC_SIZE = 512     # exported static resolution
FRAMES = 16           # frames per loop
DURATION_MS = 56      # 16 x 56ms = ~0.9s loop
CORNER_RADIUS = 0.16  # fraction of size
RING_R = 0.462        # aura ring radius (fraction of size)
RING_W = 0.030        # aura ring width (fraction of size)
ORBIT_R = 0.500       # orbit dots radius (fraction of size)

# Badge config: slug -> accent color of the aura ring (RGB). 'rainbow' = prismatic.
BADGES = {
    "first-vote":       (0x70, 0xd6, 0x6a),   # green sprout
    "streak-fire":      (0xff, 0x9d, 0x3d),   # flame orange
    "vote-milestone":   (0xf2, 0xc1, 0x4e),   # gold star
    "model-whisperer":  (0xb0, 0x7b, 0xff),   # violet lens
    "oracle":           "rainbow",            # prismatic
    "arena-elite":      (0x9f, 0xd8, 0xff),   # platinum blue
    "founding-voter":   (0x5e, 0xea, 0xd4),   # teal comet
}


# ----------------------------------------------------------------------------- helpers

def rounded_mask(size, radius):
    """Anti-aliased rounded-rectangle alpha mask."""
    ss = 4
    big = size * ss
    mask = Image.new("L", (big, big), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, big - 1, big - 1], radius=radius * ss, fill=255)
    return mask.resize((size, size), Image.LANCZOS)


def radial_blob(size, cx, cy, sigma, intensity):
    """Gaussian glow blob as an RGBA overlay, numpy-based."""
    big = size * 2  # supersample for smooth blobs
    s = big / size
    y, x = np.mgrid[0:big, 0:big].astype(np.float32)
    dist2 = (x - cx * s) ** 2 + (y - cy * s) ** 2
    alpha = intensity * np.exp(-dist2 / (2 * (sigma * s) ** 2))
    alpha = (np.clip(alpha, 0, 1) * 255).astype(np.uint8)
    a = Image.fromarray(alpha, "L")
    return a.resize((size, size), Image.LANCZOS)


def aura_ring(size, phase, color):
    """Rotating segmented highlight on the aura ring. color: 'rainbow' or RGB tuple."""
    ss = 2
    big = size * ss
    y, x = np.mgrid[0:big, 0:big].astype(np.float32)
    cx = cy = (big - 1) / 2.0
    r = np.sqrt((x - cx) ** 2 + (y - cy) ** 2)
    ang = np.arctan2(y - cy, x - cx)

    r_in = (RING_R - RING_W / 2) * big
    r_out = (RING_R + RING_W / 2) * big
    ring = ((r >= r_in) & (r <= r_out)).astype(np.float32)

    # moving highlight: one bright lobe + two soft lobes
    lobe = np.maximum(0.0, np.cos(ang - phase)) ** 5
    lobe += 0.35 * np.maximum(0.0, np.cos(ang - phase - 2.2)) ** 3
    lobe += 0.35 * np.maximum(0.0, np.cos(ang - phase + 2.2)) ** 3
    alpha = np.clip(lobe, 0, 1) * ring * 0.95

    if color == "rainbow":
        hue = (ang / (2 * math.pi)) % 1.0
        r_, g_, b_ = [], [], []
        hue_flat = hue[alpha > 0]
        for h in np.unique(hue_flat):
            rr, gg, bb = colorsys.hsv_to_rgb(h, 0.85, 1.0)
            r_.append(rr); g_.append(gg); b_.append(bb)
        rgba = np.zeros((big, big, 4), dtype=np.float32)
        for h, rr, gg, bb in zip(np.unique(hue_flat), r_, g_, b_):
            m = hue == h
            rgba[..., 0][m] = rr
            rgba[..., 1][m] = gg
            rgba[..., 2][m] = bb
        rgba[..., 3] = alpha
    else:
        rgba = np.zeros((big, big, 4), dtype=np.float32)
        rgba[..., 0] = color[0] / 255.0
        rgba[..., 1] = color[1] / 255.0
        rgba[..., 2] = color[2] / 255.0
        rgba[..., 3] = alpha

    out = Image.fromarray((rgba * 255).astype(np.uint8), "RGBA").resize((size, size), Image.LANCZOS)
    out.putalpha(Image.composite(out.getchannel("A"), Image.new("L", (size, size), 0), out.getchannel("A")))
    return out


def shine_overlay(size, phase):
    """Narrow diagonal specular streak sweeping across the badge face.

    Kept narrow and single-pass so GIF inter-frame deltas stay small.
    """
    span = size * 1.8
    w = size * 0.17
    x = -w + span * phase
    ss = 2
    big = size * ss
    layer = Image.new("RGBA", (big * 2, big * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # soft edges: draw stacked bands with rising alpha
    for k in range(5):
        alpha = 18 + k * 16
        d.rectangle([x * ss + k * 5, 0, (x + w) * ss - k * 5, big * 2], fill=(255, 255, 255, alpha))
    layer = layer.rotate(-18, resample=Image.BICUBIC)
    layer = layer.crop(((layer.width - big) // 2, (layer.height - big) // 2,
                        (layer.width + big) // 2, (layer.height + big) // 2))
    return Image.fromarray((np.asarray(layer).astype(np.float32) * 0.50).astype(np.uint8), "RGBA").resize((size, size), Image.LANCZOS)


def orbit_dots(size, phase, color):
    """Two orbiting sparkles + a trailing glow."""
    overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cx = cy = size / 2.0
    R = ORBIT_R * size
    steps = [(0.0, 0.75, 5.0), (math.pi, 0.45, 3.2), (math.pi / 2, 0.25, 2.2)]
    for off, inten, sig in steps:
        a = phase + off
        x = cx + R * math.cos(a)
        y = cy + R * math.sin(a)
        glow = radial_blob(size, x, y, sig, inten)
        dot = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        dot.paste((*color, 255), (0, 0), glow)
        core = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(core)
        d.ellipse([x - 1.6, y - 1.6, x + 1.6, y + 1.6], fill=(255, 255, 255, 235))
        overlay = Image.alpha_composite(overlay, dot)
        overlay = Image.alpha_composite(overlay, core)
    return overlay


def _accent(color):
    """Normalize a badge accent to an RGB tuple ('rainbow' -> soft prismatic tone)."""
    if color == "rainbow":
        return (170, 130, 255)
    return tuple(color)


def glow_pulse(size, phase, color):
    """Soft radial glow around the medal rim, pulsing with the loop.

    Masked to the outer annulus so the medal face stays static between
    frames — keeps GIF inter-frame deltas small (much smaller files).
    """
    t = (math.sin(2 * math.pi * phase) + 1) / 2  # 0..1
    # gaussian glow alpha, masked to r > 0.30 * size
    ss = 2
    big = size * ss
    y, x = np.mgrid[0:big, 0:big].astype(np.float32)
    cx = cy = (big - 1) / 2.0
    r = np.sqrt((x - cx) ** 2 + (y - cy) ** 2)
    sigma = 0.38 * size * ss
    glow = (0.10 + 0.10 * t) * np.exp(-(r ** 2) / (2 * sigma ** 2))
    glow[r <= 0.30 * size * ss] = 0.0
    alpha = (np.clip(glow, 0, 1) * 255).astype(np.uint8)

    layer = Image.new("RGBA", (size, size), (*_accent(color), 255))
    layer.putalpha(Image.fromarray(alpha, "L").resize((size, size), Image.LANCZOS))
    return layer


# ----------------------------------------------------------------------------- per-badge renderer

def render_frames(slug, base, size, colors):
    frames = []
    for i in range(FRAMES):
        phase = i / FRAMES
        img = base.copy()

        # 1) pulsing glow behind the medal
        img = Image.alpha_composite(img, glow_pulse(size, phase, colors))
        # 2) raking light sweep (one pass per loop)
        sh = 1 - abs(phase - 0.35) * 3.2
        sh = max(0.0, sh)
        if sh > 0:
            sweep = shine_overlay(size, phase)
            sweep.putalpha(sweep.getchannel("A").point(lambda a: int(a * sh)))
            img = Image.alpha_composite(img, sweep)
        # 3) orbit sparkles
        img = Image.alpha_composite(img, orbit_dots(size, phase, (255, 244, 214)))
        # 4) rotating aura ring
        img = Image.alpha_composite(img, aura_ring(size, phase * 2 * math.pi, colors))
        frames.append(img)
    return frames


MATTE = (10, 14, 28)  # navy background for transparent pixels (matches artwork)

def quantize_shared(frames, colors=160):
    """Quantize all frames against ONE shared palette (avoids GIF flicker).

    The palette is built from the first frame only — building it from
    screen-merged frames produced a washed-out palette and broken output.
    Dithering is off: it adds noise that destroys GIF inter-frame compression.
    """
    pal = frames[0].convert("RGB").quantize(colors=colors, method=Image.MEDIANCUT)
    return [f.convert("RGB").quantize(palette=pal, dither=Image.NONE) for f in frames]


def apply_transparency(p_frame, rgba_frame, trans_index):
    """Map fully transparent pixels of an RGBA frame to the transparent palette entry."""
    alpha = np.asarray(rgba_frame.getchannel("A"))
    idx = np.array(p_frame, copy=True)
    idx[alpha < 128] = trans_index
    out = Image.fromarray(idx, "P")
    out.putpalette(p_frame.getpalette())
    return out


def save_gif(frames, path):
    q = quantize_shared(frames)
    # pick a palette entry to reserve for transparency (closest to the matte color)
    pal_arr = np.array(q[0].getpalette(), dtype=np.float32).reshape(-1, 3)
    trans_index = int(np.argmin(np.sum((pal_arr - np.array(MATTE, dtype=np.float32)) ** 2, axis=1)))
    q = [apply_transparency(p, rgba, trans_index) for p, rgba in zip(q, frames)]
    q[0].save(
        path,
        save_all=True,
        append_images=q[1:],
        duration=DURATION_MS,
        loop=0,
        optimize=True,
        disposal=1,
        transparency=trans_index,
    )


def build(slug):
    src_path = os.path.join(SRC, f"{slug}.png")
    art = Image.open(src_path).convert("RGBA")

    colors = BADGES[slug]

    # ---- static PNG (512) ----
    static = art.resize((STATIC_SIZE, STATIC_SIZE), Image.LANCZOS)
    static_path = os.path.join(PNG_OUT, f"{slug}.png")
    static.save(static_path, optimize=True)

    # ---- animated GIF (256) ----
    size = GIF_SIZE
    base = art.resize((size * 2, size * 2), Image.LANCZOS).resize((size, size), Image.LANCZOS)
    mask = rounded_mask(size, int(size * CORNER_RADIUS))
    base.putalpha(Image.composite(base.getchannel("A"), Image.new("L", (size, size), 0), mask))
    frames = render_frames(slug, base, size, colors)
    gif_path = os.path.join(GIF_OUT, f"{slug}.gif")
    save_gif(frames, gif_path)
    return gif_path, static_path, frames


def main():
    os.makedirs(GIF_OUT, exist_ok=True)
    os.makedirs(PNG_OUT, exist_ok=True)
    total = 0
    for slug in BADGES:
        gif_path, png_path, frames = build(slug)
        gsize = os.path.getsize(gif_path) / 1024
        psize = os.path.getsize(png_path) / 1024
        total += gsize
        print(f"  {slug:<18} gif {gsize:7.0f} KB  png {psize:6.0f} KB  frames={len(frames)}")
    print(f"Done. GIF total: {total/1024:.1f} MB")


if __name__ == "__main__":
    main()
