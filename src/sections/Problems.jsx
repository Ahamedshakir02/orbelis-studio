import Section from '../components/Section.jsx'
import { problems } from '../data/site.js'

/**
 * The costs, named before the services that remove them. A visitor who
 * recognises their own week in these three reads the price list differently.
 */
export default function Problems() {
  return (
    <Section label="Where the time goes" title="Three things that quietly cost you.">
      <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
        {problems.map((p, i) => (
          <li key={p.title}>
            <span className="font-mono text-[11px] tracking-[0.18em] text-brass">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 font-display text-lg leading-snug tracking-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
