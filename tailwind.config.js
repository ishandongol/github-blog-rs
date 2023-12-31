/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.fuchsia,
      }
    },
  },
  plugins: [],
}

