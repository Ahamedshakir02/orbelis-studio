import Section from '../components/Section.jsx'
import { stats } from '../data/site.js'

/**
 * Hard numbers. Claims are cheap; numbers with a unit attached are the thing a
 * sceptical buyer actually reads. Stated, not counted up — a figure that
 * animates from zero is a figure the reader has to wait for.
 */
export default function Stats() {
  return (
    <Section label="Standards">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="whitespace-nowrap text-3xl font-semibold tracking-tight text-mist md:text-4xl">
              {s.value}
              {s.suffix}
            </dd>
            <dt className="mt-3 text-sm leading-relaxed text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  )
}
