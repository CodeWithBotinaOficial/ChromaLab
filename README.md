# ChromaLab

![ChromaLab Logo](public/chromalab.svg)

ChromaLab is a modern, feature-rich image editor built with React + TypeScript. It empowers users with a comprehensive suite of tools for image manipulation, including professional filters, transformations, text overlays, stickers, drawing, and robust session persistence. Designed with maintainability and scalability in mind, ChromaLab adheres to **SOLID principles** and employs a **feature-based architecture**. Key **design patterns** like Factory, Strategy, Command, and Adapter are utilized to ensure a robust, extensible, and high-performance codebase.

## Table of Contents
- [Features](#features)
  - [Core Tools](#core-tools)
  - [Advanced Tools](#advanced-tools)
- [Demo/Screenshots](#demoscreenshots)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Build](#build)
- [Deployment](#deployment)
  - [Vercel](#vercel)
  - [GitHub Pages](#github-pages)
- [License](#license)

## Features

### Core Tools
- **Crop**: Precisely trim your images to focus on key areas.
- **Rotate**: Easily adjust image orientation.
- **Transform**: Scale and position elements with ease.
- **Filters**: Apply professional-grade filters like grayscale, sepia, vintage, and more to instantly change the mood of your images.
- **Adjustments**: Fine-tune image properties such as brightness, contrast, saturation, and blur for perfect visual balance.

### Advanced Tools
- **Text Overlays**: Add customizable text with various fonts, colors, and styles to create captions or artistic elements.
- **Stickers/Emojis**: Enhance your images with a fun collection of draggable and resizable stickers and emojis.
- **Freehand Drawing**: Unleash your creativity with a freehand drawing tool, offering adjustable brush size and opacity.
- **Templates**: Quickly create meme-style images or other structured designs using predefined templates.
- **Session Persistence**: Never lose your work! Your editing session is automatically saved to and loaded from localStorage.
- **Export**: Save your final masterpiece with all applied overlays, stickers, text, and effects in high quality.

## Demo/Screenshots

*(Add compelling screenshots or a GIF of ChromaLab in action here to showcase its features!)*

## Tech Stack
- **React + TypeScript**: A powerful combination for building robust and scalable user interfaces.
- **Vite**: Blazing fast development server and build tool for a smooth developer experience.
- **TailwindCSS + shadcn/ui**: Utility-first CSS framework and a collection of beautifully designed, accessible UI components.
- **Zustand/Context API**: Efficient state management for complex application states.
- **Konva.js**: A 2D canvas library for high-performance image manipulation and interactive layers.

## Installation & Setup

To get ChromaLab up and running on your local machine, follow these simple steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/CodeWithBotinaOficial/ChromaLab.git
    cd ChromaLab
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173` to see ChromaLab in action.

## Usage

1.  **Upload an Image**: Drag and drop an image onto the canvas or use the upload button.
2.  **Edit**: Utilize the sidebar tools for filters, adjustments, text, stickers, and drawing.
3.  **Undo/Redo**: Use the history panel or keyboard shortcuts (`Ctrl+Z`, `Ctrl+Y`) to manage your changes.
4.  **Export**: Once satisfied, click the export button to save your edited image.

## Build

To create a production-ready build of ChromaLab:

```bash
npm run build
```

This will compile the application into the `dist` directory.

## Deployment

ChromaLab can be easily deployed to various hosting platforms.

### Vercel
Connect your repository to Vercel, and it will automatically detect and deploy the project. Vercel provides a seamless deployment experience for React applications.

### GitHub Pages

ChromaLab can be deployed to GitHub Pages, making it accessible online. Once deployed, your application will be available at `https://<your-username>.github.io/ChromaLab/` (replace `<your-username>` with your GitHub username).

For deploying to GitHub Pages, follow these steps:
1.  **Update `vite.config.ts`**: Ensure your `vite.config.ts` includes the `base` path for GitHub Pages:
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      base: "/ChromaLab/", // Add this line for GitHub Pages deployment
    })
    ```
2.  **Install `gh-pages`**: If you haven't already, install the `gh-pages` package as a development dependency:
    ```bash
    npm install --save-dev gh-pages
    ```
3.  **Add Deploy Script**: Add a `deploy` script to the `scripts` section of your `package.json`:
    ```json
    {
      "name": "chromalab",
      "version": "0.0.0",
      "private": true,
      "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview",
        "deploy": "gh-pages -d dist" // Add this line
      },
      // ... rest of your package.json
    }
    ```
4.  **Build and Deploy**: Run the build command followed by the deploy command:
    ```bash
    npm run build
    npm run deploy
    ```
    Your application will be deployed to `https://<your-username>.github.io/ChromaLab/`.

## License

This project is licensed under the MIT License.