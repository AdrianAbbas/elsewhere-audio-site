// WCAG 2.x contrast helpers, plus a tiny parser that reads realm colours
// straight from src/styles/realms.css so the styleguide can't drift from the CSS.

const channel = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function parseRealms(css: string): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {};
  for (const m of css.matchAll(/\[data-realm='(\w+)'\]\s*\{([^}]*)\}/g)) {
    const vars: Record<string, string> = {};
    for (const v of m[2].matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) vars[v[1]] = v[2];
    if (Object.keys(vars).length) out[m[1]] = vars;
  }
  return out;
}

/** The pairs every realm must pass. `min` is the WCAG AA threshold. */
export const CHECKS = [
  { fg: 'ink', bg: 'bg', min: 4.5, use: 'Body text' },
  { fg: 'ink', bg: 'surface', min: 4.5, use: 'Text on cards' },
  { fg: 'ink-muted', bg: 'bg', min: 4.5, use: 'Secondary text' },
  { fg: 'ink-muted', bg: 'surface', min: 4.5, use: 'Secondary text on cards' },
  { fg: 'accent-text', bg: 'bg', min: 4.5, use: 'Eyebrows, labels' },
  { fg: 'link', bg: 'bg', min: 4.5, use: 'Links' },
  { fg: 'on-primary', bg: 'primary', min: 4.5, use: 'Primary button' },
  { fg: 'line-strong', bg: 'bg', min: 3, use: 'Button borders, waveform (non-text)' },
  { fg: 'focus', bg: 'bg', min: 3, use: 'Focus ring (non-text)' },
] as const;
