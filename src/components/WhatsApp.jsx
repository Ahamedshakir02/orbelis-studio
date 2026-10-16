import { brand, whatsappHref } from '../data/site.js'

export function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  )
}

/**
 * Floating WhatsApp button, bottom right, on every screen size.
 *
 * It took the place of the chat assistant: for this audience a message on
 * WhatsApp is the enquiry, and it reaches a person rather than a bot. The
 * assistant still lives in components/Assistant if it ever comes back.
 *
 * On phones it hides while the sticky call to action is up, because that bar
 * already carries a WhatsApp button — see .wa-launcher in index.css.
 */
export default function WhatsAppButton() {
  if (!whatsappHref) return null

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      className="wa-launcher fixed bottom-5 right-4 z-[95] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-95 active:scale-[0.95] md:bottom-8 md:right-8 md:h-14 md:w-14"
    >
      <span className="sr-only">Message {brand.full} on WhatsApp</span>
      <WhatsAppIcon size={26} />
    </a>
  )
}
