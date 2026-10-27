import PageShell from './PageShell.jsx'
import { privacy, terms, notFound, lastUpdated } from '../data/legal.js'
import { brand } from '../data/site.js'

/**
 * The secondary pages, by name. Shared by the browser entry (src/legal.jsx)
 * and the build-time prerender (src/entry-server.jsx), so the HTML a crawler
 * reads and the page a visitor sees are the same tree.
 */
export function legalView(page) {
  return page === 'privacy' ? <Legal doc={privacy} />
    : page === 'terms' ? <Legal doc={terms} />
    : <NotFound />
}

function Legal({ doc }) {
  return (
    <PageShell
      title={doc.title}
      intro={doc.intro}
      footNote={`Last updated ${lastUpdated}`}
    >
      {doc.sections.map((s) => (
        <section key={s.h}>
          <h2 className="font-semibold text-2xl tracking-tight md:text-3xl">{s.h}</h2>
          <div className="mt-4 space-y-4">
            {s.p.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted md:text-base">
                {para}
              </p>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  )
}

function NotFound() {
  const links = [
    { href: '/#process', label: 'How we work' },
    { href: '/#services', label: 'Services' },
    { href: '/#faq', label: 'Questions, answered' },
    { href: '/#contact', label: 'Book a free consultation' },
  ]

  return (
    <PageShell title={notFound.title} intro={notFound.intro}>
      <section>
        <h2 className="font-semibold text-2xl tracking-tight md:text-3xl">
          Where you were probably going
        </h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="flex items-center justify-between py-5 font-semibold text-xl tracking-tight transition-colors hover:text-link md:text-2xl"
              >
                {l.label}
                <span aria-hidden className="font-mono text-link">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          If a link brought you here, telling us where it was is genuinely
          useful —{' '}
          <a
            href={'mailto:' + brand.email}
            className="text-link underline underline-offset-4"
          >
            {brand.email}
          </a>
          .
        </p>
      </section>
    </PageShell>
  )
}
