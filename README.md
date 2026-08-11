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

<!-- Featured stories links -->
## 🐈 Featured Stories

- 🐱 **[The Tiny Adventure of Mochi](./cute-cat)** — a curious kitten, a runaway leaf, and a sunny garden. ☀️🍃
- 😴 **[Aryan and the Little Golden Loaf](./tired-Aryan)** — one tired human, one very round cat. 💛🍞
- 🦊 **[Teozorro the Red Velvet Loaf](./teozorro-cat)** — a little woodland fox who mastered sunbeams, cardboard boxes, and being a cat. 📦🐱

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
