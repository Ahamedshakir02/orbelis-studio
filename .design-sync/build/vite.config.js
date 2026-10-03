import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')

/**
 * Library build for the Claude Design sync — separate from the site build in
 * the root vite.config.js, and writing to dist-ds/ so the two never collide.
 * React stays external (the sync supplies its own copy); GSAP is bundled.
 */
export default defineConfig({
  root,
  publicDir: false,
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss({ config: resolve(here, 'tailwind.config.js') }), autoprefixer()],
    },
  },
  build: {
    outDir: resolve(root, 'dist-ds'),
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(here, 'entry.js'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
