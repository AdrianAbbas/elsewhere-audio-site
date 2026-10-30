// The threshold hero, painted with SVG filters and rendered to images by
// scripts/render-art.mjs. Four depth layers (sky, far, mid, near) so the
// site can add gentle parallax. One horizon, two worlds:
// left, ridges and a distant castle under a sunset; right, a city in haze
// under the stars and a great planet lit on its sunward edge; a doorway between.
import { seeded, round, smooth, clamp, ridge, pines, skyline, towersPath, filters, cloudFilter } from './lib.mjs';

export const W = 1600;
export const H = 760;
const HZ = 660; // horizon

const r = seeded(11);

// Land: four ridges, far to near, flattening towards the doorway.
const fadeTo = (x1) => (x) => smooth(clamp(1 - x / x1));
const R = [
  ridge({ seed: 3, base: 600, amp: 190, x1: 860, fade: fadeTo(860), bottom: HZ + 20, floor: HZ + 1 }),
  ridge({ seed: 8, base: 628, amp: 140, x1: 840, fade: fadeTo(840), bottom: HZ + 20, floor: HZ + 1 }),
  ridge({ seed: 21, base: 648, amp: 90, x1: 820, fade: fadeTo(820), bottom: HZ + 20, floor: HZ + 1 }),
  ridge({ seed: 34, base: 664, amp: 46, x1: 790, step: 3, fade: fadeTo(790), bottom: HZ + 30, floor: HZ + 1 }),
];

// The castle sits on the third ridge.
const CX = 470;
const castleBase = round(Math.max(R[2].y(CX - 20), R[2].y(CX + 22)) + 2);
export const overlay = {
  castleWindow: { x: CX + 0.6, y: castleBase - 21 },
  beacon: { x: 1236, y: 296 },
};

// City: three hazy layers.
const cityFar = skyline({ seed: 5, x0: 960, base: HZ, minH: 60, maxH: 250, minW: 12, maxW: 30, rise: 300 });
const cityMid = skyline({ seed: 9, x0: 920, base: HZ, minH: 40, maxH: 210, minW: 16, maxW: 40, rise: 280 });
const cityNear = skyline({ seed: 13, x0: 980, base: HZ, minH: 18, maxH: 150, minW: 20, maxW: 54, rise: 240 });

function windowLights(towers, prob, seed) {
  const q = seeded(seed);
  const out = [];
  for (const t of towers) {
    for (let y = t.top + 6; y < HZ - 6; y += 6 + q() * 3) {
      for (let x = t.x + 3; x < t.x + t.w - 3; x += 4 + q() * 3) {
        if (q() < prob) out.push({ x: round(x), y: round(y), c: q() < 0.72 ? '#a9efe6' : q() < 0.7 ? '#fff1d6' : '#c9c2ff', o: round(0.35 + q() * 0.6, 2) });
      }
    }
  }
  return out;
}
const midLights = windowLights(cityMid, 0.025, 2);
const nearLights = windowLights(cityNear, 0.035, 4);
const tallest = [...cityMid].sort((a, b) => b.h - a.h).slice(0, 4);

const stars = Array.from({ length: 420 }, () => {
  const cool = r() < 0.86;
  const x = cool ? 740 + r() * 860 : r() * 760;
  const y = r() * (cool ? 560 : 300) * (cool ? 1 : 0.9);
  const big = r() < 0.04;
  return { x: round(x), y: round(y), rad: round(big ? 0.9 + r() * 0.5 : 0.25 + r() ** 2 * 0.55, 2), o: round(0.3 + r() * 0.7, 2), big, c: r() < 0.15 ? '#ffe9d0' : r() < 0.2 ? '#cfe0ff' : '#ffffff' };
});

const defs = `
  ${filters(W, H)}
  <linearGradient id="warm" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0d0a18"/><stop offset=".38" stop-color="#1f1328"/>
    <stop offset=".6" stop-color="#43222f"/><stop offset=".74" stop-color="#7e4238"/>
    <stop offset=".82" stop-color="#bf6f45"/><stop offset=".87" stop-color="#e6a15e"/>
  </linearGradient>
  <linearGradient id="cool" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#02041a"/><stop offset=".5" stop-color="#070d2b"/>
    <stop offset=".76" stop-color="#101840"/><stop offset=".87" stop-color="#1f2554"/>
  </linearGradient>
  <linearGradient id="seam" x1="0" x2="1"><stop offset=".36" stop-color="#000"/><stop offset=".64" stop-color="#fff"/></linearGradient>
  <linearGradient id="seamInv" x1="0" x2="1"><stop offset=".36" stop-color="#fff"/><stop offset=".64" stop-color="#000"/></linearGradient>
  <linearGradient id="leftGrad" x1="0" x2="1"><stop offset=".2" stop-color="#fff"/><stop offset=".4" stop-color="#000"/></linearGradient>
  <mask id="leftonly"><rect width="${W}" height="${H}" fill="url(#leftGrad)"/></mask>
  <mask id="coolside"><rect width="${W}" height="${H}" fill="url(#seam)"/></mask>
  <mask id="warmside"><rect width="${W}" height="${H}" fill="url(#seamInv)"/></mask>
  <linearGradient id="cloudBand" x1="0" y1="0" x2="0" y2="1">
    <stop offset=".3" stop-color="#000"/><stop offset=".52" stop-color="#fff"/><stop offset=".76" stop-color="#fff"/><stop offset=".86" stop-color="#000"/>
  </linearGradient>
  <mask id="cloudmask"><rect width="${W}" height="${H}" fill="url(#cloudBand)"/></mask>
  <linearGradient id="highBand" x1="0" y1="0" x2="0" y2="1">
    <stop offset=".05" stop-color="#000"/><stop offset=".2" stop-color="#fff" stop-opacity=".7"/><stop offset=".4" stop-color="#000"/>
  </linearGradient>
  <mask id="highmask"><rect width="${W}" height="${H}" fill="url(#highBand)"/></mask>
  <radialGradient id="sunGlow" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#ffe2b0" stop-opacity=".85"/><stop offset=".22" stop-color="#f6ad6e" stop-opacity=".4"/>
    <stop offset=".6" stop-color="#c46a4c" stop-opacity=".1"/><stop offset="1" stop-color="#c46a4c" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="cityGlow" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#4fb9b3" stop-opacity=".22"/><stop offset="1" stop-color="#4fb9b3" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="nebula" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#5a4bc0" stop-opacity=".18"/><stop offset="1" stop-color="#5a4bc0" stop-opacity="0"/>
  </radialGradient>
  <filter id="planetBands" filterUnits="userSpaceOnUse" x="1200" y="290" width="280" height="280">
    <feTurbulence type="fractalNoise" baseFrequency="0.0015 0.045" numOctaves="4" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0.3 0 0 0 0.02  0.3 0 0 0 0.03  0.45 0 0 0 0.08  0 0 0 0 1"/>
    <feComposite in2="SourceAlpha" operator="in"/>
  </filter>
  <mask id="crescent">
    <circle cx="1340" cy="430" r="132" fill="#fff"/>
    <circle cx="1364" cy="424" r="131" fill="#000"/>
  </mask>
  <clipPath id="planetClip"><circle cx="1340" cy="430" r="130"/></clipPath>
  <linearGradient id="crescentFill" x1="0" x2="1"><stop offset="0" stop-color="#f6cfa6"/><stop offset=".1" stop-color="#b897b8"/><stop offset=".22" stop-color="#5b5798" stop-opacity="0"/></linearGradient>
  <filter id="planetSoft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.5"/></filter>
  <linearGradient id="coolHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2554" stop-opacity="0"/><stop offset=".85" stop-color="#28306a" stop-opacity=".9"/></linearGradient>
  ${cloudFilter({ id: 'cloudWarm', W, H, freq: '0.0021 0.012', seed: 4, body: '#2b1a2b', rim: '#ffb27a', cover: 3.4, bias: -1.55, rimDy: -6, rimBlur: 1.4 })}
  ${cloudFilter({ id: 'cloudCool', W, H, freq: '0.0019 0.011', seed: 12, body: '#0b1030', rim: '#7c7fc0', cover: 3.0, bias: -1.5, rimDy: -4, rimBlur: 1 })}
  ${cloudFilter({ id: 'cirrus', W, H, freq: '0.0012 0.03', octaves: 5, seed: 21, body: '#f2b48a', cover: 2.2, bias: -1.18 })}
  ${cloudFilter({ id: 'fogWarm', W, H, freq: '0.003 0.035', octaves: 4, seed: 31, body: '#e8b08f', cover: 1.8, bias: -0.75 })}
  ${cloudFilter({ id: 'fogCool', W, H, freq: '0.003 0.035', octaves: 4, seed: 33, body: '#7d93d6', cover: 1.8, bias: -0.8 })}
  <linearGradient id="r0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e3f4d"/><stop offset="1" stop-color="#a1625c"/></linearGradient>
  <linearGradient id="r1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#47283a"/><stop offset="1" stop-color="#77454c"/></linearGradient>
  <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1829"/><stop offset="1" stop-color="#41263a"/></linearGradient>
  <linearGradient id="r3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#110b15"/><stop offset="1" stop-color="#140f1c"/></linearGradient>
  <linearGradient id="cf" x1="0" y1="0" x2="0" y2="1"><stop offset=".2" stop-color="#1b2152"/><stop offset="1" stop-color="#34407a"/></linearGradient>
  <linearGradient id="cm" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="#121842"/><stop offset="1" stop-color="#2a3a6e"/></linearGradient>
  <linearGradient id="cn" x1="0" y1="0" x2="0" y2="1"><stop offset=".4" stop-color="#080b20"/><stop offset="1" stop-color="#121b3c"/></linearGradient>
  <linearGradient id="mistBand" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <mask id="mistmask"><rect y="560" width="${W}" height="130" fill="url(#mistBand)"/></mask>
  <mask id="mistmaskLow"><rect y="615" width="${W}" height="70" fill="url(#mistBand)"/></mask>
  <linearGradient id="horizonLine" x1="0" x2="1">
    <stop offset="0" stop-color="#e3b566" stop-opacity="0"/><stop offset=".32" stop-color="#e9b86c" stop-opacity=".55"/>
    <stop offset=".5" stop-color="#fff3dc"/><stop offset=".68" stop-color="#78d8cd" stop-opacity=".55"/><stop offset="1" stop-color="#6fd6cb" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="door" x1="0" x2="1"><stop offset="0" stop-color="#f4cf92"/><stop offset="1" stop-color="#95e6dd"/></linearGradient>
  <linearGradient id="doorFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff7e8" stop-opacity=".1"/><stop offset="1" stop-color="#ffeccc" stop-opacity=".42"/></linearGradient>
  <linearGradient id="rimWarm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6a978" stop-opacity=".7"/><stop offset="1" stop-color="#e6a978" stop-opacity="0"/></linearGradient>
  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f0c17"/><stop offset="1" stop-color="#0b0c18"/></linearGradient>
  <linearGradient id="reflect" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3dc" stop-opacity=".5"/><stop offset="1" stop-color="#fff3dc" stop-opacity="0"/></linearGradient>
  <radialGradient id="vignette" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>`;

const sky = `
  <rect width="${W}" height="${H}" fill="url(#warm)"/>
  <g mask="url(#coolside)">
    <rect width="${W}" height="${H}" fill="url(#cool)"/>
    <ellipse cx="1180" cy="200" rx="460" ry="240" fill="url(#nebula)"/>
  </g>
  <ellipse cx="320" cy="668" rx="620" ry="300" fill="url(#sunGlow)"/>
  <g>${stars.map((s) => `<circle cx="${s.x}" cy="${s.y}" r="${s.rad}" fill="${s.c}" opacity="${s.o}"${s.big ? ' filter="url(#bloom)"' : ''}/>`).join('')}</g>
  <g mask="url(#coolside)">
    <circle cx="1340" cy="430" r="130" fill="#05071a"/>
    <g clip-path="url(#planetClip)"><rect x="1200" y="290" width="280" height="280" fill="#fff" filter="url(#planetBands)" opacity=".28"/></g>
    <circle cx="1340" cy="430" r="132" fill="url(#crescentFill)" mask="url(#crescent)" filter="url(#haze)"/>
    <circle cx="1340" cy="430" r="133" fill="none" stroke="#f0c8b0" stroke-opacity=".4" stroke-width="4" mask="url(#crescent)" filter="url(#soft)"/>
  </g>
  <g mask="url(#highmask)" opacity=".35"><g mask="url(#warmside)"><rect width="${W}" height="${H}" filter="url(#cirrus)"/></g></g>
  <g mask="url(#cloudmask)">
    <g mask="url(#warmside)"><rect width="${W}" height="${H}" filter="url(#cloudWarm)" opacity=".92"/></g>
    <g mask="url(#coolside)"><rect width="${W}" height="${H}" filter="url(#cloudCool)" opacity=".85"/></g>
  </g>
  <g mask="url(#coolside)"><rect y="440" width="${W}" height="230" fill="url(#coolHaze)"/></g>`;

const far = `
  <g filter="url(#hazeFar)">
    <path d="${R[0].fill}" fill="url(#r0)" filter="url(#rough)" opacity=".9"/>
    <path d="${towersPath(cityFar, HZ)}" fill="url(#cf)"/>
  </g>
  <path d="${R[0].top}" fill="none" stroke="#ffc690" stroke-opacity=".2" stroke-width=".8" filter="url(#rough)" mask="url(#leftonly)"/>
  <g mask="url(#mistmask)" opacity=".55"><g mask="url(#warmside)"><rect width="${W}" height="${H}" filter="url(#fogWarm)"/></g></g>
  <g filter="url(#haze)">
    <path d="${R[1].fill}" fill="url(#r1)" filter="url(#rough)"/>
  </g>
  <path d="${R[1].top}" fill="none" stroke="#ffc690" stroke-opacity=".16" stroke-width=".7" filter="url(#rough)" mask="url(#leftonly)"/>
  <g mask="url(#mistmask)" opacity=".5"><g mask="url(#coolside)"><rect width="${W}" height="${H}" filter="url(#fogCool)"/></g></g>`;

const castle = `
  <g transform="translate(${CX} ${castleBase}) scale(1.25)" fill="#2a1829" filter="url(#roughFine)">
    <path d="M-24 0V-20h3v-4h3v4h3v-4h3v4h3V-30l2-3 2 3v6h4v-4h3v4h3v-4h3v4h2V-36l3.5-11 3.5 11V0Z"/>
    <path d="M-20 -20V-28l2.5-8 2.5 8V-20Z"/>
  </g>
  <rect x="${overlay.castleWindow.x - 0.8}" y="${overlay.castleWindow.y - 1.2}" width="1.6" height="2.4" fill="#ffd08a" filter="url(#bloom)"/>`;

const mid = `
  <g filter="url(#haze)" opacity=".98">
    <path d="${R[2].fill}" fill="url(#r2)" filter="url(#rough)"/>
  </g>
  <path d="${pines({ seed: 6, ridgeY: R[2].y, x0: 20, x1: 380, minH: 4, maxH: 11, density: 0.8 })}" fill="#2a1829" filter="url(#haze)"/>
  ${castle}
  <g filter="url(#haze)">
    <path d="${towersPath(cityMid, HZ)}" fill="url(#cm)"/>
    <path d="M1235 ${HZ}V330H1237V${HZ}Z M1235.6 330V292H1236.4V330Z" fill="#1b2356"/>
  </g>
  <g opacity=".5">${cityMid.map((t) => `<rect x="${t.x}" y="${t.top}" width="1.2" height="${round(t.h)}" fill="url(#rimWarm)"/>`).join('')}</g>
  <g>${midLights.map((l) => `<rect x="${l.x}" y="${l.y}" width="1.3" height="1.6" fill="${l.c}" opacity="${l.o * 0.8}"/>`).join('')}</g>
  <g filter="url(#bloom)">${tallest.map((t) => `<circle cx="${round(t.x + t.w / 2)}" cy="${round(t.top - 1)}" r=".9" fill="#ff6a6a" opacity=".8"/>`).join('')}</g>
  <ellipse cx="1290" cy="${HZ}" rx="420" ry="80" fill="url(#cityGlow)"/>
  <g mask="url(#mistmaskLow)" opacity=".6"><g mask="url(#coolside)"><rect width="${W}" height="${H}" filter="url(#fogCool)"/></g></g>
  <g mask="url(#mistmaskLow)" opacity=".45"><g mask="url(#warmside)"><rect width="${W}" height="${H}" filter="url(#fogWarm)"/></g></g>`;

const near = `
  <path d="${R[3].fill}" fill="url(#r3)" filter="url(#rough)"/>
  <path d="${pines({ seed: 9, ridgeY: R[3].y, x0: 0, x1: 640, minH: 8, maxH: 30, density: 1.1 })}" fill="#110b15" filter="url(#roughFine)"/>
  <path d="${towersPath(cityNear, HZ)}" fill="url(#cn)"/>
  <g filter="url(#bloom)">${nearLights.map((l) => `<rect x="${l.x}" y="${l.y}" width="1.5" height="2" fill="${l.c}" opacity="${l.o}"/>`).join('')}</g>
  <rect y="${HZ}" width="${W}" height="${H - HZ}" fill="url(#ground)"/>
  <rect y="${HZ - 1}" width="${W}" height="2" fill="url(#horizonLine)" filter="url(#bloom)" opacity=".8"/>
  <ellipse cx="800" cy="618" rx="90" ry="80" fill="#fff0d6" opacity=".09" filter="url(#soft)"/>
  <path d="M778 ${HZ}V600a22 22 0 0 1 44 0V${HZ}Z" fill="url(#doorFill)"/>
  <path d="M778 ${HZ}V600a22 22 0 0 1 44 0V${HZ}" fill="none" stroke="url(#door)" stroke-width="1.1" filter="url(#bloom)"/>
  <ellipse cx="800" cy="${HZ + 3}" rx="120" ry="4" fill="#ffe7c2" opacity=".22" filter="url(#soft)"/>
  <rect x="789" y="${HZ + 1}" width="22" height="50" fill="url(#reflect)" opacity=".4" filter="url(#haze)"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>`;

export const LAYERS = { sky, far, mid, near };

export function svg(layers = Object.keys(LAYERS)) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs>${defs}</defs>${layers.map((l) => `<g>${LAYERS[l]}</g>`).join('')}</svg>`;
}
