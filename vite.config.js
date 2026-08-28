import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The repo root doubles as the app root — only index.html and src/ are part of
// the Wrapped build; the loose scripts elsewhere in the repo are left alone.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173, allowedHosts: true },
  build: { outDir: 'dist', emptyOutDir: true },
})
