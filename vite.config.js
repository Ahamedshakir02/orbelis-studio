import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glsl'],
  build: {
    // Three.js and the React tree are split so the DOM content can paint before
    // the 3D bundle finishes downloading. The Canvas is also lazy-imported in
    // App.jsx, so this chunk is fetched after first paint.
    rollupOptions: {
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
