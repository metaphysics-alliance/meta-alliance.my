/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
        "gold-soft": "#f1e4a6"
      },
      boxShadow: {
        "soft-xl": "0 10px 40px rgba(0,0,0,.45), 0 1px 0 rgba(255,255,255,.04) inset"
      },
      backdropBlur: {
        xs: '3px'
      }
    },
  },
  plugins: [],
}
