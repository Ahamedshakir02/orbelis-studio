/**
 * Build-time rendering, used only by scripts/prerender.mjs.
 *
 * Every page is rendered to HTML once at build time and written into the
 * served file, so search engines, link previews and AI crawlers that never run
 * JavaScript still read the full page. In the browser, React then hydrates
 * that markup instead of drawing over an empty root.
 */
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { legalView } from './components/LegalPages.jsx'
import { structuredDataTag } from './lib/seo.js'
import { llmsTxt } from './lib/llms.js'

export function render(page) {
  return renderToString(page === 'main' ? <App /> : legalView(page))
}

export { structuredDataTag, llmsTxt }
