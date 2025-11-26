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
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
          utils: ['luxon', 'lunar-typescript', 'chinese-lunar', 'tz-lookup'],
          stripe: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          pdf: ['@react-pdf/renderer'],
          ai: ['@google/generative-ai'],
        },
      },
    },
  },
})
