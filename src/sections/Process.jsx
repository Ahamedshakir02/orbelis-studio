import Section from '../components/Section.jsx'
import { process } from '../data/site.js'

/** How a project runs, in four steps. */
export default function Process() {
  return (
    <Section id="process" label="Process" title="Small scope. Fast ship.">
      <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {process.map((p) => (
          <li key={p.step} className="border-t border-line pt-5">
            <span className="font-mono text-[11px] tracking-[0.18em] text-brass">{p.step}</span>
            <h3 className="mt-3 font-display text-lg tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
