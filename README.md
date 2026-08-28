<!-- 
  meow-meow-repo README
  Last updated: 2026-08-11
  This file serves as the main documentation for the repo.
-->

# 🐱 meow-meow-repo 😺🐰💖 ✨

> A cozy little repo full of cats, naps, and tiny adventures. 🐾✨

![CI](https://github.com/kelseyiscat/meow-meow-repo/actions/workflows/ci.yml/badge.svg)

<!-- About section: welcoming intro and cat fact -->
## 📖 About

Welcome! 👋 This repository is a soft, fuzzy corner of the internet dedicated to
adorable cats 🐈, sleepy humans 😴, and a small web project. Grab a warm drink
☕ and stay a while. 🪴

Whether you're here to read wholesome stories or explore code, we hope this space brings a smile to your face today! 😊🌟

> 🐱 **Fun cat fact:** A group of cats is called a *clowder* — and cats sleep
> for around 70% of their lives. Sounds like the good life! 😴🐾
>
> 🐾 **New fact:** Cats have 32 muscles in each ear and can rotate them 180°! 👂✨

<!-- Project structure table -->
## 📂 Project Structure

| File / Folder | Description |
| --- | --- |
| 🐾 `cute-cat` | The tiny adventure of Mochi the kitten 🐱🍃 |
| 😴 `tired-Aryan` | Aryan and the little golden loaf, Biscuit 🍞💛 |
| 🦊 `teozorro-cat` | Teozorro the fox who thinks he's a red velvet cat loaf 🦊🐱 |
| 🌐 `arena-clone/` | A small web app (`index.html`, `styles.css`, `app.js`) ⚡ |
| 🧪 `playTest.js` | Random generator utilities + demo 🎲 |
| 🎲 `random.js` | Super simple random generator (int, choice, cat fact) 🐱 |
| 🔧 `pullRequest.js` | Simple PR test helper |
| 🙈 `.gitignore` | Keeps the clutter out of git 🧹 |
| 📝 `arena_ai.txt` | Notes about Arena.ai platform |

<!-- Getting started steps -->
## 🚀 Getting Started

1. 📥 **Clone** the repository.
   ```bash
   git clone https://github.com/kelseyiscat/meow-meow-repo.git
   cd meow-meow-repo
   ```
2. 📖 **Explore** the cozy stories in `cute-cat`, `tired-Aryan`, and `teozorro-cat`.
3. 🌐 **Launch** the demo by opening `arena-clone/index.html` in any modern browser.
4. 😻 **Enjoy** the vibes!

<!-- Arena Clone section -->
## 🌐 The Arena Clone

The `arena-clone/` folder contains a lightweight UI exercise inspired by modern AI interfaces. It's a pure HTML/CSS/JS project—no installation required! Just open the `index.html` file.

**Quick improvements made (2026-08-11 test):**
- ✅ Fixed duplicate CSS hover rules
- ✅ Improved keyboard accessibility (`:focus-visible`)
- ✅ Made CI workflow wildcard for `arena/**` branches
- ✅ Enhanced modal with better focus management
- ✅ Added test helpers and cleaner docs

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
    SessionDigest.jsx QuestionCloud.jsx Archetype.jsx
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

This repo is used for testing Arena's workflow handling:

- `ci.yml` — simple success job, runs on `main` + `arena/**`
- `ci-test.yml` — matrix of success/failure/skip/slow jobs for testing status parsing

Run local smoke:
```bash
node playTest.js
node pullRequest.js
```

## 🤝 Contributing

Pull requests are welcome! 🎉 Bonus points for more cats. 🐾😸

1. Fork it
2. Create your feature branch (`git checkout -b my-new-cat`)
3. Commit your changes
4. Push and open a PR

## 📜 License

MIT © 2026 kelseyiscat — Made with love 💖 and a lot of purring. 😺💤 🐾🌟🐱
