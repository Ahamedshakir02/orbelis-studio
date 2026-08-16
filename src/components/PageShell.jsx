import { brand } from '../data/site.js'

/**
 * Layout for the secondary pages — privacy, terms, 404.
 *
 * Deliberately quiet: no WebGL canvas, no scroll choreography, no assistant.
 * These pages exist to be read, and someone who has landed on the privacy
 * policy is looking for a specific sentence, not a performance. Keeping them
 * static also means they carry none of the home page's weight.
 *
 * They still use the same tokens, type and rules, so they read as the same
 * studio rather than a bolted-on legal annex.
 */
export default function PageShell({ title, intro, children, footNote }) {
  const year = new Date().getFullYear()

  return (
    <div className="flex min-h-[100svh] flex-col">
      <a href="#content" className="skip-link">
        Skip to content
      </a>

      <header className="border-b border-line">
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <a href="/" className="font-display text-lg tracking-tight" data-cursor="grow">
            {brand.name}
            <span className="text-brass">.</span>
          </a>
          <a
            href="/"
            data-cursor="grow"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-mist"
          >
            ← Back to the site
          </a>
        </div>
      </header>

      <main id="content" className="container-x flex-1 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl leading-[0.95] tracking-tightest md:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {intro}
            </p>
          )}
          {footNote && <p className="eyebrow mt-6">{footNote}</p>}

          <div className="mt-14 space-y-12">{children}</div>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {brand.full}
          </span>
          <nav className="flex flex-wrap gap-5" aria-label="Legal">
            <a href="/privacy" className="transition-colors hover:text-mist">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-mist">
              Terms
            </a>
            <a
              href={'mailto:' + brand.email}
              className="transition-colors hover:text-mist"
            >
              {brand.email}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
