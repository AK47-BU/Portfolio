import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // String shorthand: '/api' -> 'http://localhost:5000'
      '/api': {
        target: 'http://localhost:5000', // Local Express backend (server.mjs)
        changeOrigin: true,
        // No rewrite: server.mjs serves the route at '/api/contact', matching prod
      },
    }
  }

})
