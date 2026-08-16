import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { splitWords } from '../lib/splitText.js'
import { brand } from '../data/site.js'
import Magnetic from '../components/Magnetic.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'

/**
 * FINAL BEAT — the oversized CTA. The orb has drifted down and back by now,
 * so the type has the frame to itself.
 *
 * The form sits directly under the headline rather than below the contact
 * details: the visitor who scrolled this far has already decided, and the next
 * thing they see should be the thing that takes their enquiry.
 */
export default function Contact() {
  const headline = useRef(null)

  const root = useGsap(() => {
    const inners = splitWords(headline.current)
    gsap.from(inners, {
      yPercent: 115,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.05,
      scrollTrigger: { trigger: headline.current, start: 'top 85%' },
    })

    gsap.from('.contact-fade', {
      y: 24,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '.contact-meta', start: 'top 88%' },
    })
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer ref={root} id="contact" className="relative pt-32 md:pt-48">
      <div className="container-x">
        <p className="eyebrow mb-8">Start a project</p>

        <h2
          ref={headline}
          className="font-display text-[13vw] leading-[0.86] tracking-tightest md:text-[9vw]"
        >
          Let's build something worth scrolling.
        </h2>

        <div className="contact-meta mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-12 md:gap-16">
          {/*
            The form gets a solid panel rather than sitting straight on the
            page. The WebGL canvas is fixed behind every section, and this is
            the one place on the site where a visitor is reading their own
            typing — legibility here is worth more than seeing the orb through
            it. Same treatment as the service cards, for consistency.
          */}
          <div className="contact-fade md:col-span-7">
            <div className="rounded-2xl border border-line bg-surface/85 p-6 backdrop-blur-md md:p-9">
              <p className="eyebrow mb-6">Tell me about it</p>
              <EnquiryForm />
            </div>
          </div>

          <div className="contact-fade space-y-10 md:col-span-5">
            <div>
              <p className="eyebrow mb-3">Email</p>
              <Magnetic strength={0.15}>
                <a
                  href={'mailto:' + brand.email}
                  data-cursor="grow"
                  className="font-display text-2xl tracking-tight text-mist transition-colors hover:text-brass md:text-3xl"
                >
                  {brand.email}
                </a>
              </Magnetic>
            </div>

            <div>
              <p className="eyebrow mb-3">Studio</p>
              <p className="text-base text-muted">{brand.location}</p>
              <p className="mt-1 text-base text-muted">{brand.phone}</p>
            </div>

            <div>
              <p className="eyebrow mb-3">Elsewhere</p>
              <ul className="space-y-1">
                {brand.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="grow"
                      className="text-base text-muted transition-colors hover:text-mist"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-fade flex flex-col gap-2 py-10 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {brand.full}
          </span>
          <span className="font-mono uppercase tracking-[0.18em]">{brand.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
