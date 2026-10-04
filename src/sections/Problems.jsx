import Section from '../components/Section.jsx'
import { problems } from '../data/site.js'

/**
 * The costs, named before the services that remove them. A visitor who
 * recognises their own week in these three reads the service list differently.
 *
 * Set as panels one step above the page: the lift is the only decoration.
 */
export default function Problems() {
  return (
    <Section label="The problem" title="Work that should not need a person." intro="Three ways a business loses hours and customers without noticing.">
      <ol className="stagger grid gap-4 md:grid-cols-3">
        {problems.map((p, i) => (
          <li key={p.title} className="lift rounded-[18px] border border-line bg-surface p-7">
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">{p.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
