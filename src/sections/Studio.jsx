import Section from '../components/Section.jsx'
import { studio, capabilities } from '../data/site.js'

/**
 * Who is behind it. Capabilities and credentials, framed as studio facts
 * rather than a CV.
 */
export default function Studio() {
  return (
    <Section id="studio" label="Studio" title={studio.lead}>
      <div className="max-w-2xl space-y-5">
        {studio.body.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-muted">
            {p}
          </p>
        ))}
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
        {studio.facts.map((f) => (
          <div key={f.k}>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{f.k}</dt>
            <dd className="mt-2 text-sm text-mist">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 border-t border-line pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Working with</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">{capabilities.join(' · ')}</p>
      </div>
    </Section>
  )
}
