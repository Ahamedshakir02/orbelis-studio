import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import base from '../../tailwind.config.js'

const here = dirname(fileURLToPath(import.meta.url))

/**
 * The site's own theme, unchanged. Two additions for the synced stylesheet:
 * it scans the authored previews, and it always emits the colour and font
 * utilities — Tailwind only generates classes it sees used, and a design built
 * on this stylesheet will reach for token classes the site never happened to.
 */
export default {
  ...base,
  content: [
    resolve(here, '../../src/**/*.{js,jsx}'),
    resolve(here, '../previews/**/*.tsx'),
  ],
  safelist: [
    { pattern: /^(bg|text|border)-(bg|surface|raised|brass|ember|mist|muted|line)$/ },
    'font-display',
    'font-body',
    'font-mono',
    'tracking-tightest',
  ],
}
