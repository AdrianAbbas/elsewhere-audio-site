// Renders the painted SVG art (scripts/art/*.mjs) to high-quality WebP
// sources in src/assets/art/. Astro then turns those into responsive
// AVIF/WebP at build time, so visitors never pay for the SVG filters.
//
// Usage: npm run art
// Needs Playwright with Chromium. If you don't have it:
//   npm i -D playwright && npx playwright install chromium
import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';
import * as threshold from './art/threshold.mjs';
import * as atmospheres from './art/atmospheres.mjs';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is needed to render art: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const OUT = 'src/assets/art';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

async function render(svg, w, h, scale, transparent) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
  await page.waitForTimeout(250);
  const png = await page.screenshot({ omitBackground: transparent });
  await page.close();
  return png;
}

async function save(png, name, quality = 90) {
  const file = `${OUT}/${name}.webp`;
  await sharp(png).webp({ quality, alphaQuality: 92, effort: 6, smartSubsample: true }).toFile(file);
  console.log('wrote', file);
}

// Threshold hero: one flattened image at 1.5× (2400×1140). A single image is far
// lighter than separate depth layers (soft fog compresses poorly with alpha).
await save(await render(threshold.svg(), threshold.W, threshold.H, 1.5, false), 'threshold', 88);
writeFileSync('src/data/threshold-overlay.json', JSON.stringify(threshold.overlay, null, 2) + '\n');

// Atmospheric teaser scenes (800×1000).
for (const scene of Object.keys(atmospheres.SCENES)) {
  await save(await render(atmospheres.svg(scene), atmospheres.W, atmospheres.H, 1, false), `atmosphere-${scene}`, 86);
}

await browser.close();
