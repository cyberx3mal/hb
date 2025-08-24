import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: set base to your repository name when deploying to GitHub Pages
// Example: if repo is https://github.com/<user>/<repo>, set base to '/<repo>/'
// You can also override via env var VITE_BASE
const base = process.env.VITE_BASE || '/'

export default defineConfig({
  plugins: [react()],
  base,
})
