import Section from '../components/Section.jsx'
import { process } from '../data/site.js'

/** How a project runs, in four steps. */
export default function Process() {
  return (
    <Section id="process" label="Process" title="How we work: like your own tech team." intro="Close to your business, built in small steps, and still here after launch.">
      <ol className="stagger grid gap-8 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {process.map((p) => (
          <li key={p.step} className="border-t border-line pt-5">
            <span className="font-mono text-xs text-muted">{p.step}</span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
