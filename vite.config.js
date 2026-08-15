import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so `dist/` can be dropped into any subfolder / static host.
  base: './',
  server: {
    port: 5173,
    open: false,
  },
})
