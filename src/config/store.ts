// Store configuration: the ONE place to connect Moonbase.
//
// Payments, licence keys and downloads will run through Moonbase's embedded
// storefront. Nothing here talks to Moonbase yet. To go live:
//   1. Fill in `moonbaseAccountUrl` and the product IDs below.
//   2. Uncomment the Moonbase <script> in src/layouts/BaseLayout.astro.
//   3. Set `enabled: true`.
// The buttons in src/components/store/ read from this file, and
// src/scripts/store.ts calls Moonbase when they are clicked.

export const STORE = {
  // Leave false until Moonbase is set up. While false, store buttons show a
  // polite "store opens soon" message instead of calling Moonbase.
  enabled: false,

  // TODO(moonbase): your Moonbase storefront URL, e.g. https://windward.moonbase.sh
  moonbaseAccountUrl: 'https://TODO-account.moonbase.sh',

  currency: 'USD',

  products: {
    worldbuilder: {
      // TODO(moonbase): real Moonbase product ID for WORLDBUILDER.
      id: 'TODO-worldbuilder-product-id',
      name: 'WORLDBUILDER',
      // TODO(price): confirm before launch.
      price: 89,
      introPrice: 59,
    },
    worldbuilderLite: {
      // TODO(moonbase): real Moonbase product ID for WORLDBUILDER Lite (free).
      id: 'TODO-worldbuilder-lite-product-id',
      name: 'WORLDBUILDER Lite',
      price: 0,
    },
  },
} as const;

export type ProductKey = keyof typeof STORE.products;

export function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  return `US$${amount}`;
}
