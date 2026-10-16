import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { injectStructuredData } from './lib/seo.js'
import { liftLoader } from './lib/loader.js'
import './index.css'

// The build already writes the structured data into the served HTML
// (scripts/prerender.mjs); this only adds it in dev, where there is no build.
injectStructuredData()

// In production the page arrives prerendered, so every word is readable by
// crawlers that never run JavaScript, and React takes over the markup that is
// already there. In dev the root is empty and it renders from scratch.
const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)

// The page is in the tree; the loader can go once the fonts and its own
// animation allow.
liftLoader()
