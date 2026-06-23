import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages 根路徑 https://cowrider2018.github.io/verdant-web-ui/
  base: '/verdant-web-ui/',
  plugins: [react()],
  server: {
    port: 5175,
    open: true,
  },
})
