import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ChromaLab/", // Add this line for GitHub Pages deployment
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ]
  }
})
