import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { SITE_URL } from './src/data/domain.js'

/** Fills %SITE_URL% in the HTML pages from the one domain setting. */
const siteUrl = () => ({
  name: 'site-url',
  transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL) },
})

export default defineConfig({
  plugins: [react(), siteUrl()],
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
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        404: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
})
