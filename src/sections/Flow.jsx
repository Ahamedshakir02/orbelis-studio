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
      label="How it works"
      title="From first message to follow-up, handled."
      intro="What happens to one enquiry once automation is in place. Nobody has to remember any of it."
    >
      <ol className="stagger grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {flow.map((f) => (
          <li key={f.step} className="border-t border-line pt-5">
            <span className="font-mono text-xs text-muted">{f.step}</span>
            <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
