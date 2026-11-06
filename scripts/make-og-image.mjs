// Generates the default social share image, public/og/default.jpg (1200×630):
// the stacked logo centred on brand ink, with the tagline in Cinzel under it.
//
// Usage: npm run og
// The tagline is converted to outlines with opentype.js, so no font has to
// be installed for sharp (librsvg) to draw it.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import opentype from 'opentype.js';

const require = createRequire(import.meta.url);

const W = 1200;
const H = 630;
const INK = '#120E24'; // --brand-ink
const TAGLINE = 'Instruments for places that don’t exist';
const TAGLINE_COLOUR = '#A79FC4';
const LOGO = 'public/brand/lockup/windward-stacked-for-dark.svg';
const OUT = 'public/og/default.jpg';

// Layout: logo and tagline centred as one group, with generous margins.
// (The stacked SVG has about 4 % empty space above its artwork.)
const LOGO_HEIGHT = 380;
const TEXT_SIZE = 30;
const TEXT_TRACKING = 0.08; // em
const TEXT_GAP = 20; // from the logo's box to the tagline's baseline
const groupHeight = LOGO_HEIGHT * 0.96 + TEXT_GAP;
const LOGO_TOP = Math.round((H - groupHeight) / 2 - LOGO_HEIGHT * 0.04);
const TEXT_BASELINE = LOGO_TOP + LOGO_HEIGHT + TEXT_GAP;

// The logo, rasterised at its final size (high density keeps edges crisp).
const logo = await sharp(readFileSync(LOGO), { density: 300 })
  .resize({ height: LOGO_HEIGHT })
  .png()
  .toBuffer();
const { width: logoWidth } = await sharp(logo).metadata();

// The tagline as outlines, letter-spaced and centred.
const font = opentype.parse(readFileSync(require.resolve('@fontsource/cinzel/files/cinzel-latin-600-normal.woff')).buffer);
const glyphs = font.stringToGlyphs(TAGLINE);
const scale = TEXT_SIZE / font.unitsPerEm;
const tracking = TEXT_TRACKING * TEXT_SIZE;
const advances = glyphs.map((g, i) => g.advanceWidth * scale + (i < glyphs.length - 1 ? tracking : 0));
const textWidth = advances.reduce((a, b) => a + b, 0);
let x = (W - textWidth) / 2;
const paths = glyphs.map((g, i) => {
  const d = g.getPath(x, TEXT_BASELINE, TEXT_SIZE).toPathData(2);
  x += advances[i];
  return d;
}).join('');
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><path d="${paths}" fill="${TAGLINE_COLOUR}"/></svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: INK } })
  .composite([
    { input: logo, top: LOGO_TOP, left: Math.round((W - logoWidth) / 2) },
    { input: text, top: 0, left: 0 },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(OUT);

console.log(`wrote ${OUT} (${W}×${H}, tagline ${Math.round(textWidth)} px wide)`);
