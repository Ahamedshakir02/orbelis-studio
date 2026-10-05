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

/**
 * The work, one card per entry: what it is and whether it is live on the
 * left, its facts on the right. The status is said first and plainly, before
 * anything else about the project is read.
 */
export default function Work() {
  return (
    <Section
      id="work"
      label="Work"
      title="Proof, labelled honestly."
      intro="Client work, shown with permission."
    >
      <div className="stagger grid gap-4">
        {work.map((item) => (
          <article key={item.id} className="lift rounded-[18px] border border-line bg-surface p-7 md:p-9">
            {item.image && <Figure src={item.image} alt={item.imageAlt} title={item.title} />}

            <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:gap-12">
              <div>
                <span className="inline-flex rounded-full bg-raised px-2.5 py-0.5 text-xs text-mist/80">
                  {item.status} · {item.year}
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-[28px]">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.role}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">{item.summary}</p>

                {/* Only for projects with a public URL — see `href` in site.js. */}
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex h-10 items-center gap-1 text-[15px] text-link underline-offset-4 hover:underline"
                  >
                    Visit {item.title}
                    <span aria-hidden>›</span>
                  </a>
                )}
              </div>

              <div className="md:border-l md:border-line md:pl-12">
                <dl className="space-y-5">
                  {item.metrics.map((m) => (
                    <div key={m.k}>
                      <dt className="text-xs text-muted">{m.k}</dt>
                      <dd className="mt-1 text-[15px] font-medium">{m.v}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-xs text-muted">Built with</dt>
                    <dd className="mt-1 font-mono text-xs leading-relaxed text-muted">{item.stack.join(' · ')}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
