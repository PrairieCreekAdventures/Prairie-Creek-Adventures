# Prairie Creek Farms

A refined, editorial-style blog built with Astro and Decap CMS, deployed on Netlify.

## Quick start

**To deploy:** see `DEPLOY.md` for a step-by-step guide. No coding required.

**To run locally** (optional, for developers):
```
npm install
npm run dev
```
Then open http://localhost:4321

**To write content:** after deployment, go to `yourdomain.com/admin` and log in.

## What's in the box

- **3 starter blog posts** (journal posts)
- **6 starter recipes** across autumn, winter, everyday, and keeping categories
- **4 seasons** (spring, summer, autumn, winter) — autumn is set as the current issue
- **Full admin panel** for writing posts, recipes, and managing seasons
- **Custom editorial design** preserved from the original Claude build brief
- **Newsletter form** that works via Netlify Forms (submissions go to your Netlify dashboard)

## File overview

| File | Purpose |
|------|---------|
| `src/pages/` | Every URL on your site |
| `src/content/` | Your posts, recipes, seasons (markdown files) |
| `src/styles/global.css` | The entire design system |
| `public/admin/config.yml` | Admin panel fields |
| `netlify.toml` | Build settings |

## Making content changes

Once deployed, you can edit everything from `yourdomain.com/admin`. You should rarely need to touch the code.

If you do want to change the design or layout, the relevant files are:
- **Design tokens (colors, fonts):** top of `src/styles/global.css`
- **Homepage sections:** `src/pages/index.astro`
- **Header/footer:** `src/layouts/BaseLayout.astro`

## Support

See `DEPLOY.md` → Troubleshooting section for common issues.
