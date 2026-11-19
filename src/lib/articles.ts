import { getCollection, type CollectionEntry } from 'astro:content';
import { sectionBySlug } from './site';

export type Article = CollectionEntry<'articles'> & {
  when: Date;
  readMinutes: number;
  href: string;
  sectionName: string;
  sectionHref: string;
};

const FALLBACK = new Date('2026-01-01T00:00:00Z');

function dateFromId(id: string): Date | undefined {
  const m = id.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return undefined;
  const d = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
  return isNaN(d.getTime()) ? undefined : d;
}

function minutes(body: string | undefined) {
  const words = (body ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`\[\]()!-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

let cache: Article[] | null = null;

/** Published articles, newest first. Drafts and entries without a headline are skipped. */
export async function getArticles(): Promise<Article[]> {
  if (cache) return cache;
  const all = await getCollection('articles');
  cache = all
    .filter((a) => !a.data.draft && a.data.title)
    .map((a) => {
      const sec = sectionBySlug(a.data.section);
      return Object.assign(a, {
        when: a.data.date ?? dateFromId(a.id) ?? FALLBACK,
        readMinutes: minutes(a.body),
        href: `/articles/${a.id}/`,
        sectionName: sec?.name ?? 'News',
        sectionHref: sec?.href ?? '/',
      });
    })
    .sort((a, b) => b.when.getTime() - a.when.getTime() || a.data.title.localeCompare(b.data.title));
  return cache;
}

/** The home-page lead: newest article marked "featured", otherwise the newest article. */
export function pickLead(list: Article[]) {
  return list.find((a) => a.data.featured) ?? list[0];
}
