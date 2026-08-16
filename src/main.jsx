import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { injectStructuredData } from './lib/seo.js'
import './index.css'

// Emitted before React mounts so crawlers that execute JS find it in the head
// alongside the meta tags rather than after a render pass.
injectStructuredData()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
