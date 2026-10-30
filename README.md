# elsewhere-audio-site

The website for **Elsewhere Audio** (a business name of LJP Records Inc., Ontario, Canada).
*Instruments for places that don't exist.*

Built with [Astro](https://astro.build) as a fully static site, using plain CSS with custom properties and very little client-side JavaScript. It deploys to Cloudflare Pages.

> This repository contains only the website. Plugin source code, samples and build files never belong here (`.gitignore` blocks the common ones).

## Run it locally

You need Node.js 20 or newer (22 recommended).

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321/styleguide>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with live reload |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves the built `dist/` locally, the closest thing to production |
| `npm run check` | Type-checks `.astro` and `.ts` files |
| `npm run audio:placeholders` | Regenerates the placeholder demo audio and waveform peaks (needs `ffmpeg`) |
| `npm run art` | Re-renders the painted artwork into `src/assets/art/` (needs Playwright, see below) |

## How the design system works

**One house, many realms.**

- **The house** (`src/styles/tokens.css`, `src/styles/base.css`) holds what every page shares: type scale, spacing, motion, buttons and the base elements.
- **Realms** (`src/styles/realms.css`) are themes made of CSS custom properties, chosen with `data-realm` on `<body>`: `house` (default), `fantasy`, `scifi` and `threshold`. Pages pick theirs through the layout, e.g. `<BaseLayout realm="fantasy">`. A realm can also be set on any element, which is how `/styleguide` shows realms side by side.
- **Contrast**: `/styleguide` reads `realms.css` at build time and shows WCAG AA ratios for every realm. If you change a colour, check that page.
- **Fonts** are open-licensed (SIL OFL) and self-hosted, bundled from npm by `src/styles/fonts.css`: Fraunces (display), Instrument Sans (body) and IBM Plex Mono (sci-fi labels).
- **Motion** uses CSS only (scroll-driven animations) and turns off under `prefers-reduced-motion`. Audio never autoplays.
- **Pixel art** belongs to WORLDBUILDER surfaces only (`src/components/art/TinyPlanet.astro`). Never use it in site chrome.

**Artwork.** The home hero and the teaser scenes are painted in code: SVG with filters (fractal clouds, haze, mist, bloom) in `scripts/art/`. `npm run art` renders them once, using a headless browser, into WebP sources in `src/assets/art/`, and Astro serves them as responsive AVIF/WebP. Visitors download a small image (the hero is about 25 KB as AVIF), never the filters. To change the art, edit `scripts/art/*.mjs` and run `npm run art`. It needs Playwright with Chromium (`npm i -D playwright` then `npx playwright install chromium`). Real artwork can replace any of these files directly.

Key components:

- `src/components/AudioPlayer.astro`: an accessible demo player. It loads nothing until play is pressed, plays one demo at a time, and draws an optional waveform from `src/data/audio-peaks.json`.
- `src/components/store/*`: Buy, Add to cart and Download Lite buttons (see Moonbase below).
- `src/components/SiteNav.astro` and `SiteFooter.astro`: these respond to their container width, not the screen width.

## Deploy to Cloudflare Pages

The site is static, so Cloudflare only needs to run the build and serve `dist/`.

1. Push this repository to GitHub (or GitLab).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repository.
3. Use these build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
4. Deploy. Every push to `main` then redeploys, and pull requests get preview URLs.
5. Add your custom domain under **Custom domains**, then update `SITE.url` in `src/config/site.ts` and the sitemap line in `public/robots.txt`.

`public/_headers` sets security headers and long-term caching for hashed assets on Cloudflare Pages.

To deploy from your machine instead (optional):

```bash
npm run build
```

```bash
npx wrangler pages deploy dist --project-name elsewhere-audio-site
```

## Enabling Moonbase

Payments, licence keys and downloads will run through Moonbase's embedded storefront. Everything is prepared but switched off.

1. **Config**: in `src/config/store.ts`, set `moonbaseAccountUrl` and the product IDs for WORLDBUILDER and WORLDBUILDER Lite.
2. **Script**: in `src/layouts/BaseLayout.astro`, uncomment
   `<script type="module" src="https://assets.moonbase.sh/storefront/moonbase.js"></script>`
   (move it out of the HTML comment it sits in).
3. **Switch on**: set `enabled: true` in `src/config/store.ts`.
4. **Check the API**: `src/scripts/store.ts` calls `Moonbase.add_to_cart(productId)` and `Moonbase.checkout()`. Confirm those names and arguments against Moonbase's storefront documentation and adjust them there if needed. It is the only file that talks to Moonbase.
5. **Customer portal**: the `/account` page holds the placeholder where the Moonbase customer portal will be embedded.

While the store is off, store buttons show a polite "The store opens soon" note instead.

## Analytics

There are no trackers and no cookies. A commented placeholder in `src/layouts/BaseLayout.astro` marks where a privacy-friendly, cookieless analytics script can go later.

## Placeholders

Every placeholder (copy, images, audio, links, prices, emails) has a `TODO(tag)` comment in the code and is listed in [`TODO.md`](./TODO.md).
