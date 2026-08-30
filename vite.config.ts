import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: '/SEULQR/',
  plugins: [
    react(),
    // GitHub Pages SPA fallback: unknown deep links (e.g. /SEULQR/menu) hit
    // GitHub's 404 page. We publish a copy of the built index.html as 404.html
    // so the SPA boots, reads the real pathname, and renders the correct route
    // with a clean URL (no HashRouter, no redirect round-trips).
    {
      name: 'copy-404-html',
      apply: 'build',
      closeBundle() {
        const src = resolve(__dirname, 'dist/index.html')
        const dst = resolve(__dirname, 'dist/404.html')
        if (existsSync(src)) {
          copyFileSync(src, dst)
          console.log('[copy-404-html] dist/404.html written')
        }
      },
    },
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    cors: true,
    allowedHosts: true,
  },
})
