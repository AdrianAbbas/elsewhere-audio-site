// Site-wide settings. Every TODO here is listed in TODO.md.

export const SITE = {
  name: 'Elsewhere Audio',
  legalName: 'LJP Records Inc.',
  tagline: "Instruments for places that don't exist.",
  // TODO(domain): replace with the real production domain before launch.
  url: 'https://elsewhere-audio.example',
  // TODO(email): replace once the domain and mailbox exist.
  supportEmail: 'support@[domain]',
  location: 'Ontario, Canada',
  // TODO(social): replace with real profile URLs (or remove entries we don't use).
  social: [
    { label: 'YouTube', href: '#TODO-youtube' },
    { label: 'Instagram', href: '#TODO-instagram' },
    { label: 'Bluesky', href: '#TODO-bluesky' },
  ],
} as const;

// house/fantasy/scifi/threshold are the site's realms; liminal/dungeon/radiant are
// product identities (LIMINAL, DUNGEON CRAWLER, LIGHT SEEKER) used on their own pages.
export type Realm = 'house' | 'fantasy' | 'scifi' | 'threshold' | 'liminal' | 'dungeon' | 'radiant';

export const NAV = [
  { label: 'Worldbuilder', href: '/worldbuilder' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Support', href: '/support' },
] as const;

export const LEGAL_NAV = [
  { label: 'EULA', href: '/legal/eula' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
] as const;
