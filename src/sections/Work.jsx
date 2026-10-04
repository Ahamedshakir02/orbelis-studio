import Section from '../components/Section.jsx'
import { work } from '../data/site.js'

/**
 * A case-study image that cannot ship without a described alternative.
 *
 * `alt` must be present — an empty string is a valid, deliberate answer for a
 * purely decorative capture, but leaving it off entirely is not. Undefined
 * fails loudly in development and renders nothing in production, so the
 * failure mode is a missing image someone notices rather than an undescribed
 * one nobody does.
 *
 * Loaded lazily and given explicit dimensions, so a screenshot arriving late
 * does not shift the entry below it.
 */
function Figure({ src, alt, title }) {
  if (typeof alt !== 'string') {
    if (import.meta.env?.DEV) {
      console.error(
        `[work] "${title}" has an image but no alt text. Add \`imageAlt\` to it in ` +
          'src/data/site.js — use an empty string only if the image is decorative.',
      )
    }
    return null
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width="1200"
      height="750"
      className="mb-8 aspect-[8/5] w-full rounded-2xl border border-line object-cover"
    />
  )
}

/** The work, as a plain list. Each entry says what it is and whether it is live. */
export default function Work() {
  return (
    <Section
      id="work"
      label="Work"
      title="Built, not templated."
      intro="One live product, two labelled concepts. Nothing here pretends to be a client engagement that was not one."
    >
      <div className="divide-y divide-line border-y border-line">
        {work.map((item) => (
          <article key={item.id} className="py-10">
            {item.image && <Figure src={item.image} alt={item.imageAlt} title={item.title} />}

            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
              <span className="rounded-full bg-raised px-2.5 py-0.5 text-xs text-mist/80">
                {item.status} · {item.year}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{item.role}</p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {item.summary}
            </p>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {item.metrics.map((m) => (
                <div key={m.k}>
                  <dt className="text-xs text-muted">
                    {m.k}
                  </dt>
                  <dd className="mt-1 text-sm text-mist">{m.v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 font-mono text-xs text-muted">{item.stack.join(' · ')}</p>

            {/* Only for projects with a public URL — see `href` in site.js. */}
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-link transition-colors hover:text-mist"
              >
                Visit {item.title}
                <span aria-hidden>↗</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
