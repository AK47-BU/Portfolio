import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // String shorthand: '/api' -> 'http://localhost:5000'
      '/api': {
        target: 'http://localhost:5000', // Your local backend server
        changeOrigin: true,
        // Rewrite '/api/contact' to just '/contact'
        // because your local server.mjs doesn't have '/api' in its route
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    }
  }

})
