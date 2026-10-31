/**
 * Export the brand kit to brand/ — the logo and the social-media images.
 *
 *   npm run brand
 *
 * The logo is the wordmark alone — "Orbelis" and its brass full stop — set in
 * the same face as the site header, and the copy is the site's own (src/data/site.js), so a profile picture, a post and the website
 * cannot drift apart. Re-run after changing the tagline.
 *
 * Rendered with the Chrome or Edge already on the machine, like the share
 * card and the icons — no headless-browser dependency.
 *
 * WHAT COMES OUT
 *   logo-dark.png, logo-light.png   the wordmark on the brand background.
 *   logo-transparent-for-*.png      no background, for your own artwork.
 *   profile-dark.png, profile-light.png
 *   profile-instagram.png    1080px, a bigger mark for Instagram's small circle.
 *   profile-linkedin-company.png  1200px square logo for the LinkedIn page.
 *                            square, 1024px, for a profile picture; platforms
 *                            crop to a circle, so the wordmark sits well inside.
 *   social-post-1080.png     square post (Instagram, LinkedIn, Facebook).
 *   social-story-1080x1920   story / reel cover.
 *   banner-x-1500x500        X (Twitter) header.
 *   banner-linkedin-1584x396 LinkedIn personal-profile cover.
 *   banner-linkedin-company-1128x191
 *                            LinkedIn company page cover, saved at 2x (2256x382).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { findBrowser } from './render.mjs'
import { brand } from '../src/data/site.js'
import { PRINT_HOST } from '../src/data/domain.js'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outDir = join(root, 'brand')
mkdirSync(outDir, { recursive: true })

const INK = '#08090c'
const PAPER = '#ffffff'
const MIST = '#e8eaf0'
const MUTED = '#878e9e'
const BRASS = '#e8a33d'
// Null until orbelis.co is live; images leave the address out until then.
const host = PRINT_HOST
// Two lines: split between sentences, or after the first comma when the
// tagline is a single sentence ("Your ideas, / built and launched.").
const [line1, ...rest] = brand.tagline.split(brand.tagline.includes('. ') ? /(?<=\.)\s+/ : /(?<=,)\s+/)
const line2 = rest.join(' ')

const wordmark = (px, color) =>
  `<span style="font-family:'Clash Display',Georgia,serif;font-weight:600;font-size:${px}px;letter-spacing:-0.03em;color:${color};line-height:1">${brand.name}<span style="color:${BRASS}">.</span></span>`

const glow = (x, y, r) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${r * 2}px;height:${r * 2}px;margin:-${r}px 0 0 -${r}px;border-radius:50%;background:radial-gradient(circle,rgba(232,163,61,0.30),rgba(232,163,61,0.06) 55%,rgba(232,163,61,0) 72%)"></div>`

const centre = (inner) => `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">${inner}</div>`

const headline = (px) => `
  <div style="font-family:Inter,sans-serif;font-weight:600;font-size:${px}px;line-height:1.04;letter-spacing:-0.035em">
    <div style="color:${MIST}">${line1}</div>
    <div style="color:${MUTED}">${line2 ?? ''}</div>
  </div>`

const small = (px, text) =>
  `<div style="font-family:Inter,sans-serif;font-size:${px}px;color:${MUTED};letter-spacing:-0.01em">${text}</div>`

const services = 'Software · Websites · AI · Design · Marketing'
const cta = 'Book a free consultation'

const pill = (px, text) =>
  `<div style="display:inline-block;font-family:Inter,sans-serif;font-weight:600;font-size:${px}px;color:${INK};background:${BRASS};border-radius:999px;padding:${Math.round(px * 0.55)}px ${Math.round(px * 1.1)}px">${text}</div>`

const files = [
  // ---- logo
  { name: 'logo-dark.png', w: 1600, h: 600, bg: INK, body: centre(wordmark(240, MIST)) },
  { name: 'logo-light.png', w: 1600, h: 600, bg: PAPER, body: centre(wordmark(240, INK)) },
  { name: 'logo-transparent-for-dark.png', w: 1600, h: 600, bg: null, body: centre(wordmark(240, MIST)) },
  { name: 'logo-transparent-for-light.png', w: 1600, h: 600, bg: null, body: centre(wordmark(240, INK)) },
  { name: 'profile-dark.png', w: 1024, h: 1024, bg: INK, body: centre(wordmark(190, MIST)) },
  { name: 'profile-light.png', w: 1024, h: 1024, bg: PAPER, body: centre(wordmark(190, INK)) },
  // Instagram shows the picture at about 110px in a circle: a bigger mark and
  // a little warmth from the brand glow keep it legible that small.
  { name: 'profile-instagram.png', w: 1080, h: 1080, bg: INK, body: `${glow(540, 540, 520)}${centre(wordmark(230, MIST))}` },
  // LinkedIn company logo: a square, not a circle, shown small, so the
  // wordmark fills about 80% of the width to stay sharp and readable.
  { name: 'profile-linkedin-company.png', w: 1200, h: 1200, bg: INK, body: centre(wordmark(270, MIST)) },

  // ---- social
  {
    name: 'social-post-1080.png', w: 1080, h: 1080, bg: INK,
    body: `${glow(860, 250, 420)}
      <div style="position:absolute;left:84px;top:84px">${wordmark(64, MIST)}</div>
      <div style="position:absolute;left:84px;right:84px;bottom:290px">${headline(110)}</div>
      <div style="position:absolute;left:84px;bottom:180px">${pill(32, cta)}</div>
      <div style="position:absolute;left:84px;right:84px;bottom:84px;display:flex;justify-content:space-between;border-top:1px solid #242831;padding-top:28px">
        ${small(30, services)}${host ? small(30, host) : ''}
      </div>`,
  },
  {
    name: 'social-story-1080x1920.png', w: 1080, h: 1920, bg: INK,
    body: `${glow(540, 620, 560)}
      <div style="position:absolute;left:0;right:0;top:540px;display:flex;justify-content:center">${wordmark(170, MIST)}</div>
      <div style="position:absolute;left:60px;right:60px;top:980px;text-align:center">${headline(78)}</div>
      <div style="position:absolute;left:0;right:0;top:1210px;text-align:center">${small(36, services)}</div>
      <div style="position:absolute;left:0;right:0;top:1340px;text-align:center">${pill(38, cta)}</div>
      <div style="position:absolute;left:0;right:0;bottom:180px;text-align:center">${host ? small(32, host) : ''}</div>`,
  },
  {
    name: 'banner-x-1500x500.png', w: 1500, h: 500, bg: INK,
    body: `${glow(1250, 250, 360)}
      <div style="position:absolute;right:120px;top:198px">${wordmark(104, MIST)}</div>
      <div style="position:absolute;left:110px;top:120px">${headline(74)}</div>
      <div style="position:absolute;left:110px;bottom:92px">${small(26, [services, host].filter(Boolean).join(' · '))}</div>`,
  },
  {
    // Personal-profile cover (4:1). The company page uses the one below.
    name: 'banner-linkedin-1584x396.png', w: 1584, h: 396, bg: INK,
    // LinkedIn covers the lower left with the logo and crops both sides on
    // narrower screens, so the copy sits in the middle band and the wordmark
    // is left out: the page's logo already carries it.
    body: `${glow(1180, 198, 300)}
      <div style="position:absolute;left:470px;top:70px">${headline(62)}</div>
      <div style="position:absolute;left:470px;bottom:64px;display:flex;align-items:center;gap:28px">${pill(22, cta)}${small(22, services)}</div>`,
  },
  {
    // Company page cover. LinkedIn asks for 1128x191; rendered at 2x
    // (2256x382). Phones crop the sides and the logo covers the lower left,
    // so everything sits in the centre band.
    name: 'banner-linkedin-company-1128x191.png', w: 1128, h: 191, scale: 2, bg: INK,
    body: `${glow(564, 96, 260)}
      <div style="position:absolute;left:0;right:0;top:44px;text-align:center;font-family:Inter,sans-serif;font-weight:600;font-size:40px;line-height:1;letter-spacing:-0.035em">
        <span style="color:${MIST}">${line1}</span> <span style="color:${MUTED}">${line2}</span>
      </div>
      <div style="position:absolute;left:0;right:0;top:112px;display:flex;justify-content:center;align-items:center;gap:20px">${pill(15, cta)}${small(15, services)}</div>`,
  },
]

const browser = findBrowser()
const tmp = mkdtempSync(join(tmpdir(), 'orbelis-brand-'))

try {
  for (const f of files) {
    const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;overflow:hidden;background:${f.bg ?? 'transparent'}}
body{position:relative;width:${f.w}px;height:${f.h}px}svg{display:block}</style>
</head><body>${f.body}</body></html>`
    const page = join(tmp, f.name.replace(/\.png$/, '.html'))
    const out = join(outDir, f.name)
    writeFileSync(page, html, 'utf8')
    rmSync(out, { force: true })
    execFileSync(
      browser,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        // `scale` renders a small canvas at 2x so it stays sharp when shown large.
        `--force-device-scale-factor=${f.scale ?? 1}`,
        `--window-size=${f.w},${f.h}`,
        // No background means a real alpha channel, not white.
        ...(f.bg ? [] : ['--default-background-color=00000000']),
        // Webfonts need a moment to arrive; shooting early exports a fallback face.
        '--virtual-time-budget=4000',
        `--screenshot=${out}`,
        pathToFileURL(page).href,
      ],
      { stdio: 'ignore' },
    )
    if (!existsSync(out)) throw new Error(`Browser exited without writing ${out}`)
    console.log(`brand/${f.name.padEnd(40)} ${String(f.w * (f.scale ?? 1)).padStart(4)}x${String(f.h * (f.scale ?? 1)).padEnd(4)} ${(statSync(out).size / 1024).toFixed(1)} kB`)
  }
} catch (err) {
  console.error('Brand export failed:', err.message)
  process.exitCode = 1
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
