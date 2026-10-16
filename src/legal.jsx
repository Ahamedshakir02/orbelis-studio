import React from 'react'
import ReactDOM from 'react-dom/client'
import { legalView } from './components/LegalPages.jsx'
import './index.css'

/**
 * One entry point for every secondary page.
 *
 * Which page to render comes from `data-page` on the body of the HTML file
 * that loaded this script. That keeps privacy.html, terms.html and 404.html as
 * real, separately crawlable documents with their own <title> and description
 * in the served markup — which is the point of building them as pages instead
 * of client-side routes — while they share one small bundle and one layout.
 *
 * The build prerenders each page into #root (scripts/prerender.mjs), so in
 * production React hydrates the markup that is already there; in dev the root
 * is empty and it renders from scratch.
 */
const root = document.getElementById('root')
const view = <React.StrictMode>{legalView(document.body.dataset.page)}</React.StrictMode>

if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, view)
else ReactDOM.createRoot(root).render(view)
