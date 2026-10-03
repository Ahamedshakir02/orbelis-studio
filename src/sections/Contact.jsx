import { brand, socials } from '../data/site.js'
import EnquiryForm from '../components/EnquiryForm.jsx'

/**
 * The close. The form comes first: a visitor who read this far has already
 * decided, and the next thing they see should be the thing that takes their
 * enquiry. Contact details sit beside it for anyone who would rather write.
 */
export default function Contact() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-line pt-16 md:pt-24">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <p className="eyebrow md:sticky md:top-24">Start a project</p>
          </div>

          <div className="md:col-span-9">
            <h2 className="max-w-2xl font-semibold text-3xl leading-[1.08] tracking-tight md:text-4xl">
              Let's build something worth scrolling.
            </h2>

            <div className="mt-10 grid gap-12 md:mt-12 md:grid-cols-9 md:gap-10">
              <div className="md:col-span-6">
                <EnquiryForm />
              </div>

              <div className="space-y-8 md:col-span-3">
                <div>
                  <p className="eyebrow mb-2">Email</p>
                  <a
                    href={'mailto:' + brand.email}
                    className="break-words text-sm text-mist underline-offset-4 transition-colors hover:text-brass hover:underline"
                  >
                    {brand.email}
                  </a>
                </div>

                <div>
                  <p className="eyebrow mb-2">Studio</p>
                  {/* Real postal address: local search reads it, and anyone paying
                      by invoice looks for it. Street and phone appear only once
                      they are set in site.js. */}
                  <address className="text-sm not-italic leading-relaxed text-muted">
                    {brand.address.street && (
                      <>
                        {brand.address.street}
                        <br />
                      </>
                    )}
                    {brand.address.locality}, {brand.address.region}{' '}
                    {brand.address.postalCode}
                    <br />
                    India
                  </address>
                  {brand.phone && (
                    <p className="mt-2 text-sm text-muted">
                      <a
                        href={'tel:' + brand.phone.replace(/\s/g, '')}
                        className="transition-colors hover:text-mist"
                      >
                        {brand.phone}
                      </a>
                    </p>
                  )}
                </div>

                {socials.length > 0 && (
                  <div>
                    <p className="eyebrow mb-2">Elsewhere</p>
                    <ul className="space-y-1">
                      {socials.map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-sm text-muted transition-colors hover:text-mist"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line py-8 text-xs text-muted md:mt-24 md:flex-row md:items-center md:justify-between">
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
            {/* Generated from site.js by `npm run brochure`. */}
            <a href="/orbelis-profile.pdf" className="transition-colors hover:text-mist">
              Company profile (PDF)
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
