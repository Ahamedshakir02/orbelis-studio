import Section from '../components/Section.jsx'
import { manifesto } from '../data/site.js'

/**
 * What the studio believes, in three sentences. The first carries the weight;
 * the other two follow at reading volume.
 */
export default function Manifesto() {
  return (
    <Section label="Approach">
      <div className="max-w-2xl space-y-6">
        {manifesto.map((line, i) => (
          <p
            key={i}
            className={
              'text-xl font-medium leading-snug tracking-tight md:text-2xl ' +
              (i === 0 ? 'text-mist' : 'text-muted')
            }
          >
            {line}
          </p>
        ))}
      </div>
    </Section>
  )
}
