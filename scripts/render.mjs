/**
 * Rasterise HTML to PNG using whatever Chromium is already on the machine.
 *
 * Shared by the share-card and icon exports. Neither needs a headless-browser
 * dependency: any machine that can develop this site already has Chrome or
 * Edge, and both screenshot from the command line. Keeping this in one place
 * means the two exporters cannot drift apart on flags or font handling.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, writeFileSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

export function findBrowser() {
  const found = CANDIDATES.find((p) => existsSync(p))
  if (!found) {
    console.error('No Chrome or Edge found. Set CHROME_PATH and re-run.')
    process.exit(1)
  }
  return found
}

/**
 * @param {object} o
 * @param {string} o.body     markup placed inside <body>
 * @param {number} o.width
 * @param {number} o.height
 * @param {string} o.out      absolute output path
 * @param {boolean} [o.fonts] load the site's webfonts before shooting
 * @param {string} [o.background]
 */
export function renderToPng({ body, width, height, out, fonts = false, background = '#08090c' }) {
  const browser = findBrowser()

  const fontLinks = fonts
    ? `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`
    : ''

  const html = `<!doctype html><html><head><meta charset="utf-8">${fontLinks}
<style>html,body{margin:0;padding:0;background:${background};overflow:hidden}
svg{display:block;width:${width}px;height:${height}px}</style>
</head><body>${body}</body></html>`

  const work = mkdtempSync(join(tmpdir(), 'orbelis-render-'))
  const page = join(work, 'page.html')
  writeFileSync(page, html, 'utf8')

  try {
    execFileSync(
      browser,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        `--window-size=${width},${height}`,
        // Webfonts need a moment to arrive; shooting early exports a fallback face.
        `--virtual-time-budget=${fonts ? 4000 : 1200}`,
        `--screenshot=${out}`,
        pathToFileURL(page).href,
      ],
      { stdio: 'ignore' },
    )
  } catch (err) {
    console.error('Screenshot failed:', err.message)
    process.exit(1)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }

  if (!existsSync(out)) {
    console.error(`Browser exited without writing ${out}`)
    process.exit(1)
  }
  return statSync(out).size
}
