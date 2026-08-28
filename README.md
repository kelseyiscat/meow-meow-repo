<!-- 
  meow-meow-repo README
  Last updated: 2026-08-28
  This file serves as the main documentation for the repo.
-->

# 🐱 meow-meow-repo 😺

> A cozy little personal hackathon repo. 🐾✨

![CI](https://github.com/kelseyiscat/meow-meow-repo/actions/workflows/ci.yml/badge.svg)

<!-- About section -->
## 📖 About

This repo is the home of a small personal hackathon project: a lightweight
web UI built with plain HTML, CSS, and JavaScript — no frameworks, no build
step. 🪴☕

## 📂 Project Structure

| File / Folder | Description |
| --- | --- |
| 🌐 `arena-clone/` | The web app (`index.html`, `styles.css`, `app.js`) ⚡ |
| 🙈 `.gitignore` | Keeps the clutter out of git 🧹 |
| 🔧 `.github/workflows/ci.yml` | Simple CI workflow |

## 🚀 Getting Started

1. 📥 **Clone** the repository.
   ```bash
   git clone https://github.com/kelseyiscat/meow-meow-repo.git
   cd meow-meow-repo
   ```
2. 🌐 **Launch** the demo by opening `arena-clone/index.html` in any modern browser.
3. 😻 **Enjoy** the vibes!

## 🌐 The App

The `arena-clone/` folder contains a lightweight UI exercise inspired by modern
AI interfaces. It's a pure HTML/CSS/JS project — no installation required!
Just open the `index.html` file.

### Running locally
No build step needed:
```bash
# just open in browser
open arena-clone/index.html
# or with a simple server
npx serve arena-clone
```

## 🎁 Arena Wrapped

A Spotify-Wrapped-style recap of a year of Arena agent sessions, built in the Arena
visual language (warm dark surfaces, Instrument Serif display type, the icon rail
and top bar from the app chrome).

It lives at the repo root as a **Vite + React** app, so every part of the page is a
component you can edit or reuse:

```
index.html            app entry
vite.config.js
src/
  main.jsx            React root
  App.jsx             page composition — sections in order
  data.js             ALL the numbers (swap this for a real API response)
  styles.css          design tokens + component styles
  hooks/useReveal.js  scroll-into-view + reduced-motion helper
  components/
    Chrome.jsx           Rail, TopBar
    Hero.jsx             opening headline
    Section.jsx          Section + Panel wrappers
    StatTile.jsx         KPI tile with count-up + sparkline
    ModeStack.jsx        part-to-whole stacked bar
    BarList.jsx          horizontal magnitude bars (languages, models)
    ActivityHeatmap.jsx  day × hour heatmap
    RepoRanking.jsx      ranked list with meters
    FactGrid.jsx         fact cards
    Archetype.jsx        closing card + share
    Tooltip.jsx          shared hover layer (TooltipProvider / useTooltip)
    DataTable.jsx        table view behind the "Show data tables" toggle
```

### Running locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve the production build
```

### Adding a section
Add the numbers to `src/data.js`, build a component in `src/components/`, then drop it
into `src/App.jsx` inside a `<Section>` (and a `<Panel>` if it's a chart). `Section` and
`Panel` pass a `shown` boolean to a function child, which is how bars and counters wait
to animate until they scroll into view.

### Charts
Colours come from the validated dark-mode palette in `src/styles.css` — three
categorical slots for the mode stack, a single blue hue for magnitude bars, and a
six-step sequential ramp for the heatmap. Every chart ships a hover tooltip, direct
labels, and a table view (top-right toggle), so nothing is carried by colour alone.

## 🧪 Testing

- `ci.yml` — simple success job, runs on `main` + `arena/**`

## 🤝 Contributing

Pull requests are welcome! 🎉

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes
4. Push and open a PR

## 📜 License

MIT © 2026 kelseyiscat — Made with love 💖 and a lot of purring. 😺💤 🐾
