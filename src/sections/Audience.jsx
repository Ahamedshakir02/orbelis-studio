import Section from '../components/Section.jsx'
import { audiences } from '../data/site.js'

/**
 * Who the studio builds for, and what each one gets. Outcomes are listed as
 * things delivered, not results promised — a studio this size can stand behind
 * what it ships, not behind a number it does not control.
 */
export default function Audience() {
  return (
    <Section label="Who it is for" title="For businesses that run on enquiries." intro="Four kinds I build for, and what each one gets.">
      <div className="stagger grid gap-4 md:grid-cols-2">
        {audiences.map((a) => (
          <article key={a.title} className="lift rounded-[18px] border border-line bg-surface p-7">
            <h3 className="text-2xl font-semibold leading-tight tracking-tight">{a.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.body}</p>
            <ul className="mt-5 space-y-2 border-t border-line pt-5">
              {a.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-mist">
                  <span className="mt-[8px] inline-block h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden />
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
