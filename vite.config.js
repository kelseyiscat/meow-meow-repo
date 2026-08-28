import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The repo root doubles as the app root — only index.html and src/ are part of
// the Wrapped build; the loose scripts elsewhere in the repo are left alone.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true, open: false, allowedHosts: ['.e2b.app'] },
  build: { outDir: 'dist', emptyOutDir: true },
})
