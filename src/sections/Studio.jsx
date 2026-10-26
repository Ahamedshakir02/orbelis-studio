import Section from '../components/Section.jsx'
import { studio, manifesto } from '../data/site.js'

/**
 * The studio, told through the one idea it sells: your own tech team,
 * without the hiring.
 *
 * The centrepiece is a pair of ledgers. On the left, everything it takes to
 * build a tech team yourself, crossed out line by line as it scrolls in. On
 * the right, the three steps that replace it. Below, what we believe, set as
 * large numbered lines instead of cards, and a single row of facts.
 *
 * The strike-throughs are drawn by default and only replayed when the block
 * is revealed (`.reveal.in .strike` in index.css), so the page reads the same
 * with scripts off or reduced motion on.
 */
export default function Studio() {
  const { hiring, instead, facts } = studio

  return (
    <Section id="studio" label="About" title={studio.lead} intro={studio.intro}>
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-5">
        {/* What you'd have to do without us. */}
        <div className="rounded-[22px] border border-line bg-surface p-7 md:p-9">
          <p className="eyebrow">{hiring.label}</p>
          <ol className="mt-6 space-y-4">
            {hiring.items.map((item, i) => (
              <li key={item} className="flex gap-4 text-[16px] leading-snug text-muted md:text-[17px]">
                <span className="mt-[3px] font-mono text-[11px] tabular-nums text-muted/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="strike" style={{ '--i': i }}>
                  {item}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-dashed border-line pt-5 text-sm text-muted">{hiring.total}</p>
        </div>

        {/* The turn between the two. */}
        <div className="flex items-center justify-center" aria-hidden="true">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-bg text-[13px] font-medium text-muted">
            or
          </span>
        </div>

        {/* What it takes with us. */}
        <div className="studio-instead relative overflow-hidden rounded-[22px] border border-brass/40 bg-raised p-7 md:p-9">
          <p className="eyebrow !text-link">{instead.label}</p>
          <ol className="stagger mt-6 space-y-6">
            {instead.steps.map((step) => (
              <li key={step} className="flex items-start gap-4">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass text-[#08090c]">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                <span className="text-[21px] font-semibold leading-tight tracking-[-0.02em] md:text-[24px]">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-line pt-5 text-sm font-medium text-link">{instead.total}</p>
        </div>
      </div>

      {/* What we believe, as statements rather than cards. */}
      <ol className="stagger mt-20 border-t border-line md:mt-24">
        {manifesto.map((line, i) => (
          <li key={line} className="belief group grid gap-3 border-b border-line py-7 md:grid-cols-[5rem_1fr] md:gap-6 md:py-9">
            <span className="font-mono text-[13px] text-brass">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-[21px] font-medium leading-snug tracking-[-0.02em] [text-wrap:pretty] md:text-[28px]">
              {line}
            </p>
          </li>
        ))}
      </ol>

      {/* The facts, as one quiet line. */}
      <dl className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-5 text-center">
        {facts.map((f) => (
          <div key={f.k}>
            <dt className="text-xs text-muted">{f.k}</dt>
            <dd className="mt-1 text-[15px] font-medium">{f.v}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
