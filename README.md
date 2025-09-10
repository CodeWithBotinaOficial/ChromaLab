# 🎨 ChromaLab

![ChromaLab Logo](public/chromalab.svg)

**ChromaLab** is a next-generation, feature-rich **image editor** built with **React + TypeScript**.
It combines professional editing tools (crop, rotate, filters, adjustments) with creative freedom (text overlays, stickers, freehand drawing, meme templates).

Designed for **scalability, maintainability, and performance**, ChromaLab follows **SOLID principles** and leverages well-known **design patterns** (Factory, Strategy, Command, Adapter).

---

## 📑 Table of Contents

* [✨ Features](#-features)

  * [Core Tools](#core-tools)
  * [Advanced Tools](#advanced-tools)
* [🖼 Demo & Screenshots](#-demo--screenshots)
* [⚡ Tech Stack](#-tech-stack)
* [🚀 Installation & Setup](#-installation--setup)
* [🛠 Usage](#-usage)
* [📦 Build](#-build)
* [🌍 Deployment](#-deployment)

  * [Vercel](#vercel)
  * [GitHub Pages](#github-pages)
* [🤝 Contributing](#-contributing)
* [📜 License](#-license)

---

## ✨ Features

### 🧰 Core Tools

* **Crop** → trim precisely, support freeform or aspect ratio.
* **Rotate** → adjust orientation with ease.
* **Transform** → scale, flip, and position elements.
* **Filters** → grayscale, sepia, vintage, and more.
* **Adjustments** → brightness, contrast, saturation, blur, white/black points.

### 🎨 Advanced Tools

* **Text Overlays** → add customizable text with fonts, colors, and styles.
* **Stickers/Emojis** → drag, resize, and rotate from a sticker library.
* **Freehand Drawing** → brush tool with size, color, opacity controls.
* **Templates** → meme-style or structured layouts.
* **Session Persistence** → auto-save editing state with localStorage.
* **Export** → save final image with **all layers applied** (text, stickers, drawings, filters).

---

## 🖼 Demo & Screenshots

[ChromaLab Gif](!src/assets/ChromaLab.gif)

---

## ⚡ Tech Stack

* **React + TypeScript** → robust and scalable UI.
* **Vite** → lightning-fast build tool.
* **TailwindCSS + shadcn/ui** → modern, minimal, accessible UI.
* **Zustand / Context API** → state management.
* **Konva.js** → canvas layers for rendering & exporting.

---

## 🚀 Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/CodeWithBotinaOficial/ChromaLab.git
   cd ChromaLab
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠 Usage

1. Upload → drag & drop or click to upload an image.
2. Edit → use sidebar tools for filters, adjustments, text, stickers, drawing.
3. Undo/Redo → keyboard shortcuts (`Ctrl+Z`, `Ctrl+Y`) or history panel.
4. Export → save your masterpiece as PNG/JPEG with all edits applied.

---

## 📦 Build

Generate a production build:

```bash
npm run build
```

Build output goes into the `dist/` folder.

---

## 🌍 Deployment

### Vercel

* Connect your repo → automatic deployment.
* Perfect for quick, free hosting.

### GitHub Pages

1. Update `vite.config.ts`:

   ```ts
   export default defineConfig({
     base: "/ChromaLab/",
   })
   ```
2. Install `gh-pages`:

   ```bash
   npm install --save-dev gh-pages
   ```
3. Add script in `package.json`:

   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
4. Build & deploy:

   ```bash
   npm run build
   npm run deploy
   ```

Your app will be live at:
[ChromaLab](https://codewithbotinaoficial.github.io/ChromaLab)

---

## 🤝 Contributing

Contributions are welcome! 🎉

* Fork the repo
* Create a feature branch: `git checkout -b feature/amazing-feature`
* Commit changes: `git commit -m 'Add amazing feature'`
* Push branch: `git push origin feature/amazing-feature`
* Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.

---

