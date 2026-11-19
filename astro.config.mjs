// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

// The public address lives in src/data/settings.json ("siteUrl") so it can be
// changed from the editor when you move to a custom domain.
let siteUrl = 'https://the-event-horizon.pages.dev';
try {
  const s = JSON.parse(readFileSync(new URL('./src/data/settings.json', import.meta.url), 'utf8'));
  if (typeof s.siteUrl === 'string' && /^https?:\/\//.test(s.siteUrl.trim())) siteUrl = s.siteUrl.trim();
} catch {}

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: { smartypants: true },
});
