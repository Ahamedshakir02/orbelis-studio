import Section from '../components/Section.jsx'
import { problems, problemIntro } from '../data/site.js'

/**
 * The gap, named before the services that close it: an idea with no one to
 * build it, or a problem with no one to solve it. A visitor who recognises their
 * own week in these three reads the service list differently.
 *
 * Set as panels one step above the page: the lift is the only decoration.
 */
export default function Problems() {
  return (
    <Section label="The problem" title={problemIntro.title} intro={problemIntro.intro}>
      <ol className="stagger grid gap-4 lg:grid-cols-3">
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
