import { useEffect, useRef, useState } from 'react'
import { brand, projectTypes, budgets, businessTypes } from '../data/site.js'

/**
 * The conversion path.
 *
 * A site that publishes ₹1.5L price ranges and then offers a mailto link as its
 * only way in is throwing away the visitors who were ready. A form converts
 * better than an address for one boring reason: it tells the visitor what to
 * say. Business, project type and budget are asked here so the first reply can
 * be specific instead of a round-trip asking for them. "What is slowing you
 * down" is optional on purpose: plenty of visitors know the problem and not
 * the service, and that one line is often the whole brief.
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
  'w-full rounded-xl border border-line bg-tile px-4 py-3 text-[15px] text-mist outline-none ' +
  'transition-colors placeholder:text-muted/60 focus:border-link/70'

const LABEL = 'mb-2 block text-[13px] font-medium text-muted'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Your name, so I know who I am replying to.'
  if (!values.email.trim()) errors.email = 'An email address, so I can reply.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That address looks incomplete.'
  if (values.message.trim().length < 12)
    errors.message = 'A sentence or two about the project, so I can answer properly.'
  return errors
}

function mailtoFallback(values) {
  const subject = `Project enquiry — ${values.projectType}`
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Business: ${values.business}`,
    `Project: ${values.projectType}`,
    `Budget: ${values.budget}`,
    ...(values.blocker.trim() ? [`Slowing us down: ${values.blocker.trim()}`] : []),
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
    business: businessTypes[0],
    projectType: projectTypes[0],
    budget: budgets[budgets.length - 1],
    blocker: '',
    message: '',
    // Honeypot. Real people cannot see it; bots fill everything they find.
    company: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)

  // "Enquire" on a service row arrives here with that service's project type,
  // so the visitor does not have to find it again in the list.
  useEffect(() => {
    const onEnquire = (e) => {
      if (!projectTypes.includes(e.detail)) return
      setValues((v) => ({ ...v, projectType: e.detail }))
    }
    window.addEventListener('orbelis:enquire', onEnquire)
    return () => window.removeEventListener('orbelis:enquire', onEnquire)
  }, [])

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
          business: values.business,
          projectType: values.projectType,
          budget: values.budget,
          blocker: values.blocker,
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
        className="rounded-2xl border border-link/30 bg-surface/70 p-8 md:p-10"
      >
        <p className="eyebrow mb-4">Received</p>
        <h3 className="font-semibold text-2xl tracking-tight md:text-3xl">
          Got it. That came straight to me.
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          I reply from {brand.email}, usually the same day. If it is urgent, send a
          second note to that address.
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
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'ef-name-error' : undefined}
            className={FIELD + (errors.name ? ' border-link' : '')}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="ef-name-error" role="alert" className="mt-2 text-xs text-link">
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
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'ef-email-error' : undefined}
            className={FIELD + (errors.email ? ' border-link' : '')}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p id="ef-email-error" role="alert" className="mt-2 text-xs text-link">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="ef-business">
          Your business
        </label>
        <select
          id="ef-business"
          name="business"
          value={values.business}
          onChange={set('business')}
          className={FIELD}
        >
          {businessTypes.map((t) => (
            <option key={t} value={t} className="bg-surface">
              {t}
            </option>
          ))}
        </select>
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
        <label className={LABEL} htmlFor="ef-blocker">
          What is slowing you down? <span className="font-normal">(optional)</span>
        </label>
        <input
          id="ef-blocker"
          name="blocker"
          value={values.blocker}
          onChange={set('blocker')}
          className={FIELD}
          placeholder="Enquiries we answer too late, a report someone builds by hand every Monday."
        />
      </div>

      <div>
        <label className={LABEL} htmlFor="ef-message">
          What do you need built?
        </label>
        <textarea
          id="ef-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={set('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'ef-message-error' : undefined}
          className={FIELD + ' resize-none' + (errors.message ? ' border-link' : '')}
          placeholder="A clinic site with appointment requests, and an assistant that handles timings and fees."
        />
        {errors.message && (
          <p id="ef-message-error" role="alert" className="mt-2 text-xs text-link">
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
          className="inline-flex h-11 items-center gap-2 rounded-full bg-action px-5 text-sm font-medium text-onaction transition hover:bg-actionhover active:scale-[0.95] disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          <span aria-hidden>→</span>
        </button>

        <p className="text-xs text-muted">
          Or email{' '}
          <a
            href={'mailto:' + brand.email}
            className="text-link underline underline-offset-4"
          >
            {brand.email}
          </a>
        </p>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-xs leading-relaxed text-link">
          That did not send, and the fault is mine, not yours. Email{' '}
          <a href={'mailto:' + brand.email} className="underline underline-offset-4">
            {brand.email}
          </a>{' '}
          and I will pick it up.
        </p>
      )}
    </form>
  )
}
