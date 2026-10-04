import { brand, socials, nav } from '../data/site.js'
import EnquiryForm from '../components/EnquiryForm.jsx'

/**
 * The close: one question, the form that answers it, and the other ways in
 * underneath for anyone who would rather write.
 */
export default function Contact() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-tile pt-20 md:pt-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Start a project</p>
          <h2 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance] md:text-[48px] lg:text-[56px]">
            Tell me what is slowing you down.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-snug text-muted [text-wrap:balance] md:text-[21px] md:leading-[1.4]">
            Name the task that eats your week. You get a straight answer, usually the same day.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-[22px] border border-line bg-surface p-6 md:mt-16 md:p-10">
          <EnquiryForm />
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl gap-8 text-center sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-1">Email</p>
            <a
              href={'mailto:' + brand.email}
              className="inline-flex min-h-10 items-center break-all text-[17px] text-mist underline-offset-4 transition-colors hover:text-link hover:underline"
            >
              {brand.email}
            </a>
          </div>

          <div>
            <p className="eyebrow mb-2">Studio</p>
            {/* Real postal address: local search reads it, and anyone paying
                by invoice looks for it. Street and phone appear only once
                they are set in site.js. */}
            <address className="text-[15px] not-italic leading-relaxed text-muted">
              {brand.address.street && (
                <>
                  {brand.address.street}
                  <br />
                </>
              )}
              {brand.address.locality}, {brand.address.region} {brand.address.postalCode}, India
            </address>
            {brand.phone && (
              <p className="mt-1 text-[15px] text-muted">
                <a href={'tel:' + brand.phone.replace(/\s/g, '')} className="inline-flex min-h-10 items-center transition-colors hover:text-mist">
                  {brand.phone}
                </a>
              </p>
            )}
          </div>

          {socials.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-x-6 sm:col-span-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-10 items-center text-[15px] text-muted transition-colors hover:text-mist"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-line py-6 text-xs text-muted md:mt-28 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {brand.full}
          </span>

          <nav className="flex flex-wrap gap-x-5" aria-label="Footer">
            {[...nav, { label: 'Questions', href: '#faq' }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex h-10 min-w-10 items-center transition-colors hover:text-mist"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <nav className="flex flex-wrap gap-x-5" aria-label="Legal">
            <a href="/privacy" className="inline-flex h-10 min-w-10 items-center transition-colors hover:text-mist">
              Privacy
            </a>
            <a href="/terms" className="inline-flex h-10 min-w-10 items-center transition-colors hover:text-mist">
              Terms
            </a>
            {/* Generated from site.js by `npm run brochure`. */}
            <a href="/orbelis-profile.pdf" className="inline-flex h-10 min-w-10 items-center transition-colors hover:text-mist">
              Company profile (PDF)
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
