/**
 * Library entry for the Claude Design sync.
 *
 * The site itself has no package entry — it is an app. This file names the
 * components worth reusing outside it, and is the only thing the design-sync
 * build bundles. Sections and anything that reads site copy stay out.
 */
import './styles.css'

export { default as Magnetic } from '../../src/components/Magnetic.jsx'
export { default as Marquee } from '../../src/components/Marquee.jsx'
export { default as Counter } from '../../src/components/Counter.jsx'
export { default as Cursor } from '../../src/components/Cursor.jsx'
