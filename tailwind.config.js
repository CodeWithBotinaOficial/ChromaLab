/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#1E1E1E',
          secondary: '#2C2C2C',
        },
        accent: {
          blue: '#3B82F6',
          emerald: '#10B981',
        },
        gray: {
          light: '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
}
