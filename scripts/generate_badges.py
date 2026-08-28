#!/usr/bin/env python3
"""
Generate animated badge GIFs for the Arena profile badge system.

Each badge is rendered in the Arena visual language (warm dark tile like
`.badge-medal` in src/styles.css, tinted border from `src/profileData.js`)
with a subtle glow-pulse animation, and written as one GIF per badge to
`badges/`.

Details
-------
* 144x144 px, transparent background, 20 frames @ 100 ms (2 s loop).
* One shared 256-color palette per badge (icon colors + exact brand
  colors for tile/border/glow) so frames never flicker.
* Supersampled rendering (3x) for smooth corners, border, and glow.

Usage:
    python3 scripts/generate_badges.py            # render all badges -> badges/
    python3 scripts/generate_badges.py --test     # render one badge, no gif

Requirements: Pillow (pip install pillow)
Icons: Twemoji 72x72 PNGs are fetched from the GitHub API on first run and
cached in `badges/.icons/` so re-runs work offline.
"""

from __future__ import annotations

import base64
import json
import math
import os
import sys
import urllib.request

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(REPO_ROOT, "badges")
ICON_DIR = os.path.join(OUT_DIR, ".icons")

# Icon codepoints (twemoji strips the U+FE0F variation selector in filenames)
# and tint per badge — ids/names mirror src/profileData.js.
BADGES = [
    ("night-owl",      "1f319",  "#3987e5"),  # var(--blue)
    ("iron-streak",    "1f525",  "#d95926"),  # var(--orange)
    ("shipper",        "1f6a2",  "#199e70"),  # var(--green)
    ("net-negative",   "2702",   "#3987e5"),  # var(--blue)
    ("good-neighbour", "1f91d",  "#199e70"),  # var(--green)
    ("polyglot",       "1f9e9",  "#d9a827"),  # var(--yellow)
    ("marathon",       "23f1",   "#d95926"),  # var(--orange)
    ("century",        "1f4af",  "#3987e5"),  # var(--blue)
    ("mentor",         "1f9ed",  "#199e70"),  # var(--green)
]

# ---- render parameters -----------------------------------------------------
SIZE = 144            # final canvas size (px)
SS = 3                # supersampling factor (smooth corners / glow)
TILE = 120            # badge tile size (px, at final scale)
RADIUS = 26           # tile corner radius
BORDER = 3            # border width
ICON = 64             # emoji size
FRAMES = 20           # frames per loop
DURATION = 100        # ms per frame -> 2s loop
LOOP = 0              # infinite
TRANS_INDEX = 255     # palette slot reserved for transparency

TILE_TOP = (46, 41, 37)     # #2e2925
TILE_BOTTOM = (36, 32, 28)  # #24201c


def fetch_icon(codepoint: str) -> Image.Image:
    """Fetch (and cache) a twemoji 72x72 PNG for a codepoint."""
    os.makedirs(ICON_DIR, exist_ok=True)
    path = os.path.join(ICON_DIR, f"{codepoint}.png")
    if not os.path.exists(path):
        url = f"https://api.github.com/repos/jdecked/twemoji/contents/assets/72x72/{codepoint}.png"
        req = urllib.request.Request(url, headers={"User-Agent": "arena-badges"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            payload = json.loads(resp.read().decode())
        with open(path, "wb") as fh:
            fh.write(base64.b64decode(payload["content"]))
        print(f"  fetched icon {codepoint}.png")
    return Image.open(path).convert("RGBA")


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def glow_pulse(frame: int) -> float:
    """0..1 intensity, smooth sine, dim -> bright -> dim over the loop."""
    return 0.5 + 0.5 * math.sin(2 * math.pi * frame / FRAMES - math.pi / 2)


def design_colors(tint: str) -> list[tuple[int, int, int]]:
    """Exact brand colors used by the tile/border/glow, included verbatim in
    the palette so they never drift under quantization. Dark/bright formulas
    must mirror render_badge()."""
    t = hex2rgb(tint)
    dark = lerp(t, (0, 0, 0), 0.45)
    bright = lerp(t, (255, 255, 255), 0.28)
    colors = [
        TILE_TOP,
        TILE_BOTTOM,
        lerp(TILE_TOP, TILE_BOTTOM, 0.5),
        (255, 255, 255),   # top highlight
        (0, 0, 0),
    ]
    colors += [lerp(dark, bright, i / 10) for i in range(11)]      # border ramp
    colors += [lerp(t, (0, 0, 0), f) for f in (0.72, 0.55, 0.38)]  # glow ramp
    return colors


def build_palette_image(codepoint: str, tint: str) -> Image.Image:
    """One shared 256-color palette: icon colors + exact design colors."""
    design = design_colors(tint)
    icon = fetch_icon(codepoint)
    icon_colors = icon.quantize(
        colors=255 - len(design) - 1,
        method=Image.Quantize.FASTOCTREE,
        dither=Image.Dither.NONE,
    ).getpalette() or []
    flat = list(icon_colors)
    for c in design:
        flat += [c[0], c[1], c[2]]
    flat += [255, 0, 255] * (256 - len(flat) // 3)  # pad; idx 255 = transparent
    pal = Image.new("P", (1, 1))
    pal.putpalette(flat[: 256 * 3])
    return pal


def render_badge(codepoint: str, tint: str, frame: int) -> Image.Image:
    s = SIZE * SS
    intensity = glow_pulse(frame)
    tint_rgb = hex2rgb(tint)
    dark = lerp(tint_rgb, (0, 0, 0), 0.45)
    bright = lerp(tint_rgb, (255, 255, 255), 0.28)
    border = lerp(dark, bright, intensity)

    canvas = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    box = [(s - TILE * SS) / 2, (s - TILE * SS) / 2,
           (s + TILE * SS) / 2, (s + TILE * SS) / 2]

    # --- soft outer glow -----------------------------------------------------
    glow = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    ImageDraw.Draw(glow).rounded_rectangle(box, radius=RADIUS * SS,
                                           fill=tint_rgb + (255,))
    glow = glow.filter(ImageFilter.GaussianBlur(9 * SS))
    glow.putalpha(glow.split()[3].point(lambda a: round(a * (0.30 + 0.50 * intensity))))
    canvas.alpha_composite(glow)

    # --- tile: warm dark vertical gradient (like .badge-medal) ---------------
    tile = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    for y in range(s):
        td.line([(0, y), (s, y)], fill=lerp(TILE_TOP, TILE_BOTTOM, y / s))
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle(box, radius=RADIUS * SS, fill=255)
    tile.putalpha(mask)
    canvas.alpha_composite(tile)

    # --- top light (subtle depth) -------------------------------------------
    hi = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    ImageDraw.Draw(hi).rounded_rectangle(box, radius=RADIUS * SS,
                                         outline=(255, 255, 255, 26), width=SS)
    canvas.alpha_composite(hi)

    # --- tinted border (pulses with the glow) -------------------------------
    ImageDraw.Draw(canvas).rounded_rectangle(box, radius=RADIUS * SS,
                                             outline=border + (255,), width=BORDER * SS)

    # --- icon ---------------------------------------------------------------
    icon = fetch_icon(codepoint).resize((ICON * SS, ICON * SS), Image.LANCZOS)
    canvas.alpha_composite(icon, ((s - ICON * SS) // 2, (s - ICON * SS) // 2))

    return canvas.resize((SIZE, SIZE), Image.LANCZOS)


def to_gif_frame(rgba: Image.Image, pal_img: Image.Image) -> Image.Image:
    """Map an RGBA frame onto the shared palette; partial alpha is preserved
    with a 4x4 Bayer dither so soft edges (glow, corners, icon AA) survive.

    Uses Image.quantize(palette=...) — Image.convert('P', palette=...) would
    silently fall back to the web palette and shift all colors.
    """
    p = rgba.convert("RGB").quantize(palette=pal_img, dither=Image.Dither.NONE)
    idx = np.array(p, dtype=np.uint8).copy()
    alpha = np.array(rgba)[..., 3]
    # Bayer 4x4: pixel survives (opaque) where alpha/255 > threshold
    bayer = np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]], dtype=np.float32)
    h, w = alpha.shape
    yy, xx = np.indices((h, w))
    thr = (bayer[yy % 4, xx % 4] + 0.5) / 16.0
    idx[alpha <= (thr * 255)] = TRANS_INDEX
    out = Image.fromarray(idx, mode="P")
    out.putpalette(pal_img.getpalette())
    out.info["transparency"] = TRANS_INDEX
    return out


def main() -> None:
    test = "--test" in sys.argv
    os.makedirs(OUT_DIR, exist_ok=True)

    for name, codepoint, tint in BADGES:
        pal_img = build_palette_image(codepoint, tint)
        frames = [to_gif_frame(render_badge(codepoint, tint, f), pal_img)
                  for f in range(FRAMES)]
        if test:
            frames[5].convert("RGBA").save(os.path.join(OUT_DIR, f"_test-{name}.png"))
            print(f"  test frame for {name} written (no gif)")
            continue
        path = os.path.join(OUT_DIR, f"{name}.gif")
        frames[0].save(
            path,
            save_all=True,
            append_images=frames[1:],
            duration=DURATION,
            loop=LOOP,
            disposal=2,
            optimize=True,
        )
        print(f"  {name}.gif  ({os.path.getsize(path) // 1024} KB)")


if __name__ == "__main__":
    main()
