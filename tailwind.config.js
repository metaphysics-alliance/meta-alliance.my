/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Noto Sans CJK',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Arial',
          'Noto Sans',
          'PingFang SC',
          'Microsoft YaHei',
          'Noto Sans CJK SC',
          'sans-serif',
        ],
      },
      colors: {
        cosmic: {
          void: '#000510',
          deep: '#07111f',
          navy: '#0b1f3a',
          gold: '#d4af37',
          goldsoft: '#e8c766',
        },
        gold: {
          DEFAULT: '#d4af37',
          soft: '#e8c766',
        },
      },
      boxShadow: {
        'soft-xl': '0 20px 40px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
