import { useCallback, useEffect, useRef, useState } from 'react'
import { brand, assistant as cfg } from '../../data/site.js'
import { ask, isRemoteEnabled } from '../../lib/assistant/ask.js'
import { scrollToTarget, lockScroll } from '../../lib/scroll.js'

/**
 * The studio's own product, running on the studio's own site.
 *
 * Selling "an assistant that answers at 2am" from a page with no assistant on it
 * is the sort of gap a prospect notices. This is the demo — and because it is
 * grounded in src/data/site.js, it is also genuinely the fastest way for a
 * visitor to get a straight answer out of this page.
 *
 * Accessibility is not decoration here: it is a dialog, so it behaves like one.
 * Escape closes, focus is trapped while open and returned to the launcher on
 * close, and replies land in an aria-live region so a screen reader announces
 * them instead of leaving the user to guess that anything happened.
 */

const uid = () => Math.random().toString(36).slice(2)

function Typing() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass"
          style={{ animationDelay: `${i * 160}ms`, animationDuration: '1s' }}
        />
      ))}
    </div>
  )
}

function Message({ msg, onCite }) {
  const isUser = msg.role === 'user'
  return (
    <div className={'flex ' + (isUser ? 'justify-end' : 'justify-start')}>
      <div className={'max-w-[85%] ' + (isUser ? 'text-right' : '')}>
        <div
          className={
            'whitespace-pre-line rounded-2xl px-4 py-3 text-[13px] leading-relaxed md:text-sm ' +
            (isUser
              ? 'rounded-br-sm bg-action text-onaction'
              : 'rounded-bl-sm border border-line bg-raised text-mist')
          }
        >
          {msg.text}
        </div>

        {msg.source && (
          <button
            type="button"
            onClick={() => onCite(msg.source.href)}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-link"
          >
            <span className="h-1 w-1 rounded-full bg-brass" aria-hidden />
            {msg.source.label}
            <span aria-hidden>↗</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { id: uid(), role: 'assistant', text: cfg.intro },
  ])

  const launcher = useRef(null)
  const panel = useRef(null)
  const log = useRef(null)
  const field = useRef(null)

  const showSuggestions = messages.length === 1 && !busy

  // Open/close: the panel's own classes do the fade. Here, freeze the page
  // behind it on small screens (a full-screen sheet with the page scrolling
  // underneath feels broken) and move focus into the field.
  useEffect(() => {
    if (!open) {
      lockScroll(false, 'assistant')
      return
    }
    if (window.matchMedia('(max-width: 767px)').matches) lockScroll(true, 'assistant')
    // The panel is `invisible` until this render commits; focus after it is not.
    const t = setTimeout(() => field.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [open])

  // Release the scroll lock if the component unmounts while open.
  useEffect(() => () => lockScroll(false, 'assistant'), [])

  // Escape closes; Tab cycles inside the panel while it is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        close()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return

      const focusables = panel.current.querySelectorAll(
        'button:not([disabled]), input, textarea, a[href]',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    const el = log.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy])

  const close = useCallback(() => {
    setOpen(false)
    launcher.current?.focus()
  }, [])

  const send = useCallback(
    async (raw) => {
      const question = String(raw || '').trim()
      if (!question || busy) return

      const history = messages.map((m) => ({ role: m.role, text: m.text }))
      setMessages((prev) => [...prev, { id: uid(), role: 'user', text: question }])
      setInput('')
      setBusy(true)

      try {
        const reply = await ask(question, history)
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: 'assistant', text: reply.text, source: reply.source },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: 'assistant',
            text: `Something broke on my end. ${brand.email} always works.`,
          },
        ])
      } finally {
        setBusy(false)
        field.current?.focus()
      }
    },
    [busy, messages],
  )

  const onCite = useCallback(
    (href) => {
      if (window.matchMedia('(max-width: 767px)').matches) setOpen(false)
      // Wait a frame so the scroll lock is released before the page is asked to move.
      requestAnimationFrame(() => scrollToTarget(href))
    },
    [],
  )

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcher}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="assistant-panel"
        /* Steps up when the sticky mobile CTA shows — see .launcher in index.css. */
        className="launcher fixed bottom-5 right-4 z-[95] flex h-12 w-12 items-center justify-center rounded-full bg-action text-onaction transition hover:bg-actionhover active:scale-[0.95] md:bottom-8 md:right-8 md:h-14 md:w-14"
      >
        <span className="sr-only">{open ? 'Close' : 'Open'} the studio assistant</span>
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          // The wordmark's O and full stop, as outlines.
          <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden>
            <g transform="translate(1.5 17.4) scale(0.191)">
              <path d="M38.50 1Q21.90 1 12.20-8.40Q2.50-17.80 2.50-33.50Q2.50-49.20 12.20-58.60Q21.90-68 38.50-68Q55.40-68 65.15-58.65Q74.90-49.30 74.90-33.50Q74.90-17.70 65.15-8.35Q55.40 1 38.50 1M22.90-17.90Q27.40-13.40 38.50-13.40Q49.60-13.40 54.25-17.90Q58.90-22.40 58.90-33.50Q58.90-44.60 54.25-49.10Q49.60-53.60 38.50-53.60Q27.40-53.60 22.90-49.10Q18.40-44.60 18.40-33.50Q18.40-22.40 22.90-17.90" />
              <rect x="77.4" y="-17.5" width="19.3" height="17.5" />
            </g>
          </svg>
        )}
      </button>

      {/* Panel */}
      <div
        ref={panel}
        id="assistant-panel"
        role="dialog"
        aria-modal="false"
        aria-label={`${cfg.name} — ${brand.full} assistant`}
        className={
          'fixed z-[96] flex flex-col overflow-hidden border border-line bg-surface transition-[opacity,transform,visibility] duration-200 ' +
          'inset-x-3 bottom-40 top-16 rounded-2xl ' +
          'md:inset-auto md:bottom-28 md:right-8 md:top-auto md:h-[560px] md:max-h-[calc(100vh-9rem)] md:w-[400px] ' +
          (open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible translate-y-2 opacity-0')
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brass" />
            </span>
            <div>
              <p className="font-semibold text-base leading-none tracking-tight">{cfg.name}</p>
              <p className="mt-1 text-xs text-muted">
                {isRemoteEnabled() ? 'Answers from this site · live' : 'Answers from this site'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            className="rounded-full border border-line p-2 text-muted transition-colors hover:border-link hover:text-link"
          >
            <span className="sr-only">Close assistant</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Transcript */}
        <div
          ref={log}
          className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5"
          role="log"
          aria-live="polite"
          aria-atomic="false"
        >
          {messages.map((m) => (
            <Message key={m.id} msg={m} onCite={onCite} />
          ))}

          {busy && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm border border-line bg-raised px-3">
                <Typing />
              </div>
            </div>
          )}

          {showSuggestions && (
            <div className="flex flex-wrap gap-2 pt-1">
              {cfg.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-line px-3 py-2 text-left text-[11px] leading-tight text-muted transition-colors hover:border-link hover:text-link"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="border-t border-line p-3"
        >
          <div className="flex items-center gap-2 rounded-xl border border-line bg-bg px-3 py-2 focus-within:border-link/60">
            <input
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, timeline, pricing…"
              aria-label="Ask the studio assistant a question"
              maxLength={300}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-mist outline-none placeholder:text-muted/70"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              className="shrink-0 rounded-full bg-action px-3 py-1.5 text-xs font-medium text-onaction transition-opacity disabled:opacity-30"
            >
              Send
            </button>
          </div>

          <p className="mt-2 px-1 text-[10px] leading-relaxed text-muted/70">
            Answers come from this site's own content. For anything else —{' '}
            <a
              href={'mailto:' + brand.email}
              className="text-link underline underline-offset-2"
            >
              {brand.email}
            </a>
          </p>
        </form>
      </div>
    </>
  )
}
