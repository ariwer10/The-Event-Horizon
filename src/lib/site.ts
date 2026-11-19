import raw from '../data/settings.json';

type Raw = Record<string, any>;
const s: Raw = (raw ?? {}) as Raw;
const str = (v: unknown, fallback = '') => (typeof v === 'string' && v.trim() ? v.trim() : fallback);

export const SECTIONS = [
  { slug: 'commercial', name: 'Commercial' },
  { slug: 'governmental', name: 'Governmental' },
  { slug: 'international', name: 'International' },
  { slug: 'astronomy', name: 'Astronomy' },
  { slug: 'defense-intelligence', name: 'Defense & Intelligence' },
  { slug: 'space-economy', name: 'Space Economy' },
] as const;

export type SectionSlug = (typeof SECTIONS)[number]['slug'];

const desc: Raw = (s.sectionDescriptions ?? {}) as Raw;

export const site = {
  title: 'The Event Horizon',
  url: str(s.siteUrl, 'https://the-event-horizon.pages.dev').replace(/\/+$/, ''),
  location: str(s.location, 'College Park, MD'),
  tagline: str(s.tagline, 'Weekly · Space · Policy · Markets'),
  volume: str(s.volume, 'Vol. I'),
  description: str(
    s.description,
    'A student space publication at the University of Maryland.'
  ),
  joinUrl: str(s.joinUrl),
  email: str(s.email),
  instagram: str(s.instagram),
};

export const sections = SECTIONS.map((sec, i) => ({
  ...sec,
  number: String(i + 1).padStart(2, '0'),
  description: str(desc[sec.slug]),
  href: `/section/${sec.slug}/`,
}));

export const sectionBySlug = (slug: string | undefined) =>
  sections.find((x) => x.slug === slug);

export function formatDate(d: Date | undefined, style: 'long' | 'short' = 'long') {
  if (!d || isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  });
}

export function isoDate(d: Date | undefined) {
  if (!d || isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

export function absoluteUrl(path: string | undefined) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return site.url + (path.startsWith('/') ? path : '/' + path);
}

export function instagramUrl(handle: string) {
  if (!handle) return '';
  if (/^https?:\/\//i.test(handle)) return handle;
  return `https://instagram.com/${handle.replace(/^@/, '')}`;
}
