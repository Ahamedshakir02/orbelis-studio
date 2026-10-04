import Section from '../components/Section.jsx'
import { studio, capabilities, manifesto } from '../data/site.js'

/**
 * Who is behind it, and what they believe. Capabilities and credentials,
 * framed as studio facts rather than a CV.
 */
export default function Studio() {
  return (
    <Section id="studio" label="Studio" title={studio.lead}>
      <div className="mx-auto max-w-2xl space-y-5 text-center">
        {studio.body.map((p, i) => (
          <p key={i} className="text-[17px] leading-relaxed text-muted md:text-lg">
            {p}
          </p>
        ))}
      </div>

      {/* The studio's position, in its own words. */}
      <ul className="stagger mt-14 grid gap-4 md:grid-cols-3">
        {manifesto.map((line, i) => (
          <li key={i} className="lift rounded-[18px] border border-line bg-surface p-7 text-[17px] font-medium leading-snug tracking-tight">
            {line}
          </li>
        ))}
      </ul>

      <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 text-center md:grid-cols-4">
        {studio.facts.map((f) => (
          <div key={f.k}>
            <dt className="text-xs text-muted">{f.k}</dt>
            <dd className="mt-2 text-[17px] font-medium">{f.v}</dd>
          </div>
        ))}
      </dl>

      <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-muted">
        Working with {capabilities.join(' · ')}
      </p>
    </Section>
  )
}
