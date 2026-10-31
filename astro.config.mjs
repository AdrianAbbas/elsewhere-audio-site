// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

// Static output: every page is pre-rendered to HTML at build time.
// Cloudflare Pages serves the `dist/` folder directly (see README).
export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'never',
  // Inline the (small) CSS into each page so it never blocks the first paint.
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // Internal pages never go in the sitemap.
      filter: (page) => !['/styleguide', '/404', '/account'].some((p) => page.includes(p)),
    }),
  ],
});
