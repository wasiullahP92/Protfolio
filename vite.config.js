import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load correctly on any server, subfolder, or static host
  server: {
    port: 5173,
    host: true
  }
})

