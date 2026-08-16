import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glsl'],
  build: {
    rollupOptions: {
      /**
       * Real HTML documents, not client-side routes.
       *
       * Privacy, terms and 404 each ship as their own file with their own
       * <title> and description in the served markup. A crawler — and a link
       * preview, which never executes JS — reads the right title without
       * running the app. They share one small bundle and carry none of the
       * home page's WebGL weight.
       */
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        404: resolve(__dirname, '404.html'),
      },

      // Three.js and the React tree are split so the DOM content can paint
      // before the 3D bundle finishes downloading. The Canvas is also
      // lazy-imported in App.jsx, so this chunk is fetched after first paint.
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['gsap', 'lenis'],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
