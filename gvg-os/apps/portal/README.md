# @gvg/portal — Feature pages

Separate app for Global Vista Group functional pages. Kept apart from the cinematic marketing site (`@gvg/website`).

## Modules

| Route | Purpose |
| --- | --- |
| `/` | Portal hub |
| `/marketplace` | Product discovery & sourcing |
| `/ai` | AI services |
| `/business` | Company / enterprise |
| `/investment` | Capital & growth |
| `/real-estate` | Property desk |
| `/dashboard` | Ops dashboard entry |

## Dev

```bash
# from gvg-os/
npm run dev:portal
```

Open http://localhost:3001

Cinematic site stays on http://localhost:3000 (`npm run dev:website`).

## Production (GitHub Pages)

Built with `GITHUB_PAGES=true` → basePath `/gvg/portal`, then nested into the website static export as `out/portal/`.
