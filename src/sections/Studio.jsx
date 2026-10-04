import Section from '../components/Section.jsx'
import { studio, capabilities, manifesto } from '../data/site.js'

/**
 * Who is behind it, and what they believe. Capabilities and credentials,
 * framed as studio facts rather than a CV.
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

      {/* The studio's position, in its own words. */}
      <div className="mt-12 border-t border-line pt-8">
        <p className="text-xs text-muted">What we believe</p>
        <ul className="mt-4 max-w-2xl space-y-3">
          {manifesto.map((line, i) => (
            <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-mist">
              <span className="mt-[11px] inline-block h-px w-3 shrink-0 bg-brass" aria-hidden />
              {line}
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
        {studio.facts.map((f) => (
          <div key={f.k}>
            <dt className="text-xs text-muted">{f.k}</dt>
            <dd className="mt-2 text-sm text-mist">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 border-t border-line pt-8">
        <p className="text-xs text-muted">Working with</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">{capabilities.join(' · ')}</p>
      </div>
    </Section>
  )
}
