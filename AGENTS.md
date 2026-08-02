# AGENTS.md

## Cursor Cloud specific instructions

### Services / layout
- The product is the **root Next.js 15 app** ("GVG Global Trade OS" — App Router, React 19, TypeScript). This is what the README, `docs/`, and CI (`.github/workflows/ci.yml`) target. Routes live under `app/` (see `README.md` module table). For day-to-day cloud work there is one runtime service to run: the root app.
- `gvg-os/` is a **separate, secondary npm-workspaces monorepo** of design-iteration apps (`website`, `portal`, `v3`–`v5`, `trade-os`, etc.). It is not covered by root CI and is not required to run the main product.

### Run / lint / test / build (root app)
- Node 22 is required (matches CI). It is preinstalled in the cloud environment. Dependencies are installed by the startup update script (`npm ci`); you do not need to reinstall on session start.
- Standard commands live in `package.json` scripts and `README.md`; use those rather than duplicating here:
  - Dev server: `npm run dev` (Turbopack, http://localhost:3000). Run it in a tmux session for long-running use.
  - Lint: `npm run lint` · Tests: `npm run test` (Node test runner via `tsx`) · Build: `npm run build`.
- `npm run dev` needs no env vars; the app runs on mock data (`frontend/data/mock`). `.env` / `STITCH_API_KEY` is only for the optional Stitch design tooling, not for running the app.

### Non-obvious gotchas
- This is currently a Phase 0 scaffold: all trade data is in-memory mock data (`frontend/data/mock/catalog.ts` and related mocks). There is no database, auth, or external API to configure for local dev.
- Supabase / OpenAI / Redis are documented in `docs/` as future phases but are NOT wired up; do not expect them to run.
- The only real API route is `GET /api/health`. The `/ai` Procurement Assistant is a fully client-side heuristic over the mock catalog (no OpenAI calls), so it works offline.
- The app pulls hero/category imagery from `images.unsplash.com` and Google Fonts, so image/font rendering needs outbound network; core functionality still works without it.
- Do **not** run `npm run build` while `npm run dev` is running. Both use Turbopack and write to `.next`; running them together corrupts `.next` (`ENOENT ... _buildManifest.js.tmp`) and makes every route 500. Stop the dev server first, and `rm -rf .next` to recover.
- Tailwind v4 (`@import "tailwindcss"`) auto-scans **all tracked files** (including `.md`, and static Stitch design artifacts under `site/` and `.stitch/designs/`). A Tailwind arbitrary background-image utility whose URL is a bare, non-existent module name (a word rather than a real path/URL) makes Turbopack try to resolve that word as a module and 500s every route. Fix at the source (remove/replace the stray class) or scope Tailwind with `@source not "../site"; @source not "../.stitch";` in `styles/globals.css`. Important: do not paste the literal offending arbitrary class token into any scanned file (including docs), or Tailwind will regenerate the broken rule.
- Root `tsconfig.json` includes `**/*.ts`/`**/*.tsx` (only `node_modules`, `docker`, `tests/e2e` excluded), so `npm run build`'s type-check also compiles `gvg-os/apps/**`. Broken imports there will fail the root build even though they are not part of the main app.

### MCP servers
- Configured in `.mcp.json` (CLI agents) and `.cursor/mcp.example.json` (Cursor template; copy to the git-ignored `.cursor/mcp.json` to activate): `stitch` (needs `STITCH_API_KEY`), `figma` (remote `https://mcp.figma.com/mcp`), `playwright` (browser automation via `npx @playwright/mcp`), `canva` (remote `https://mcp.canva.com/mcp`, for AI design/banner generation, export, autofill).
- `figma` and `canva` use OAuth — each must be authenticated once from the **Cursor desktop IDE** (Connect in Settings → Tools & MCP; for Figma also `/add-plugin figma`). Cloud VMs can't complete the OAuth flow, so their tools show as `needsAuth` until then (the endpoints return HTTP 401 without a token).
- `playwright` needs a browser binary present. If a tool call errors with `Browser "chrome-for-testing" is not installed`, run `npx playwright install --with-deps chromium` and/or `npx @playwright/mcp install-browser chrome-for-testing` once (binaries cache under `~/.cache/ms-playwright`). It writes runtime output to a `.playwright-mcp/` dir in the workspace.
