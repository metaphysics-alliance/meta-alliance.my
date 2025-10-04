/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: { colors: { cosmic: { void:'#000510', deep:'#07111f', navy:'#0b1f3a', gold:'#d4af37', goldsoft:'#e8c766' } },
      colors: { gold:{DEFAULT:'#d4af37',soft:'#e8c766'} },
      boxShadow: { 'soft-xl': '0 20px 40px rgba(0,0,0,0.35)' }
    }
  },
  plugins: []
}
