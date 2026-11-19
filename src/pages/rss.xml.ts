import rss from '@astrojs/rss';
import { getArticles } from '../lib/articles';
import { site } from '../lib/site';

export async function GET() {
  const items = (await getArticles()).slice(0, 50);
  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: items.map((a) => ({
      title: a.data.title,
      description: a.data.dek || undefined,
      pubDate: a.when,
      link: a.href,
      categories: [a.sectionName],
    })),
  });
}
