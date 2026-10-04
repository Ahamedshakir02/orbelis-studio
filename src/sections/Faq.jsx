import Section from '../components/Section.jsx'
import { faq, brand } from '../data/site.js'

/**
 * Objection handling, on the page. Every question here is one that would
 * otherwise eat the first ten minutes of a sales call.
 *
 * Native <details>, so it opens with a keyboard, reads correctly to a screen
 * reader, is searchable with find-in-page, and works before any script has
 * loaded — none of which a hand-built accordion gets for free.
 */
export default function Faq() {
  return (
    <Section id="faq" label="Questions" title="Answered before you ask." width="narrow">
      <div className="divide-y divide-line border-y border-line">
        {faq.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">{item.q}</h3>
              <span
                className="mt-0.5 shrink-0 font-mono text-lg text-muted transition-transform duration-200 group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-7 text-sm leading-relaxed text-muted md:text-base">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-8 text-center text-[15px] text-muted">
        Still stuck?{' '}
        <a href={'mailto:' + brand.email} className="text-link underline underline-offset-4">
          Email directly
        </a>
        .
      </p>
    </Section>
  )
}
