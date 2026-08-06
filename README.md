# Umut Yıldız Portfolio

Personal portfolio rebuilt with [Astro](https://astro.build).

## Pages

- Home
- About
- Projects
- Blog (Markdown content collection)
- Contact

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy

The site is a static Astro build (`dist/`) and works on **Vercel** or **Netlify**.

### Vercel

1. Import the GitHub repo in Vercel
2. Framework preset: Astro (or leave defaults)
3. Build command: `npm run build`
4. Output directory: `dist`

`vercel.json` is included for explicit static output settings.

### Netlify

1. Import the GitHub repo in Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

`netlify.toml` is included with the same settings.

Optional: set `site` in `astro.config.mjs` to your production domain for accurate canonical URLs.

## Blog publishing (Telegram bot)

Blog posts are Markdown files in `src/content/blog/`. Astro’s content collection reads them at build time, so anything written there automatically appears on `/blog` after deploy.

### Frontmatter contract

```md
---
title: "Post title"
excerpt: "One-sentence summary shown on the index."
date: 2026-08-06
tags: ["Engineering", "AI"]
readTime: "4 min read"
source: "telegram-bot"   # optional
---

Markdown body…
```

### Option A — GitHub Action (recommended)

When you approve a blog draft in Telegram, have the bot fire a GitHub `repository_dispatch`:

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/Peacefulcatt/react_portfolio/dispatches \
  -d '{
    "event_type": "publish-blog",
    "client_payload": {
      "slug": "shipped-feature-x",
      "title": "Shipped Feature X",
      "excerpt": "What changed and why it matters.",
      "date": "2026-08-06",
      "tags": ["Engineering"],
      "readTime": "4 min read",
      "body": "## Context\n\n…",
      "source": "telegram-bot"
    }
  }'
```

Workflow: `.github/workflows/publish-blog.yml`

1. Validates the payload
2. Writes `src/content/blog/<slug>.md`
3. Commits and pushes to the default branch
4. Vercel/Netlify rebuilds → post shows on `/blog/<slug>`

Token needs `repo` scope (and workflow permissions enabled for Actions).

### Option B — Local / bot script

```bash
npm run publish:blog -- scripts/fixtures/sample-blog-post.json
# or
echo '{"title":"…","excerpt":"…","tags":["AI"],"body":"…"}' | npm run publish:blog -- --stdin
```

Then commit the generated Markdown (or let the Action do it).

### Payload fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Post title |
| `excerpt` | yes | Card summary on `/blog` |
| `body` | yes | Markdown **without** frontmatter |
| `tags` | yes | Non-empty string array |
| `slug` | no | Derived from title if omitted |
| `date` | no | Defaults to today (`YYYY-MM-DD`) |
| `readTime` | no | Estimated from word count if omitted |
| `source` | no | e.g. `telegram-bot` |

CV / LinkedIn drafts from the bot stay in Telegram (or wherever you store them). Only approved **blog** payloads should hit this repo.
