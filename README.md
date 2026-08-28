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

## 🎁 Arena Profile + Wrapped

A user profile page in the Arena visual language (warm dark surfaces, Instrument
Serif display type, the icon rail and top bar from the app chrome), with a
Spotify-Wrapped-style year in review behind it.

It lives at the repo root as a **Vite + React** app.

| Route | Page |
|---|---|
| `/` | Profile — picture, settings, log out, running metrics, weekly usage, models & arenas, badges |
| `/wrapped` | Arena Wrapped — the year in review, linked from the bottom of the profile |

```
index.html · vite.config.js · package.json
src/
  main.jsx              React root + BrowserRouter
  App.jsx               routes, app chrome, avatar/settings/session state
  data.js               Wrapped numbers
  profileData.js        user, metrics, badges, settings, models, arenas, last week
  styles.css            design tokens + component styles
  hooks/
    useReveal.js        scroll-into-view + reduced-motion
    useLocalState.js    useState that persists to localStorage
  pages/
    Profile.jsx         landing page
    Wrapped.jsx         year in review
  components/
    Chrome.jsx            Rail + TopBar (title, back link, per-page actions)
    Avatar.jsx            uploaded image / preset gradient / initial
    Section.jsx           Section + Panel wrappers
    Tooltip.jsx           shared hover layer (TooltipProvider / useTooltip)
    DataTable.jsx         table view behind the "Show data tables" toggle
    Hero.jsx StatTile.jsx ModeStack.jsx BarList.jsx
    ActivityHeatmap.jsx RepoRanking.jsx FactGrid.jsx Archetype.jsx
    profile/
      ProfileHeader.jsx   identity + avatar editor (upload, presets, remove)
      MetricGrid.jsx      running counters with a 7d / 30d / all-time filter
      UsageChart.jsx      last 7 days of prompts, one column per day
      ModelSpotlight.jsx  most used model + the runners-up behind it
      ArenaBreakdown.jsx  favourite Arena + the rest of the split
      PrivateModels.jsx   preview models you backed before the reveal
      BadgeGrid.jsx       earned badges + in-progress ladder
      SettingsPanel.jsx   settings sheet
      LogoutDialog.jsx    logout confirm + signed-out screen
      Modal.jsx           dialog shell (Esc, click-outside, focus, scroll lock)
      WrappedCallout.jsx  the link to /wrapped at the bottom
```

### Running locally
```bash
npm install
npm run dev        # http://localhost:5173  (opens automatically)
npm run build      # → dist/
npm run preview    # http://localhost:4173, serves the production build
```

Use `npm run preview` rather than a plain static server for `dist/`: the app uses
`BrowserRouter`, so `/wrapped` needs an SPA fallback that `python -m http.server`
doesn't provide.

### Where the numbers line up
`LAST_WEEK` in `profileData.js` sums to 214, the same figure the 7-day *Prompts*
metric tile reports, and its busiest day (Thursday) matches the peak in the Wrapped
activity heatmap. Keep those in step when you swap in real data.

### What persists
The chosen profile picture and the settings are stored in `localStorage`
(`arena.avatar`, `arena.settings`) via `useLocalState`, so they survive a reload.
Every read and write is guarded — the page renders correctly when storage is
blocked or empty.

### Adding a section
Add the numbers to `src/data.js` or `src/profileData.js`, build a component in
`src/components/`, then drop it into the page. On Wrapped, wrap it in a `<Section>`
(and a `<Panel>` if it's a chart); on Profile, wrap it in the local `Reveal` helper.
All three pass a `shown` boolean to a function child, which is how bars and counters
wait to animate until they scroll into view.

### Charts
Colours come from the validated dark-mode palette in `src/styles.css` — three
categorical slots for the mode stack, a single blue hue for magnitude bars and
meters, and a six-step sequential ramp for the heatmap. Every chart ships a hover
tooltip and direct labels, and the Wrapped charts add a table view, so nothing is
carried by colour alone.

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
