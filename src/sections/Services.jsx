import Section from '../components/Section.jsx'
import { services } from '../data/site.js'

/**
 * Services as a price list. Prices are on the page on purpose: it filters out
 * the people who were never going to pay, and saves everyone else a call.
 *
 * Each row can be enquired about directly — the form opens with that service
 * chosen — and the list ends by catching the visitor who cannot tell which row
 * is theirs, which is most of them.
 */
const enquire = (type) => () => window.dispatchEvent(new CustomEvent('orbelis:enquire', { detail: type }))

export default function Services() {
  return (
    <Section
      id="services"
      label="Services & pricing"
      title="Five things, done properly."
      intro={
        'Two you build once, three that keep running. Fixed ranges, not "request a quote" — ' +
        'and every build includes the performance budget and the accessibility pass.'
      }
    >
      <div className="divide-y divide-line border-y border-line">
        {services.map((s) => (
          <article key={s.index} className="grid gap-4 py-8 md:grid-cols-9 md:gap-8">
            <div className="flex items-baseline gap-3 md:col-span-1 md:block">
              <span className="font-mono text-xs text-muted">{s.index}</span>
              {/* Which band the service sits in: built once, or kept running. */}
              <span className="text-xs text-muted md:mt-2 md:block">{s.group}</span>
            </div>

            <div className="md:col-span-5">
              <h3 className="text-xl font-medium tracking-tight md:text-2xl">{s.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">{s.body}</p>
              <p className="mt-4 text-sm text-mist">{s.points.join(' · ')}</p>
            </div>

            <div className="flex items-center justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:justify-start">
              <p className="text-lg font-medium tracking-tight text-mist">{s.price}</p>
              <a
                href="#contact"
                onClick={enquire(s.enquiry)}
                className="inline-flex h-10 items-center gap-2 text-sm font-medium text-link underline-offset-4 hover:underline"
              >
                Enquire<span className="sr-only"> about {s.title}</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-5 rounded-xl border border-line bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-lg font-medium tracking-tight">Not sure which one you need?</p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
            Most people are not. Say what is slowing the business down and you get a straight answer,
            including when the answer is none of these.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-lg bg-action px-5 text-sm font-medium text-onaction transition hover:bg-actionhover active:scale-[0.97] md:self-auto"
        >
          Describe the problem
          <span aria-hidden>→</span>
        </a>
      </div>
    </Section>
  )
}
