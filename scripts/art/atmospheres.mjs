// Atmospheric scenes for the unnamed "coming soon" cards, painted with SVG
// filters and rendered to images by scripts/render-art.mjs.
// TODO(images): these are stand-ins until real teaser artwork exists.
import { seeded, round, ridge, pines, skyline, towersPath, filters, cloudFilter } from './lib.mjs';

export const W = 800;
export const H = 1000;

const fogBand = (id, y, h) => `
  <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="${id}"><rect y="${y}" width="${W}" height="${h}" fill="url(#${id}g)"/></mask>`;

function stars(seed, n, maxY, warm = 0.1) {
  const q = seeded(seed);
  return Array.from({ length: n }, () => {
    const big = q() < 0.03;
    return `<circle cx="${round(q() * W)}" cy="${round(q() * maxY)}" r="${round(big ? 1 + q() * 0.6 : 0.3 + q() ** 2 * 0.7, 2)}" fill="${q() < warm ? '#ffe6c8' : '#fff'}" opacity="${round(0.25 + q() * 0.7, 2)}"${big ? ' filter="url(#bloom)"' : ''}/>`;
  }).join('');
}

// ── Forest: pines in layered mist before dawn ─────────────────────────
function forest() {
  const layers = [
    { seed: 2, base: 520, amp: 90, c: '#5f7a6e', tree: [10, 26], o: 0.75 },
    { seed: 5, base: 600, amp: 80, c: '#3e5a4d', tree: [16, 40], o: 0.85 },
    { seed: 9, base: 690, amp: 70, c: '#24392f', tree: [26, 64], o: 0.95 },
    { seed: 14, base: 800, amp: 60, c: '#121e18', tree: [44, 110], o: 1 },
    { seed: 17, base: 930, amp: 40, c: '#070c09', tree: [80, 200], o: 1 },
  ];
  const defs = `${filters(W, H)}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1a17"/><stop offset=".45" stop-color="#3c5650"/><stop offset=".7" stop-color="#9bab9a"/><stop offset="1" stop-color="#cfd3bd"/></linearGradient>
    ${cloudFilter({ id: 'fog', W, H, freq: '0.004 0.03', octaves: 5, seed: 3, body: '#d9e0cf', cover: 1.9, bias: -0.75 })}
    ${layers.map((_, i) => fogBand(`fb${i}`, layers[i].base - 60, 160)).join('')}`;
  const body = `
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    ${stars(4, 60, 280)}
    <circle cx="560" cy="260" r="34" fill="#f4efd6" opacity=".55" filter="url(#soft)"/>
    <circle cx="560" cy="260" r="20" fill="#fbf6e2" opacity=".5" filter="url(#haze)"/>
    ${layers.map((l, i) => {
      const rr = ridge({ seed: l.seed, base: l.base, amp: l.amp, x1: W, bottom: H + 10 });
      return `<g opacity="${l.o}" filter="url(#${i < 2 ? 'hazeFar' : i < 4 ? 'haze' : 'roughFine'})">
        <path d="${rr.fill}" fill="${l.c}" filter="url(#rough)"/>
        <path d="${pines({ seed: l.seed + 1, ridgeY: rr.y, x0: -10, x1: W + 10, minH: l.tree[0], maxH: l.tree[1], density: 1.2 - i * 0.15 })}" fill="${l.c}"/>
      </g>
      ${i < layers.length - 1 ? `<g mask="url(#fb${i})" opacity=".55"><rect width="${W}" height="${H}" filter="url(#fog)"/></g>` : ''}`;
    }).join('')}`;
  return { defs, body };
}

// ── Nebula: deep space, gas and dust ──────────────────────────────────
function nebula() {
  const gas = (id, seed, freq, color, cover, bias) => cloudFilter({ id, W, H, freq, octaves: 6, seed, body: color, cover, bias });
  const defs = `${filters(W, H)}
    ${gas('gasV', 3, '0.0035', '#6b52d6', 2.6, -1.05)}
    ${gas('gasT', 8, '0.004', '#2bb5a8', 2.8, -1.3)}
    ${gas('gasR', 13, '0.005', '#c0558a', 3, -1.55)}
    ${gas('dust', 21, '0.006', '#02030c', 3.2, -1.4)}
    <radialGradient id="mV" cx=".38" cy=".42" r=".55"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <radialGradient id="mT" cx=".66" cy=".62" r=".45"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <radialGradient id="mR" cx=".5" cy=".5" r=".3"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="maskV"><rect width="${W}" height="${H}" fill="url(#mV)"/></mask>
    <mask id="maskT"><rect width="${W}" height="${H}" fill="url(#mT)"/></mask>
    <mask id="maskR"><rect width="${W}" height="${H}" fill="url(#mR)"/></mask>
    <radialGradient id="core" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6ea" stop-opacity=".9"/><stop offset=".2" stop-color="#e3d7ff" stop-opacity=".3"/><stop offset="1" stop-color="#e3d7ff" stop-opacity="0"/></radialGradient>`;
  const body = `
    <rect width="${W}" height="${H}" fill="#03041a"/>
    ${stars(5, 520, H, 0.15)}
    <g mask="url(#maskV)" opacity=".8"><rect width="${W}" height="${H}" filter="url(#gasV)"/></g>
    <g mask="url(#maskT)" opacity=".65"><rect width="${W}" height="${H}" filter="url(#gasT)"/></g>
    <g mask="url(#maskR)" opacity=".5"><rect width="${W}" height="${H}" filter="url(#gasR)"/></g>
    <g opacity=".75"><rect width="${W}" height="${H}" filter="url(#dust)"/></g>
    <circle cx="400" cy="500" r="140" fill="url(#core)"/>
    ${stars(9, 90, H, 0.3)}
    <circle cx="430" cy="470" r="2" fill="#fff" filter="url(#bloom)"/>`;
  return { defs, body };
}

// ── Ruins: a broken gothic nave in evening fog ────────────────────────
function ruins() {
  // Wall with three pointed lancet windows and a great rose-window arch, cut out (even-odd).
  const lancet = (x, top, w, h) => `M${x} ${top + h}V${top + w}Q${x} ${top} ${x + w / 2} ${top - w * 0.6}Q${x + w} ${top} ${x + w} ${top + w}V${top + h}Z`;
  const facade = `M140 1010V430L172 398L185 412L190 380L230 420V300L262 258L270 270L300 210L330 240L346 196L352 204L360 150L372 132L378 140L392 92L404 104L412 128L422 122L440 150L470 240L486 222L500 210L532 254L540 248L570 300V470L582 458L600 440L622 488L630 480L640 520V1010Z` +
    lancet(205, 520, 46, 260) + lancet(287, 420, 70, 330) + lancet(377, 300, 46, 120) + lancet(443, 420, 70, 330) + lancet(531, 520, 46, 260) +
    `M400 200a34 34 0 1 0 0.1 0Z`;
  const brokenWall = `M-10 1010V640L40 610L70 660L110 620L150 700V1010ZM630 1010V720L680 700L720 660L760 690L810 650V1010Z`;
  const defs = `${filters(W, H)}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16121e"/><stop offset=".5" stop-color="#4c3a48"/><stop offset=".8" stop-color="#a77f72"/><stop offset="1" stop-color="#d9b59a"/></linearGradient>
    ${cloudFilter({ id: 'clouds', W, H, freq: '0.003 0.012', octaves: 6, seed: 6, body: '#2a2030', rim: '#e7b394', cover: 3, bias: -1.4, rimDy: -5 })}
    ${cloudFilter({ id: 'fog', W, H, freq: '0.004 0.03', octaves: 5, seed: 7, body: '#e2c6b4', cover: 1.9, bias: -0.75 })}
    ${fogBand('low', 760, 260)}${fogBand('high', 80, 380)}
    <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1219"/><stop offset="1" stop-color="#2e2229"/></linearGradient>`;
  const body = `
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    ${stars(3, 40, 260)}
    <g mask="url(#high)" opacity=".8"><rect width="${W}" height="${H}" filter="url(#clouds)"/></g>
    <circle cx="400" cy="234" r="40" fill="#f0c9a5" opacity=".35" filter="url(#soft)"/>
    <path d="${facade}" fill="url(#stone)" fill-rule="evenodd" filter="url(#rough)"/>
    <path d="${brokenWall}" fill="#120c12" filter="url(#rough)"/>
    <path d="M-10 1010V930Q200 905 400 918T810 925V1010Z" fill="#0e0a0f" filter="url(#rough)"/>
    <g mask="url(#low)" opacity=".75"><rect width="${W}" height="${H}" filter="url(#fog)"/></g>`;
  return { defs, body };
}

// ── Megacity: towers dissolving into low cloud ────────────────────────
function megacity() {
  const L = [
    { seed: 2, base: 760, min: 200, max: 520, w: [18, 40], c: '#1e2658', o: 1, lights: 0.01 },
    { seed: 5, base: 820, min: 160, max: 480, w: [24, 56], c: '#131a44', o: 1, lights: 0.02 },
    { seed: 9, base: 900, min: 120, max: 420, w: [34, 80], c: '#0b1030', o: 1, lights: 0.035 },
    { seed: 12, base: 1010, min: 100, max: 360, w: [50, 120], c: '#050816', o: 1, lights: 0.04 },
  ];
  const q = seeded(77);
  const defs = `${filters(W, H)}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03051a"/><stop offset=".55" stop-color="#151a4a"/><stop offset=".85" stop-color="#2f3a78"/><stop offset="1" stop-color="#3d6a86"/></linearGradient>
    ${cloudFilter({ id: 'cloud', W, H, freq: '0.003 0.016', octaves: 6, seed: 4, body: '#3a4486', rim: '#8bd7d0', cover: 2.6, bias: -1.1, rimDy: 5, rimBlur: 2 })}
    ${cloudFilter({ id: 'fog', W, H, freq: '0.004 0.03', octaves: 5, seed: 9, body: '#7fa6c8', cover: 1.9, bias: -0.8 })}
    ${fogBand('cl', 230, 260)}${L.map((l, i) => fogBand(`f${i}`, l.base - 140, 220)).join('')}
    ${L.map((l, i) => `<linearGradient id="t${i}" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="${l.c}"/><stop offset="1" stop-color="#3f5a8c" stop-opacity="${1 - i * 0.2}"/></linearGradient>`).join('')}`;
  const body = `
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    ${stars(6, 160, 300)}
    <path d="M392 1010V120L400 60L408 120V1010Z" fill="#141b48" filter="url(#haze)"/>
    <circle cx="400" cy="58" r="2" fill="#ff7a7a" filter="url(#bloom)"/>
    <g mask="url(#cl)" opacity=".9"><rect width="${W}" height="${H}" filter="url(#cloud)"/></g>
    ${L.map((l, i) => {
      const t = skyline({ seed: l.seed, x0: -30, x1: W + 30, base: l.base, minH: l.min, maxH: l.max, minW: l.w[0], maxW: l.w[1], rise: 1, gap: 6 });
      const lights = [];
      for (const b of t) for (let y = b.top + 8; y < l.base - 8; y += 7) for (let x = b.x + 4; x < b.x + b.w - 4; x += 5) if (q() < l.lights) lights.push(`<rect x="${round(x)}" y="${round(y)}" width="1.6" height="2" fill="${q() < 0.7 ? '#a9efe6' : '#fff0d6'}" opacity="${round(0.4 + q() * 0.6, 2)}"/>`);
      return `<g opacity="${l.o}" filter="url(#${i < 2 ? 'hazeFar' : 'haze'})"><path d="${towersPath(t, l.base)}" fill="${i < 3 ? `url(#t${i})` : l.c}"/></g>
        <g${i > 1 ? ' filter="url(#bloom)"' : ''}>${lights.join('')}</g>
        <g mask="url(#f${i})" opacity=".45"><rect width="${W}" height="${H}" filter="url(#fog)"/></g>`;
    }).join('')}
    <rect y="985" width="${W}" height="20" fill="#050816"/>`;
  return { defs, body };
}

export const SCENES = { forest, nebula, ruins, megacity };

export function svg(scene) {
  const { defs, body } = SCENES[scene]();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs>${defs}</defs>${body}</svg>`;
}
