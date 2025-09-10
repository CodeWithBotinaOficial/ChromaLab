# ChromaLab

ChromaLab is a modern, feature-rich image editor built with React + TypeScript. It features professional filters, transformations, text overlays, stickers, drawing, and session persistence. The architecture emphasizes maintainability and scalability, adhering to SOLID principles and utilizing a feature-based structure. Key design patterns like Factory, Strategy, Command, and Adapter are employed to ensure a robust and extensible codebase.

## Features

### Core Tools
- Crop
- Rotate
- Transform
- Filters (grayscale, sepia, vintage, etc.)
- Adjustments (brightness, contrast, saturation, blur)

### Advanced Tools
- Text overlays (fonts, colors, styles)
- Stickers/Emojis (draggable, resizable)
- Freehand Drawing (brush, opacity, size)
- Templates (meme-style)
- Session persistence via localStorage
- Export: save the final image with all overlays, stickers, text, and effects applied.

## Tech Stack
- React + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- Zustand/Context API for state management
- Konva.js for canvas layers

## Installation & Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/CodeWithBotinaOficial/ChromaLab.git
    cd ChromaLab
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

## Build

```bash
npm run build
```

## Deployment

### Vercel
Connect your repository to Vercel, and it will automatically detect and deploy the project.

### GitHub Pages
1.  Update `vite.config.ts` to include `base: "/ChromaLab/"`:
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      base: "/ChromaLab/", // Add this line for GitHub Pages deployment
    })
    ```
2.  Install `gh-pages`:
    ```bash
    npm install --save-dev gh-pages
    ```
3.  Add a deploy script to your `package.json`:
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
4.  Run the build and deploy commands:
    ```bash
    npm run build
    npm run deploy
    ```

## License

This project is licensed under the MIT License.