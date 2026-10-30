# TODO: placeholders to replace before launch

Every placeholder in the code carries a `TODO(tag)` comment. Search for a tag
(for example `grep -rn "TODO(moonbase)" src public`) to find each one.
This list grows as each page is built.

## Domain and contact
- [ ] `TODO(domain)`: real production domain. Set in `src/config/site.ts` (`SITE.url`) and `public/robots.txt` (sitemap line).
- [ ] `TODO(email)`: real support address. Currently `support@[domain]`, in `src/config/site.ts`.
- [ ] `TODO(social)`: real YouTube / Instagram / Bluesky URLs, or remove unused ones. In `src/config/site.ts`, shown in the footer.

## Store (Moonbase)
- [ ] `TODO(moonbase)`: Moonbase storefront URL in `src/config/store.ts`.
- [ ] `TODO(moonbase)`: WORLDBUILDER and WORLDBUILDER Lite product IDs in `src/config/store.ts`.
- [ ] `TODO(moonbase)`: confirm the storefront API method names (`add_to_cart`, `checkout`) against Moonbase's docs, in `src/scripts/store.ts`.
- [ ] `TODO(moonbase)`: uncomment the Moonbase script in `src/layouts/BaseLayout.astro` and set `STORE.enabled = true`.
- [ ] `TODO(price)`: confirm US$89 full price and US$59 intro price in `src/config/store.ts`.

## Media
- [ ] `TODO(audio)`: replace `public/audio/placeholder-01…04.mp3` (synthesised tones) with real demos, then regenerate waveform peaks (`npm run audio:placeholders` shows how; adapt it to the real files).
- [ ] `TODO(audio)`: real Place names for the two home-page demos (`src/pages/index.astro`).
- [ ] `TODO(images)`: real WORLDBUILDER screenshots for `src/components/ScreenshotFrame.astro` (home featured section uses the placeholder).
- [ ] `TODO(images)`: replace the SVG placeholder art in `src/components/art/Atmosphere.astro` with real artwork (AVIF/WebP via `astro:assets`).
- [ ] `TODO(og)`: `public/og/default.jpg` is a screenshot of the threshold hero. Replace with designed Open Graph images (1200×630), ideally one per page.

## Copy
- [ ] `TODO(copy)`: home: hero sub-line, intro paragraphs, WORLDBUILDER summary (`src/pages/index.astro`).
- [ ] `TODO(copy)`: sign-up blurb (`src/components/SignupForm.astro`).

## Sign-up
- [ ] `TODO(signup)`: connect the email sign-up to a privacy-friendly newsletter provider (`src/components/SignupForm.astro`). It currently sends nothing.

## Analytics
- [ ] `TODO(analytics)`: choose a privacy-friendly, cookieless provider and paste its script where marked in `src/layouts/BaseLayout.astro`, then name it in the privacy policy.
