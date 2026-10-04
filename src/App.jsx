import { Suspense, lazy } from 'react'
import Nav from './components/Nav.jsx'
import MobileCta from './components/MobileCta.jsx'
import ConsentBanner from './components/ConsentBanner.jsx'
import Hero from './sections/Hero.jsx'
import Stats from './sections/Stats.jsx'
import Work from './sections/Work.jsx'
import Problems from './sections/Problems.jsx'
import Services from './sections/Services.jsx'
import Flow from './sections/Flow.jsx'
import Audience from './sections/Audience.jsx'
import Process from './sections/Process.jsx'
import Studio from './sections/Studio.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'

/**
 * The assistant is split out. Nobody opens it in the first second, so its
 * corpus and retrieval index have no business competing with the page for
 * bandwidth on first paint.
 */
const Assistant = lazy(() => import('./components/Assistant/Assistant.jsx'))

export default function App() {
  return (
    <>
      {/* First tab stop on the page, so a keyboard user can skip the nav. */}
      <a href="#services" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main>
        {/* A service company's order: the pain, what is sold and for how
            much, how it works, then the proof and the people. */}
        <Hero />
        <Problems />
        <Services />
        <Flow />
        <Work />
        <Audience />
        <Process />
        <Stats />
        <Studio />
        <Faq />
      </main>
      <Contact />

      {/* The product, demonstrated on the product's own site. */}
      <Suspense fallback={null}>
        <Assistant />
      </Suspense>

      {/* Phones only — keeps one CTA in thumb reach once the hero scrolls off. */}
      <MobileCta />

      {/* Renders nothing unless a provider is configured that needs opt-in. */}
      <ConsentBanner />
    </>
  )
}
