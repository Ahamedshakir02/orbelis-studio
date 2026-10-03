import Section from '../components/Section.jsx'
import { services } from '../data/site.js'

/**
 * Services as a price list. Prices are on the page on purpose: it filters out
 * the people who were never going to pay, and saves everyone else a call.
 */
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
              <span className="text-xs text-muted md:mt-2 md:block">
                {s.group}
              </span>
            </div>

            <div className="md:col-span-6">
              <h3 className="font-medium text-xl tracking-tight md:text-2xl">{s.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {s.body}
              </p>
              <p className="mt-4 text-sm text-mist">{s.points.join(' · ')}</p>
            </div>

            <p className="text-lg font-medium tracking-tight text-mist md:col-span-2 md:text-right">
              {s.price}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
