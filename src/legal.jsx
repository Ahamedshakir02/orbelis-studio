import React from 'react'
import ReactDOM from 'react-dom/client'
import PageShell from './components/PageShell.jsx'
import { privacy, terms, notFound, lastUpdated } from './data/legal.js'
import { brand } from './data/site.js'
import './index.css'

/**
 * One entry point for every secondary page.
 *
 * Which page to render comes from `data-page` on the body of the HTML file
 * that loaded this script. That keeps privacy.html, terms.html and 404.html as
 * real, separately crawlable documents with their own <title> and description
 * in the served markup — which is the point of building them as pages instead
 * of client-side routes — while they share one small bundle and one layout.
 */

function Legal({ doc }) {
  return (
    <PageShell
      title={doc.title}
      intro={doc.intro}
      footNote={`Last updated ${lastUpdated}`}
    >
      {doc.sections.map((s) => (
        <section key={s.h}>
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">{s.h}</h2>
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
    { href: '/#work', label: 'The work' },
    { href: '/#services', label: 'Services & pricing' },
    { href: '/#faq', label: 'Questions, answered' },
    { href: '/#contact', label: 'Start a project' },
  ]

  return (
    <PageShell title={notFound.title} intro={notFound.intro}>
      <section>
        <h2 className="font-display text-2xl tracking-tight md:text-3xl">
          Where you were probably going
        </h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor="grow"
                className="flex items-center justify-between py-5 font-display text-xl tracking-tight transition-colors hover:text-brass md:text-2xl"
              >
                {l.label}
                <span aria-hidden className="font-mono text-brass">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          If a link brought you here, telling me where it was is genuinely
          useful —{' '}
          <a
            href={'mailto:' + brand.email}
            className="text-brass underline underline-offset-4"
          >
            {brand.email}
          </a>
          .
        </p>
      </section>
    </PageShell>
  )
}

const page = document.body.dataset.page
const view =
  page === 'privacy' ? <Legal doc={privacy} />
  : page === 'terms' ? <Legal doc={terms} />
  : <NotFound />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{view}</React.StrictMode>,
)
