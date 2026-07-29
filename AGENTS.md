# AGENTS.md

## Cursor Cloud specific instructions

### Services / layout
- The product is the **root Next.js 15 app** ("GVG Global Trade OS"). This is what the README, `docs/`, and CI (`.github/workflows/ci.yml`) target. Routes live under `app/` (see `README.md` module table).
- `gvg-os/` is a **separate, secondary npm-workspaces monorepo** of design-iteration apps (`website`, `portal`, `v3`–`v5`). It is not covered by root CI and is not required to run the main product.

### Run / lint / test / build (root app)
- Node 22 + npm (matches CI). Standard scripts are in `package.json`: `npm run dev` (Turbopack, http://localhost:3000), `npm run lint`, `npm run test`, `npm run build`. See `README.md` for the full script table.
- `npm run dev` needs no env vars; the app runs on mock data (`frontend/data/mock`). `.env` / `STITCH_API_KEY` is only for the optional Stitch design tooling, not for running the app.

### Non-obvious gotchas
- Do **not** run `npm run build` while `npm run dev` is running. Both use Turbopack and write to `.next`; running them together corrupts `.next` (`ENOENT ... _buildManifest.js.tmp`) and makes every route 500. Stop the dev server first, and `rm -rf .next` to recover.
- Tailwind v4 (`@import "tailwindcss"`) auto-scans **all tracked files**, including static Stitch design artifacts under `site/` and `.stitch/designs/`. An arbitrary class like `bg-[url('placeholder')]` in those HTML files makes Turbopack try to resolve `placeholder` as a module and 500s every route. Fix at the source (remove the stray class) or scope Tailwind with `@source not "../site"; @source not "../.stitch";` in `styles/globals.css`.
- Root `tsconfig.json` includes `**/*.ts`/`**/*.tsx` (only `node_modules`, `docker`, `tests/e2e` excluded), so `npm run build`'s type-check also compiles `gvg-os/apps/**`. Broken imports there will fail the root build even though they are not part of the main app.
