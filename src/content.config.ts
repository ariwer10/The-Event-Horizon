import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every field is forgiving: a missing or oddly-formatted value from the editor
// falls back to something sensible instead of failing the whole site build.
const text = z.preprocess(
  (v) => (v === null || v === undefined ? '' : typeof v === 'string' ? v.trim() : String(v)),
  z.string()
);

const flag = z.preprocess((v) => v === true || v === 'true', z.boolean());

const date = z.preprocess((v) => {
  if (v instanceof Date) return isNaN(v.getTime()) ? undefined : v;
  if (typeof v === 'string' || typeof v === 'number') {
    const s = String(v).trim();
    if (!s) return undefined;
    // Treat a bare YYYY-MM-DD as that calendar day (UTC) so it never shifts.
    const d = /^\d{4}-\d{2}-\d{2}$/.test(s) ? new Date(s + 'T00:00:00Z') : new Date(s);
    return isNaN(d.getTime()) ? undefined : d;
  }
  return undefined;
}, z.date().optional());

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,markdown}', base: './src/content/articles' }),
  schema: z
    .object({
      title: text,
      dek: text.optional().default(''),
      section: text.optional().default(''),
      author: text.optional().default(''),
      date: date,
      image: text.optional().default(''),
      imageCaption: text.optional().default(''),
      featured: flag.optional().default(false),
      draft: flag.optional().default(false),
    })
    .passthrough(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,markdown}', base: './src/content/pages' }),
  schema: z
    .object({
      title: text.optional().default(''),
      mission: text.optional().default(''),
      staff: z
        .preprocess(
          (v) => (Array.isArray(v) ? v.filter((x) => x && typeof x === 'object') : []),
          z.array(
            z
              .object({
                name: text.optional().default(''),
                role: text.optional().default(''),
                photo: text.optional().default(''),
                bio: text.optional().default(''),
              })
              .passthrough()
          )
        )
        .optional()
        .default([]),
    })
    .passthrough(),
});

export const collections = { articles, pages };
