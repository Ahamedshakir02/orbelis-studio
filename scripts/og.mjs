/**
 * Export public/og.svg to public/og.png.
 *
 * No social platform renders SVG, so the share card ships as a raster while the
 * design stays a text file in version control instead of a binary someone has
 * to open Figma to edit.
 *
 *   npm run og
 */
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToPng } from './render.mjs'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const source = join(root, 'public', 'og.svg')
const output = join(root, 'public', 'og.png')

const WIDTH = 1200
const HEIGHT = 630

if (!existsSync(source)) {
  console.error(`Missing ${source}`)
  process.exit(1)
}

const bytes = renderToPng({
  body: readFileSync(source, 'utf8'),
  width: WIDTH,
  height: HEIGHT,
  out: output,
  fonts: true,
})

console.log(`public/og.png — ${WIDTH}x${HEIGHT}, ${(bytes / 1024).toFixed(1)} kB`)
