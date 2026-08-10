import { Suspense, lazy, useState } from 'react'
import SmoothScroll from './lib/SmoothScroll.jsx'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
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

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
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

      {/* Grain overlay — a cheap "film" texture that ties 3D and DOM together. */}
      <div className="grain pointer-events-none fixed inset-0 z-50 opacity-[0.05]" aria-hidden />
    </>
  )
}
