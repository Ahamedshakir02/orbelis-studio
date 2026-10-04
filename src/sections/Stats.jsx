import Section from '../components/Section.jsx'
import { stats } from '../data/site.js'

/**
 * Hard numbers, set large. Claims are cheap; a number with a unit attached is
 * the thing a sceptical buyer actually reads. Stated, not counted up — a
 * figure that animates from zero is a figure the reader has to wait for.
 */
export default function Stats() {
  return (
    <Section label="Standards" title="Held to a number.">
      <dl className="stagger grid grid-cols-2 gap-x-6 gap-y-12 text-center md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="whitespace-nowrap text-[34px] font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl">
              {s.value}
              {s.suffix}
            </dd>
            <dt className="mx-auto mt-4 max-w-[13rem] text-sm leading-relaxed text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  )
}
