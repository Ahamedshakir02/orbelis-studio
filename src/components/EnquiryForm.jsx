import { useRef, useState } from 'react'
import { brand, projectTypes, budgets } from '../data/site.js'

/**
 * The conversion path.
 *
 * A site that publishes ₹1.5L price ranges and then offers a mailto link as its
 * only way in is throwing away the visitors who were ready. A form converts
 * better than an address for one boring reason: it tells the visitor what to
 * say. Project type and budget are asked here so the first reply can be
 * specific instead of a round-trip asking for them.
 *
 * SUBMISSION IS DELIBERATELY DEGRADABLE. With VITE_FORM_ENDPOINT set it posts
 * JSON (Formspree, Basin, a Worker — anything that takes a POST). Without it,
 * it composes a prefilled mail draft. The form is never a dead end that silently
 * eats an enquiry, which is the usual failure mode when a form key expires and
 * nobody notices for a month.
 */

const ENDPOINT = import.meta.env?.VITE_FORM_ENDPOINT || ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELD =
  'w-full rounded-lg border border-line bg-bg/60 px-4 py-3 text-sm text-mist outline-none ' +
  'transition-colors placeholder:text-muted/60 focus:border-brass/70'

const LABEL = 'mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Your name, so the reply is not addressed to nobody.'
  if (!values.email.trim()) errors.email = 'An email address is needed to reply.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That address looks incomplete.'
  if (values.message.trim().length < 12)
    errors.message = 'A sentence or two about the project — enough to answer properly.'
  return errors
}

function mailtoFallback(values) {
  const subject = `Project enquiry — ${values.projectType}`
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Project: ${values.projectType}`,
    `Budget: ${values.budget}`,
    '',
    values.message,
  ].join('\n')
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
}

export default function EnquiryForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    projectType: projectTypes[0],
    budget: budgets[budgets.length - 1],
    message: '',
    // Honeypot. Real people cannot see it; bots fill everything they find.
    company: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)

  const set = (key) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    // Clear an error as soon as the visitor starts fixing it — re-reading a
    // complaint about a field you are actively correcting is just nagging.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // Silently accept and discard: a bot that gets an error learns to retry.
    if (values.company) {
      setStatus('sent')
      return
    }

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      return
    }

    if (!ENDPOINT) {
      mailtoFallback(values)
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          projectType: values.projectType,
          budget: values.budget,
          message: values.message,
          _subject: `Project enquiry — ${values.projectType}`,
        }),
      })
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`)
      setStatus('sent')
    } catch (err) {
      if (import.meta.env?.DEV) console.warn('[enquiry] submit failed:', err)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brass/30 bg-surface/70 p-8 md:p-10"
      >
        <p className="eyebrow mb-4 text-brass">Received</p>
        <h3 className="font-display text-2xl tracking-tight md:text-3xl">
          That is with the right person.
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Replies come from {brand.email}, usually the same day and always from the
          person who would build it. If it is urgent, that address takes a nudge.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="ef-name">
            Name
          </label>
          <input
            id="ef-name"
            name="name"
            value={values.name}
            onChange={set('name')}
            autoComplete="name"
            data-cursor="grow"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'ef-name-error' : undefined}
            className={FIELD + (errors.name ? ' border-brass' : '')}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="ef-name-error" role="alert" className="mt-2 text-xs text-brass">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={LABEL} htmlFor="ef-email">
            Email
          </label>
          <input
            id="ef-email"
            name="email"
            type="email"
            value={values.email}
            onChange={set('email')}
            autoComplete="email"
            data-cursor="grow"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'ef-email-error' : undefined}
            className={FIELD + (errors.email ? ' border-brass' : '')}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p id="ef-email-error" role="alert" className="mt-2 text-xs text-brass">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="ef-type">
            Project
          </label>
          <select
            id="ef-type"
            name="projectType"
            value={values.projectType}
            onChange={set('projectType')}
            data-cursor="grow"
            className={FIELD}
          >
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-surface">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="ef-budget">
            Budget
          </label>
          <select
            id="ef-budget"
            name="budget"
            value={values.budget}
            onChange={set('budget')}
            data-cursor="grow"
            className={FIELD}
          >
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-surface">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="ef-message">
          What are you building?
        </label>
        <textarea
          id="ef-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={set('message')}
          data-cursor="grow"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'ef-message-error' : undefined}
          className={FIELD + ' resize-none' + (errors.message ? ' border-brass' : '')}
          placeholder="A clinic site with appointment requests, and an assistant that handles timings and fees."
        />
        {errors.message && (
          <p id="ef-message-error" role="alert" className="mt-2 text-xs text-brass">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="ef-company">Company</label>
        <input
          id="ef-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={set('company')}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          data-cursor="grow"
          className="inline-flex items-center gap-3 rounded-full bg-brass px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-mist disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          <span aria-hidden>→</span>
        </button>

        <p className="text-xs text-muted">
          Or email{' '}
          <a
            href={'mailto:' + brand.email}
            data-cursor="grow"
            className="text-brass underline underline-offset-4"
          >
            {brand.email}
          </a>
        </p>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-xs leading-relaxed text-brass">
          That did not send — the fault is ours, not yours. Email{' '}
          <a href={'mailto:' + brand.email} className="underline underline-offset-4">
            {brand.email}
          </a>{' '}
          and it will be picked up.
        </p>
      )}
    </form>
  )
}
