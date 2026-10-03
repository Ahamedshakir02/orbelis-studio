import Section from '../components/Section.jsx'
import { audiences } from '../data/site.js'

/**
 * Who the studio builds for, and what each one gets. Outcomes are listed as
 * things delivered, not results promised — a studio this size can stand behind
 * what it ships, not behind a number it does not control.
 */
export default function Audience() {
  return (
    <Section label="Who it is for" title="Built for four kinds of business.">
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
        {audiences.map((a) => (
          <article key={a.title} className="border-t border-line pt-6">
            <h3 className="font-display text-xl tracking-tight">{a.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
            <ul className="mt-5 space-y-2">
              {a.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-mist">
                  <span className="mt-[9px] inline-block h-px w-3 shrink-0 bg-brass" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
