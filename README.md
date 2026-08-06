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
