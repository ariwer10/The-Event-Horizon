# The Event Horizon

The website for The Event Horizon, a student space publication at the University of Maryland.

## Posting an article (no code needed)

1. Go to **https://app.pagescms.org** and sign in with GitHub.
2. Open **The-Event-Horizon**, then **Articles → Add an entry**.
3. Fill in the headline, section, author, date and the article itself. A cover image is optional.
4. Click **Save**. The live site updates on its own in about a minute.

- **Top story:** turn on "Make this the top story on the front page". The newest story with that switch on leads the front page. If none has it, the newest story leads.
- **Not ready yet?** Turn on "Draft" and the story stays hidden until you turn it off.
- **About page** and **Site settings** (masthead text, join link, contact, section descriptions) are edited the same way.

## Custom domain later

1. Buy the domain (Cloudflare Registrar is easiest).
2. In Cloudflare: Workers & Pages → this project → Custom domains → Set up a domain.
3. In the editor: Site settings → Site address → your new address → Save.

## Technical

Built with [Astro](https://astro.build), hosted on Cloudflare Pages, edited with [Pages CMS](https://pagescms.org).
Build command `npm run build`, output folder `dist`. Articles live in `src/content/articles`, images in `public/images/uploads`.
