/**
 * Export public/og.svg to public/og.png.
 *
 * No social platform renders SVG, so the share card has to ship as a raster —
 * but adding a headless-browser dependency to a five-package project to make
 * one image is a bad trade. Every machine that can develop this site already
 * has Chrome or Edge installed, and both can screenshot from the command line.
 * So: zero new dependencies, and the design stays a text file in version
 * control instead of a binary someone has to open Figma to edit.
 *
 *   npm run og
 *
 * Fonts are pulled from the same source the site uses, and virtual-time-budget
 * gives them a moment to arrive — screenshot too early and the card exports in
 * a fallback face.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const source = join(root, 'public', 'og.svg')
const output = join(root, 'public', 'og.png')

const WIDTH = 1200
const HEIGHT = 630

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

const browser = CANDIDATES.find((p) => existsSync(p))
if (!browser) {
  console.error(
    'No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser and re-run.',
  )
  process.exit(1)
}

if (!existsSync(source)) {
  console.error(`Missing ${source}`)
  process.exit(1)
}

// Inline the SVG into a zero-margin page so the viewport crop is exact.
const svg = readFileSync(source, 'utf8')
const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#08090c;overflow:hidden}svg{display:block}</style>
</head><body>${svg}</body></html>`

const work = mkdtempSync(join(tmpdir(), 'orbelis-og-'))
const page = join(work, 'og.html')
writeFileSync(page, html, 'utf8')

try {
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${WIDTH},${HEIGHT}`,
      '--virtual-time-budget=4000',
      `--screenshot=${output}`,
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

if (!existsSync(output)) {
  console.error('Browser exited without writing an image.')
  process.exit(1)
}

const kb = (statSync(output).size / 1024).toFixed(1)
console.log(`public/og.png written — ${WIDTH}x${HEIGHT}, ${kb} kB`)
