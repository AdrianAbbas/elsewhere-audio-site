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
  build: { format: 'file' },
  integrations: [
    sitemap({
      // Internal pages never go in the sitemap.
      filter: (page) => !page.includes('/styleguide') && !page.includes('/404'),
    }),
  ],
});
