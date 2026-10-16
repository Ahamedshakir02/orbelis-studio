import Nav from './components/Nav.jsx'
import MobileCta from './components/MobileCta.jsx'
import ConsentBanner from './components/ConsentBanner.jsx'
import WhatsAppButton from './components/WhatsApp.jsx'
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

export default function App() {
  return (
    <>
      {/* First tab stop on the page, so a keyboard user can skip the nav. */}
      <a href="#services" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main>
        {/* Solutions lead: the gap, what gets built to close it, the proof,
            how a project runs, one example at work, then the people. */}
        <Hero />
        <Problems />
        <Services />
        <Work />
        <Process />
        <Flow />
        <Audience />
        <Stats />
        <Studio />
        <Faq />
      </main>
      <Contact />

      {/* Visitors message us directly. The chat assistant is not mounted;
          its code stays in components/Assistant if it is wanted back. */}
      <WhatsAppButton />

      {/* Phones only — keeps one CTA in thumb reach once the hero scrolls off. */}
      <MobileCta />

      {/* Renders nothing unless a provider is configured that needs opt-in. */}
      <ConsentBanner />
    </>
  )
}
