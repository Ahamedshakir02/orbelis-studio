/**
 * Export the company profile to public/orbelis-profile.pdf.
 *
 * The brochure is generated from src/data/site.js rather than laid out by hand,
 * for the same reason the assistant and the structured data read that file: a
 * price changed on the site must not survive in a PDF someone was sent last
 * month. Re-run after any copy change.
 *
 * Printed with the Chrome or Edge already on the machine, like the share card
 * and the icons — no headless-browser dependency.
 *
 *   npm run brochure
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { findBrowser } from './render.mjs'
import {
  brand,
  manifesto,
  services,
  problems,
  flow,
  audiences,
  process as steps,
  stats,
  studio,
  work,
} from '../src/data/site.js'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const output = join(root, 'public', 'orbelis-profile.pdf')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const host = brand.url.replace(/^https?:\/\//, '')
let pageNo = 0

/** One A4 sheet. Every page after the cover carries the same quiet footer. */
function page(body, { cover = false } = {}) {
  pageNo += 1
  const footer = cover
    ? ''
    : `<footer><span>${esc(brand.full)}</span><span>${esc(host)}</span><span>${String(pageNo).padStart(2, '0')}</span></footer>`
  return `<section class="page${cover ? ' cover' : ''}">${body}${footer}</section>`
}

const head = (eyebrow, title) => `<p class="eyebrow">${esc(eyebrow)}</p><h2>${esc(title)}</h2>`

const serviceBlock = (s) => `
  <article class="card">
    <div class="row">
      <span class="num">${esc(s.index)}</span>
      <span class="price">${esc(s.price)}</span>
    </div>
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.body)}</p>
    <ul class="dots">${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
  </article>`

const groups = [...new Set(services.map((s) => s.group))]
const groupIntro = {
  Build: 'What gets built once.',
  Run: 'What keeps running afterwards.',
}

const contactLines = [
  ['Email', brand.email],
  ['Web', host],
  // Phone appears only once a real number is set in site.js.
  ...(brand.phone ? [['Phone', brand.phone]] : []),
  [
    'Studio',
    [brand.address.street, `${brand.address.locality}, ${brand.address.region} ${brand.address.postalCode}`, 'India']
      .filter(Boolean)
      .join(', '),
  ],
]

const pages = [
  page(
    `<div class="orb"></div>
     <p class="eyebrow">Company profile</p>
     <h1>${esc(brand.name)}<span class="brass">.</span></h1>
     <p class="tagline">${esc(brand.tagline)}</p>
     <p class="cover-foot">${esc(brand.location)}<br>${esc(host)}</p>`,
    { cover: true },
  ),

  page(
    `${head('The studio', studio.lead)}
     ${studio.body.map((p) => `<p class="lede">${esc(p)}</p>`).join('')}
     <dl class="facts">${studio.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}</dl>
     <div class="rule"></div>
     <p class="eyebrow">What we believe</p>
     ${manifesto.map((m) => `<p class="belief">${esc(m)}</p>`).join('')}`,
  ),

  page(
    `${head('Where the time goes', 'Three things that quietly cost you.')}
     <div class="grid3">${problems
       .map(
         (p, i) =>
           `<article class="card"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`,
       )
       .join('')}</div>
     <div class="rule"></div>
     <p class="eyebrow">Services at a glance</p>
     <table>${services
       .map(
         (s) =>
           `<tr><td class="num">${esc(s.index)}</td><td class="grp">${esc(s.group)}</td><td class="ttl">${esc(s.title)}</td><td class="price">${esc(s.price)}</td></tr>`,
       )
       .join('')}</table>
     <p class="note">Prices are in Indian Rupees and exclude any taxes that apply. Every build includes the performance budget and the accessibility pass.</p>`,
  ),

  ...groups.map((g) =>
    page(
      `${head(`Services — ${g}`, groupIntro[g] ?? g)}
       <div class="stack">${services.filter((s) => s.group === g).map(serviceBlock).join('')}</div>`,
    ),
  ),

  page(
    `${head('What automation looks like', 'One enquiry, start to finish.')}
     <ol class="flow">${flow
       .map((f) => `<li><span class="num">${esc(f.step)}</span><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`)
       .join('')}</ol>
     <div class="rule"></div>
     <p class="eyebrow">Who it is for</p>
     <div class="grid2">${audiences
       .map(
         (a) =>
           `<article class="card"><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p><ul class="dots">${a.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></article>`,
       )
       .join('')}</div>`,
  ),

  page(
    `${head('How it runs', 'Small scope. Fast ship.')}
     <div class="grid2">${steps
       .map((p) => `<article class="card"><span class="num">${esc(p.step)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`)
       .join('')}</div>
     <div class="rule"></div>
     <p class="eyebrow">What you can hold us to</p>
     <div class="grid4">${stats
       .map((s) => `<div class="stat"><span class="big">${esc(s.value)}${esc(s.suffix)}</span><p>${esc(s.label)}</p></div>`)
       .join('')}</div>`,
  ),

  page(
    `${head('Selected work', 'Built, not templated.')}
     <p class="note">Concept builds are labelled as such. Nothing here pretends to be a client engagement that was not one.</p>
     <div class="stack">${work
       .map(
         (w) => `
       <article class="card">
         <div class="row"><span class="num">${esc(w.status)} · ${esc(w.year)}</span><span class="grp">${esc(w.role)}</span></div>
         <h3>${esc(w.title)}</h3>
         <p>${esc(w.summary)}</p>
         <ul class="chips">${w.stack.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
       </article>`,
       )
       .join('')}</div>`,
  ),

  page(
    `<div class="orb low"></div>
     <p class="eyebrow">Start a project</p>
     <h2 class="xl">Let's build something worth scrolling.</h2>
     <dl class="contact">${contactLines.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
     <p class="note">Tell us what the business does and what is slowing it down. You talk to the person who writes the code — there is no account manager in between.</p>`,
  ),
]

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(brand.full)} — Company profile</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; background: #08090c; }
  body { font-family: Inter, system-ui, sans-serif; color: #e8eaf0; font-size: 10.5pt; line-height: 1.55; }
  .page { position: relative; width: 210mm; height: 297mm; padding: 22mm 20mm 24mm; overflow: hidden; background: #08090c; page-break-after: always; }
  .page:last-child { page-break-after: auto; }
  h1, h2, h3, .big, .belief, .tagline { font-family: "Clash Display", Georgia, serif; font-weight: 600; letter-spacing: -0.03em; word-spacing: 0.12em; margin: 0; }
  h1 { font-size: 78pt; line-height: 0.9; }
  h2 { font-size: 30pt; line-height: 1; margin: 0 0 9mm; max-width: 150mm; }
  h2.xl { font-size: 46pt; line-height: 0.92; margin-bottom: 16mm; }
  h3 { font-size: 15pt; line-height: 1.1; margin: 2.5mm 0 2mm; }
  p { margin: 0 0 3mm; color: #878e9e; }
  .brass { color: #e8a33d; }
  .eyebrow, .num, .grp, dt, footer, .chips li { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 7.5pt; letter-spacing: 0.2em; text-transform: uppercase; }
  .eyebrow { color: #878e9e; margin: 0 0 5mm; }
  .num, .price { color: #e8a33d; }
  .grp { color: #878e9e; }
  .lede { font-size: 11.5pt; color: #e8eaf0; max-width: 160mm; }
  .belief { font-size: 15pt; line-height: 1.2; color: #e8eaf0; margin-bottom: 4mm; }
  .tagline { font-size: 22pt; line-height: 1.1; color: rgba(232,234,240,0.55); margin-top: 8mm; max-width: 130mm; }
  .note { font-size: 8.5pt; margin-top: 5mm; max-width: 150mm; }
  .rule { height: 1px; background: #22262f; margin: 9mm 0 7mm; }
  .card { border: 1px solid #22262f; background: #0f1116; border-radius: 4mm; padding: 6mm; }
  .card p { font-size: 9.5pt; margin-bottom: 0; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 6mm; }
  .price { font-family: "Clash Display", Georgia, serif; font-size: 13pt; }
  .stack { display: grid; gap: 5mm; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
  .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
  .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5mm; }
  .dots, .chips { list-style: none; margin: 4mm 0 0; padding: 0; }
  .dots { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5mm 5mm; font-size: 9pt; }
  .dots li::before { content: ""; display: inline-block; width: 1.2mm; height: 1.2mm; border-radius: 50%; background: #e8a33d; margin-right: 2.5mm; vertical-align: middle; }
  .chips { display: flex; flex-wrap: wrap; gap: 2mm; }
  .chips li { border: 1px solid #22262f; border-radius: 99px; padding: 1mm 3mm; color: #878e9e; font-size: 6.5pt; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 3.2mm 0; border-top: 1px solid #22262f; vertical-align: baseline; }
  td.num { width: 12mm; } td.grp { width: 22mm; } td.price { text-align: right; }
  td.ttl { font-family: "Clash Display", Georgia, serif; font-size: 13pt; }
  .facts, .contact { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5mm; margin: 8mm 0 0; }
  .contact { grid-template-columns: 1fr 1fr; gap: 8mm 10mm; margin-bottom: 12mm; }
  dt { color: #878e9e; margin-bottom: 1.5mm; }
  dd { margin: 0; font-size: 10.5pt; }
  .contact dd { font-family: "Clash Display", Georgia, serif; font-size: 15pt; }
  .flow { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 3mm; border-top: 1px solid rgba(232,163,61,0.6); padding-top: 6mm; }
  .flow h3 { font-size: 11.5pt; }
  .flow p { font-size: 8.5pt; }
  .stat { border-top: 1px solid #22262f; padding-top: 4mm; }
  .big { display: block; white-space: nowrap; font-size: 22pt; line-height: 1; color: #e8a33d; margin-bottom: 3mm; }
  .stat p { font-size: 8.5pt; }
  footer { position: absolute; left: 20mm; right: 20mm; bottom: 12mm; display: flex; justify-content: space-between; color: #878e9e; border-top: 1px solid #22262f; padding-top: 4mm; font-size: 6.5pt; }
  .cover { display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 30mm; }
  .cover-foot { position: absolute; top: 22mm; right: 20mm; text-align: right; font-family: "JetBrains Mono", monospace; font-size: 7.5pt; letter-spacing: 0.18em; text-transform: uppercase; }
  .orb { position: absolute; width: 150mm; height: 150mm; right: -45mm; top: 30mm; border-radius: 50%; background: radial-gradient(circle at 35% 30%, rgba(232,163,61,0.55), rgba(180,118,42,0.18) 45%, rgba(8,9,12,0) 70%); }
  .orb.low { top: auto; bottom: -50mm; right: -50mm; opacity: 0.7; }
  /* Everything in the flow sits above the orb; the footer and the cover's
     corner note keep their own absolute positions. */
  .page > *:not(.orb):not(footer):not(.cover-foot) { position: relative; }
</style></head><body>${pages.join('')}</body></html>`

const tmp = mkdtempSync(join(tmpdir(), 'orbelis-brochure-'))
const file = join(tmp, 'brochure.html')
writeFileSync(file, html, 'utf8')

try {
  execFileSync(
    findBrowser(),
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      // Webfonts need a moment to arrive; printing early exports a fallback face.
      '--virtual-time-budget=6000',
      `--print-to-pdf=${output}`,
      pathToFileURL(file).href,
    ],
    { stdio: 'ignore' },
  )
} catch (err) {
  console.error('Brochure export failed:', err.message)
  process.exit(1)
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

if (!existsSync(output)) {
  console.error(`Browser exited without writing ${output}`)
  process.exit(1)
}

console.log(`public/orbelis-profile.pdf — ${pages.length} pages, ${(statSync(output).size / 1024).toFixed(1)} kB`)
