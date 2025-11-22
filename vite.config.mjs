import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      // Proxy API requests to Next.js dev server so /api/* works in Vite
      '/api': 'http://localhost:3000',
    },
  },
  build: { sourcemap: true },
})
