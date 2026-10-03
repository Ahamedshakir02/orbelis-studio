import Section from '../components/Section.jsx'
import { flow } from '../data/site.js'

/**
 * One enquiry followed end to end — the assistant and the automation shown as
 * a single sequence rather than described as two services.
 *
 * An ordered list, because it is one: the order is the content.
 */
export default function Flow() {
  return (
    <Section
      label="Automation"
      title="One enquiry, start to finish."
      intro="Nobody remembers to do any of this. That is the point."
    >
      <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
        {flow.map((f) => (
          <li key={f.step} className="border-t border-line pt-5">
            <span className="font-mono text-[11px] tracking-[0.18em] text-brass">{f.step}</span>
            <h3 className="mt-3 font-display text-base leading-snug tracking-tight">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
