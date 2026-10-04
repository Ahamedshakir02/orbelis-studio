import { brand } from '../data/site.js'
import ThemeToggle from './ThemeToggle.jsx'

/**
 * Layout for the secondary pages — privacy, terms, 404.
 *
 * Deliberately quiet: no assistant, no sticky call to action. These pages
 * exist to be read, and someone who has landed on the privacy policy is
 * looking for a specific sentence.
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
        <div className="container-x flex h-14 items-center justify-between">
          <a href="/" className="inline-flex h-10 items-center font-display text-lg tracking-tight">
            {brand.name}
            <span className="text-brass">.</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="inline-flex h-10 items-center text-sm text-muted transition-colors hover:text-mist">
              ← Back to the site
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="content" className="container-x flex-1 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="font-semibold text-4xl leading-[0.95] tracking-tightest md:text-6xl">
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
          <nav className="flex flex-wrap gap-x-5" aria-label="Legal">
            <a href="/privacy" className="inline-flex h-10 min-w-10 items-center transition-colors hover:text-mist">
              Privacy
            </a>
            <a href="/terms" className="inline-flex h-10 min-w-10 items-center transition-colors hover:text-mist">
              Terms
            </a>
            <a
              href={'mailto:' + brand.email}
              className="inline-flex h-10 min-w-10 items-center transition-colors hover:text-mist"
            >
              {brand.email}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
