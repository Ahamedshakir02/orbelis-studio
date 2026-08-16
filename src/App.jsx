import { Suspense, lazy, useState } from 'react'
import SmoothScroll from './lib/SmoothScroll.jsx'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import MobileCta from './components/MobileCta.jsx'
import ConsentBanner from './components/ConsentBanner.jsx'
import Hero from './sections/Hero.jsx'
import Manifesto from './sections/Manifesto.jsx'
import Stats from './sections/Stats.jsx'
import Work from './sections/Work.jsx'
import Services from './sections/Services.jsx'
import Process from './sections/Process.jsx'
import Studio from './sections/Studio.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'

/**
 * The 3D scene is code-split. Three.js is the single heaviest dependency here,
 * and the page is fully readable without it — so the DOM paints first and the
 * canvas arrives a moment later, behind the loader curtain.
 */
const Scene = lazy(() => import('./components/Scene/Scene.jsx'))

/**
 * The assistant is split out too. Nobody opens it in the first second, so its
 * corpus and retrieval index have no business competing with the hero for
 * bandwidth on first paint.
 */
const Assistant = lazy(() => import('./components/Assistant/Assistant.jsx'))

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      {/*
        First tab stop on the page. Without it a keyboard user has to walk the
        entire nav on every visit — and this page hides the system cursor, so
        keyboard affordances have to be better than average, not worse.
      */}
      <a href="#work" className="skip-link">
        Skip to content
      </a>

      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <Nav ready={ready} />

      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* DOM content scrolls over the canvas. */}
      <SmoothScroll>
        <main className="relative">
          <Hero ready={ready} />
          <Manifesto />
          <Stats />
          <Work />
          <Services />
          <Process />
          <Studio />
          <Faq />
          <Contact />
        </main>
      </SmoothScroll>

      {/* The product, demonstrated on the product's own site. */}
      <Suspense fallback={null}>
        <Assistant ready={ready} />
      </Suspense>

      {/* Phones only — keeps one CTA in thumb reach once the hero scrolls off. */}
      <MobileCta />

      {/* Renders nothing unless a provider is configured that needs opt-in. */}
      <ConsentBanner />

      {/* Grain overlay — a cheap "film" texture that ties 3D and DOM together. */}
      <div className="grain pointer-events-none fixed inset-0 z-50 opacity-[0.05]" aria-hidden />
    </>
  )
}
