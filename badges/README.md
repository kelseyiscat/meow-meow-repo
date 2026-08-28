# Badges

Animated GIFs for the Arena profile badge system. One file per badge, matching
the badge grid in `src/components/profile/BadgeGrid.jsx` and the definitions in
`src/profileData.js` (icons + tints).

| File | Badge | Icon | Tint |
| --- | --- | --- | --- |
| `night-owl.gif` | Night Owl | 🌙 | `--blue` |
| `iron-streak.gif` | Iron Streak | 🔥 | `--orange` |
| `shipper.gif` | Shipper | 🚢 | `--green` |
| `net-negative.gif` | Net Negative | ✂️ | `--blue` |
| `good-neighbour.gif` | Good Neighbour | 🤝 | `--green` |
| `polyglot.gif` | Polyglot | 🧩 | `--yellow` |
| `marathon.gif` | Marathon | ⏱ | `--orange` |
| `century.gif` | Century | 💯 | `--blue` |
| `mentor.gif` | Mentor | 🧭 | `--green` |

All GIFs: 144×144 px, transparent background, 20 frames @ 100 ms (2 s loop),
subtle glow-pulse animation in the badge's accent colour.

## Regenerating

```bash
pip install pillow numpy
python3 scripts/generate_badges.py        # writes badges/*.gif
python3 scripts/generate_badges.py --test # write a single PNG frame per badge
```

Icons (Twemoji 72×72) are fetched from the GitHub API on first run and cached
in `badges/.icons/`, so later runs work offline.
