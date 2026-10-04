import { useEffect, useState } from 'react'

/**
 * Light / dark switch.
 *
 * The theme itself is set before first paint by the inline script in each HTML
 * file's <head> — a stored choice if there is one, otherwise the system
 * setting — so the page never flashes the wrong one. This button only reads
 * what that script decided and flips it.
 *
 * The choice is remembered per browser. Storage can be unavailable (private
 * windows, blocked site data), so it is wrapped: the switch still works for
 * the visit, it just is not remembered.
 */
function apply(theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* not remembered; still applied */
  }
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('dark')

  // Read after mount: the server-less HTML has no idea which theme was chosen.
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  }, [])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => {
        apply(next)
        setTheme(next)
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={
        'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition hover:bg-raised hover:text-mist active:scale-[0.95] ' +
        className
      }
    >
      {theme === 'dark' ? (
        // Sun: what you get by pressing it.
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  )
}
