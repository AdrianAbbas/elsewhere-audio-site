# TODO: placeholders to replace before launch

Every placeholder in the code carries a `TODO(tag)` comment. Search for a tag
(for example `grep -rn "TODO(moonbase)" src public`) to find each one.
This list grows as each page is built.

## Domain and contact
- [x] Domain: windwardaudio.ca (`SITE.url` in `src/config/site.ts`, `public/robots.txt`).
- [x] Support email: general@windwardaudio.ca (`src/config/site.ts`).
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
- [ ] `TODO(images)`: the home page's featured WORLDBUILDER frame still shows the pixel-planet placeholder (`ScreenshotFrame` with no image). The WORLDBUILDER page now uses real captures.
- [ ] `TODO(images)`: the painted atmosphere scenes (`src/assets/art/atmosphere-*.webp`) now only stand in on About (the maker's photo) and the 404 page.
- [ ] `TODO(og)`: `public/og/default.jpg` is a screenshot of the threshold hero with the brand line. Replace with designed Open Graph images (1200×630), ideally one per page.

## WORLDBUILDER page (`src/data/worldbuilder.ts`)
- [ ] `TODO(video)`: trailer YouTube ID (`TRAILER.youtubeId`). Until set, the trailer shows "coming soon".
- [ ] `TODO(specs)`: confirm system requirements, especially tested hosts and installed size.
- [ ] `TODO(copy)`: what WORLDBUILDER Lite includes (nothing in the plugin defines a Lite edition yet).
- [ ] `TODO(copy)`: feature wording and FAQ answers (facts follow the plugin's README).
- [x] Real WORLDBUILDER screenshots (from the plugin repo's own pixel-interface captures, in `public/images/worldbuilder/`).
- [ ] Decide: the brief said 27 Places; the plugin has 26 (the 27th icon is the empty slot). The site says 26.

## About page (`src/pages/about.astro`)
- [ ] `TODO(copy)`: the story, and who makes it, in your own words. Your name is left as `[your name]` on purpose.
- [ ] `TODO(images)`: a photograph of the maker or the recording space (a painted forest stands in).
- [ ] `TODO(copy)`: anything more to say about LJP Records.

## Products page
- [ ] `TODO(images)`: WORLDBUILDER key art for the product card (the painted horizon stands in).
- [ ] `TODO(copy)`: products intro.

## LIMINAL, DUNGEON CRAWLER and LIGHT SEEKER (`src/data/products.ts`)
- [ ] Decide: the original brief kept upcoming worlds unnamed. They are now named on the home page, /products and their own pages (the repos are public). To go back to unnamed teasers, remove them from `UPCOMING`.
- [ ] `TODO(release)`: release dates (all say "Coming 2027"), prices, what each edition includes, and Moonbase product IDs (add to `src/config/store.ts` and Buy buttons when they go on sale).
- [ ] `TODO(copy)`: product copy is drafted from each repo's README and docs; read it through.
- [ ] `TODO(images)`: product images are the repos' own renders and interface captures (sources in `src/assets/products/SOURCES.md`). Replace with final key art, and new captures when the interfaces change.
- [ ] Specs say "macOS 10.15 or later, Apple Silicon or Intel; AU and VST3", from the repos' build settings. Confirm before release.

## Support, account and legal
- [ ] `TODO(copy)`: confirm every support answer (`src/pages/support.astro`): installer steps, activations per licence, moving a licence, offline activation steps, refund policy, reply time.
- [ ] In the plugin repos (not this one): change the manufacturer from "Veil Audio" to "Windward Audio" in all four (WORLDBUILDER, LIMINAL, DUNGEON CRAWLER, LIGHT SEEKER). The support steps already say "AU Instruments → Windward Audio → …".
- [ ] `TODO(moonbase)`: embed the customer portal on /account (`mountAccountPortal` in `src/scripts/store.ts`).
- [ ] `TODO(legal)`: have a lawyer review the six legal pages (`src/pages/legal/`): Terms, Privacy, Cookies, Refunds, EULA, Licences. They are full drafts now, still marked "DRAFT – to be replaced after legal review". Update Privacy and Cookies when analytics, the newsletter and Moonbase are connected.
- [ ] `TODO(legal)`: the business mailing address (`mailingAddress` in `src/config/site.ts`). Ontario's Consumer Protection Act asks online sellers to show it before a sale. It appears on Terms and Support once filled in.
- [ ] `TODO(legal)`: confirm the refund policy (drafted as 14 days, no questions asked, in `src/pages/legal/refunds.astro`, the support page and the WORLDBUILDER FAQ).
- [ ] `TODO(legal)`: EULA: the number of computers per licence (drafted as [three]) and the update promise (drafted as free updates within a major version).
- [ ] `TODO(moonbase)`: before the store opens, confirm whether Moonbase is merchant of record, what it collects, and which cookies its storefront sets. Link its privacy policy from Privacy. If it sets cookies that are not strictly necessary, list them on /legal/cookies and ask for consent before they are set (no banner is needed today: the site sets none).
- [ ] `TODO(price)`: the date the WORLDBUILDER introductory price ends (pricing card on `/worldbuilder`). The site no longer shows the regular price struck through, since nothing has sold at it yet.

## Copy
- [ ] `TODO(copy)`: home: hero sub-line, intro paragraphs, WORLDBUILDER summary (`src/pages/index.astro`).
- [ ] `TODO(copy)`: sign-up blurb (`src/components/SignupForm.astro`).

## Sign-up
- [ ] `TODO(signup)`: connect the email sign-up to a privacy-friendly newsletter provider (`src/components/SignupForm.astro`). It currently sends nothing. The form already states consent in the way Canada's anti-spam law (CASL) expects: who is sending, why, and that you can unsubscribe. The provider must put an unsubscribe link and our contact details in every email, and keep a record of when each person signed up. Then name the provider in the privacy policy.

## Analytics
- [ ] `TODO(analytics)`: choose a privacy-friendly, cookieless provider and paste its script where marked in `src/layouts/BaseLayout.astro`, then name it in the privacy policy.
