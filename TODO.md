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
- [ ] `TODO(audio)`: a real demo for each of the 26 Places (`src/data/worldbuilder.ts` cycles four placeholder tones), plus the two home-page demos (Tavern, Nebula).
- [ ] `TODO(images)`: real WORLDBUILDER screenshots for `src/components/ScreenshotFrame.astro` (home featured section uses the placeholder).
- [ ] `TODO(images)`: the teaser scenes (`src/assets/art/atmosphere-*.webp`, painted by `scripts/art/atmospheres.mjs`) are stand-ins. Replace with real teaser artwork when it exists.
- [ ] `TODO(og)`: `public/og/default.jpg` is a screenshot of the threshold hero with the brand line. Replace with designed Open Graph images (1200×630), ideally one per page.

## WORLDBUILDER page (`src/data/worldbuilder.ts`)
- [ ] `TODO(video)`: trailer YouTube ID (`TRAILER.youtubeId`). Until set, the trailer shows "coming soon".
- [ ] `TODO(specs)`: confirm system requirements, especially tested hosts and installed size.
- [ ] `TODO(copy)`: what WORLDBUILDER Lite includes (nothing in the plugin defines a Lite edition yet).
- [ ] `TODO(copy)`: feature wording and FAQ answers (facts follow the plugin's README).
- [ ] `TODO(images)`: three real screenshots (Living Globe, pattern editor, arrangement) for the screenshot frames.
- [ ] Decide: the brief said 27 Places; the plugin has 26 (the 27th icon is the empty slot). The site says 26.

## About page (`src/pages/about.astro`)
- [ ] `TODO(copy)`: the story, and who makes it, in your own words. Your name is left as `[your name]` on purpose.
- [ ] `TODO(images)`: a photograph of the maker or the recording space (a painted forest stands in).
- [ ] `TODO(copy)`: anything more to say about LJP Records.

## Products page
- [ ] `TODO(images)`: WORLDBUILDER key art for the product card (the painted horizon stands in).
- [ ] `TODO(copy)`: products intro.

## Support, account and legal
- [ ] `TODO(copy)`: confirm every support answer (`src/pages/support.astro`): installer steps, activations per licence, moving a licence, offline activation steps, refund policy, reply time.
- [ ] In the plugin repo (not this one): change the plugin's manufacturer from "Veil Audio" to "Elsewhere Audio". The support steps already say "AU Instruments → Elsewhere Audio → WORLDBUILDER".
- [ ] `TODO(moonbase)`: embed the customer portal on /account (`mountAccountPortal` in `src/scripts/store.ts`).
- [ ] `TODO(legal)`: replace the EULA, Privacy Policy and Terms (`src/pages/legal/`). All three are marked "DRAFT – to be replaced". Update the privacy policy when analytics, the newsletter and Moonbase are connected.

## Copy
- [ ] `TODO(copy)`: home: hero sub-line, intro paragraphs, WORLDBUILDER summary (`src/pages/index.astro`).
- [ ] `TODO(copy)`: sign-up blurb (`src/components/SignupForm.astro`).

## Sign-up
- [ ] `TODO(signup)`: connect the email sign-up to a privacy-friendly newsletter provider (`src/components/SignupForm.astro`). It currently sends nothing.

## Analytics
- [ ] `TODO(analytics)`: choose a privacy-friendly, cookieless provider and paste its script where marked in `src/layouts/BaseLayout.astro`, then name it in the privacy policy.
