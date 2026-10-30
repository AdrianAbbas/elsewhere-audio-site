// Shared helpers for the art generators. These run at authoring time only
// (see scripts/render-art.mjs); the site ships the rendered AVIF/WebP images.

export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;
export const smooth = (t) => t * t * (3 - 2 * t);
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** A mountain ridge from ridged noise. `fade(x)` scales its height (0..1). */
export function ridge({ seed, base, amp, x0 = 0, x1, step = 4, fade = () => 1, bottom, floor = bottom }) {
  const q = seeded(seed);
  const f = [0.004 + q() * 0.003, 0.011 + q() * 0.006, 0.03 + q() * 0.012, 0.09 + q() * 0.03];
  const p = [q() * 6, q() * 6, q() * 6, q() * 6];
  const y = (x) => {
    const n = 0.58 * (1 - Math.abs(Math.sin(x * f[0] + p[0]))) + 0.26 * Math.sin(x * f[1] + p[1]) +
      0.11 * Math.sin(x * f[2] + p[2]) + 0.05 * Math.sin(x * f[3] + p[3]);
    // Where the ridge fades out it sinks to `floor` (the horizon), not to its own base.
    const k = fade(x);
    return round(floor + (base - amp * n - floor) * k);
  };
  const pts = [];
  for (let x = x0; x <= x1; x += step) pts.push(`${x} ${y(x)}`);
  return { y, top: `M${pts.join('L')}`, fill: `M${x0} ${bottom}L${pts.join('L')}L${x1} ${bottom}Z` };
}

/** A row of pines standing on a ridge; returns one path. */
export function pines({ seed, ridgeY, x0, x1, minH, maxH, density = 1 }) {
  const q = seeded(seed);
  let d = '';
  for (let x = x0; x < x1; x += (2 + q() * 5) / density) {
    const h = minH + q() ** 1.4 * (maxH - minH);
    const w = h * (0.2 + q() * 0.08);
    const b = ridgeY(x) + 2;
    // A pine: stacked tiers that narrow towards a fine tip
    d += `M${round(x - w)} ${round(b)}L${round(x - w * 0.35)} ${round(b - h * 0.45)}L${round(x - w * 0.7)} ${round(b - h * 0.42)}` +
      `L${round(x - w * 0.18)} ${round(b - h * 0.78)}L${round(x - w * 0.4)} ${round(b - h * 0.76)}L${round(x)} ${round(b - h)}` +
      `L${round(x + w * 0.4)} ${round(b - h * 0.76)}L${round(x + w * 0.18)} ${round(b - h * 0.78)}L${round(x + w * 0.7)} ${round(b - h * 0.42)}` +
      `L${round(x + w * 0.35)} ${round(b - h * 0.45)}L${round(x + w)} ${round(b)}Z`;
  }
  return d;
}

/** Towers for a skyline layer. */
export function skyline({ seed, x0, x1 = 1600, base, minH, maxH, minW, maxW, rise = 260, gap = 3 }) {
  const q = seeded(seed);
  const out = [];
  for (let x = x0; x < x1; ) {
    const w = minW + q() * (maxW - minW);
    const k = smooth(clamp((x - x0) / rise));
    const h = (minH + q() ** 1.6 * (maxH - minH)) * k + 4;
    out.push({ x: round(x), w: round(w), h: round(h), top: base - h, spire: q() < 0.18, step: q() < 0.35 });
    x += w + q() * gap;
  }
  return out;
}

/** Tower silhouettes with a few rooftop details (setbacks, masts). */
export function towersPath(towers, base) {
  return towers.map((t) => {
    let d = `M${t.x} ${base + 20}V${round(t.top)}H${round(t.x + t.w)}V${base + 20}Z`;
    if (t.step && t.w > 22) d += `M${round(t.x + t.w * 0.2)} ${round(t.top)}V${round(t.top - t.h * 0.06)}H${round(t.x + t.w * 0.8)}V${round(t.top)}Z`;
    if (t.spire) d += `M${round(t.x + t.w / 2 - 0.6)} ${round(t.top)}V${round(t.top - 18 - t.h * 0.08)}H${round(t.x + t.w / 2 + 0.6)}V${round(t.top)}Z`;
    return d;
  }).join('');
}

/** Reusable filter defs. All filters work in user space so noise scale is predictable. */
export const filters = (W, H) => `
  <filter id="rough" x="-2%" y="-10%" width="104%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="2" result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale="6" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="roughFine" x="-2%" y="-10%" width="104%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="5" result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="haze" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.9"/></filter>
  <filter id="hazeFar" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b1"/>
    <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b2"/>
    <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="grainTex" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0.35 0 0 0 -0.12" result="g"/>
    <feComposite in="g" in2="SourceAlpha" operator="in"/>
  </filter>`;

/** Fractal fog/cloud filter: noise → alpha, flooded with a colour, with a lit lower rim. */
export function cloudFilter({ id, W, H, freq, octaves = 6, seed, body, rim, cover = 3.2, bias = -1.45, rimDy = -5, rimBlur = 1.2 }) {
  return `
  <filter id="${id}" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
    <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${octaves}" seed="${seed}" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${cover} 0 0 0 ${bias}" result="a"/>
    <feFlood flood-color="${body}" result="bodyc"/>
    <feComposite in="bodyc" in2="a" operator="in" result="bodyf"/>
    ${rim ? `<feOffset in="a" dy="${rimDy}" result="up"/>
    <feComposite in="a" in2="up" operator="out" result="edge"/>
    <feFlood flood-color="${rim}" result="rimc"/>
    <feComposite in="rimc" in2="edge" operator="in" result="rimf"/>
    <feGaussianBlur in="rimf" stdDeviation="${rimBlur}" result="rimb"/>
    <feMerge><feMergeNode in="bodyf"/><feMergeNode in="rimb"/></feMerge>` : ''}
  </filter>`;
}
