import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { faq, brand } from '../data/site.js'

/**
 * Objection handling, on the page. Every question here is one that would
 * otherwise eat the first ten minutes of a sales call.
 *
 * Built as real buttons with aria-expanded so it works on a keyboard and reads
 * correctly to a screen reader — an accordion that only responds to a mouse is
 * a broken accordion.
 */
function Item({ item, index, open, onToggle }) {
  const panel = useRef(null)

  const toggle = () => {
    const el = panel.current
    const willOpen = !open
    onToggle(willOpen ? index : -1)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el) return

    gsap.to(el, {
      height: willOpen ? 'auto' : 0,
      opacity: willOpen ? 1 : 0,
      duration: reduce ? 0 : 0.5,
      ease: 'expo.out',
    })
  }

  return (
    <div className="faq-item border-b border-line">
      <h3>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          data-cursor="grow"
          className="flex w-full items-start justify-between gap-8 py-7 text-left"
        >
          <span className="font-display text-xl tracking-tight md:text-2xl">{item.q}</span>
          <span
            className={
              'mt-1 shrink-0 font-mono text-lg text-brass transition-transform duration-300 ' +
              (open ? 'rotate-45' : '')
            }
            aria-hidden
          >
            +
          </span>
        </button>
      </h3>

      <div ref={panel} className="h-0 overflow-hidden opacity-0">
        <p className="max-w-2xl pb-7 text-sm leading-relaxed text-muted md:text-base">
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(-1)

  const root = useGsap(() => {
    gsap.from('.faq-item', {
      y: 28,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
    })
  }, [])

  return (
    <section ref={root} id="faq" className="relative py-32 md:py-48">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="eyebrow mb-5">Questions</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tightest md:text-6xl">
            Answered before you ask.
          </h2>
          <p className="mt-6 text-sm text-muted">
            Still stuck?{' '}
            <a
              href={'mailto:' + brand.email}
              data-cursor="grow"
              className="text-brass underline underline-offset-4"
            >
              Email directly
            </a>
            .
          </p>
        </div>

        <div className="faq-list md:col-span-8">
          {faq.map((item, i) => (
            <Item
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={setOpenIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
