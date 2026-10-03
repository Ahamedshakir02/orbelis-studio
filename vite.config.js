import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      /**
       * Real HTML documents, not client-side routes.
       *
       * Privacy, terms and 404 each ship as their own file with their own
       * <title> and description in the served markup. A crawler — and a link
       * preview, which never executes JS — reads the right title without
       * running the app. They share one small bundle.
       */
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        404: resolve(__dirname, '404.html'),
      },
    },
  },
})
