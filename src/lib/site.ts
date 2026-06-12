// Site-wide metadata. The production origin lives in astro.config.mjs
// (`site`) and is read everywhere via Astro.site — never duplicate it here.
export const SITE = {
  name: 'Lewis O’Donnell',
  tagline: 'I build time-series foundation models for fusion.',
  title: 'Lewis O’Donnell — machine learning for fusion',
  description:
    'Lewis O’Donnell is a machine learning PhD student at UCL building time-series foundation models for nuclear fusion and plasma diagnostics.',
  email: 'lodonnell533@gmail.com', // [FILL: confirm, or swap for your UCL address]
};

// Profile links. Entries with a null URL are omitted from the page until
// they are filled in.
export const LINKS: { label: string; url: string | null }[] = [
  { label: 'GitHub', url: 'https://github.com/lewisodonnell' },
  { label: 'Google Scholar', url: null }, // [FILL: Google Scholar profile URL]
  { label: 'LinkedIn', url: null }, // [FILL: LinkedIn profile URL]
];
