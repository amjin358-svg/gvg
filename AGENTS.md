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
- Tailwind v4 (`@import "tailwindcss"`) auto-scans **all tracked files** (including `.md`, and static Stitch design artifacts under `site/` and `.stitch/designs/`). A Tailwind arbitrary background-image utility whose URL is a bare, non-existent module name (a word rather than a real path/URL) makes Turbopack try to resolve that word as a module and 500s every route. Fix at the source (remove/replace the stray class) or scope Tailwind with `@source not "../site"; @source not "../.stitch";` in `styles/globals.css`. Important: do not paste the literal offending arbitrary class token into any scanned file (including docs), or Tailwind will regenerate the broken rule.
- Root `tsconfig.json` includes `**/*.ts`/`**/*.tsx` (only `node_modules`, `docker`, `tests/e2e` excluded), so `npm run build`'s type-check also compiles `gvg-os/apps/**`. Broken imports there will fail the root build even though they are not part of the main app.

### MCP servers
- Configured in `.mcp.json` (CLI agents) and `.cursor/mcp.example.json` (Cursor template; copy to the git-ignored `.cursor/mcp.json` to activate): `stitch` (needs `STITCH_API_KEY`), `figma` (remote `https://mcp.figma.com/mcp`), `playwright` (browser automation via `npx @playwright/mcp`).
- `figma` uses OAuth — it must be authenticated once from the **Cursor desktop IDE** (`/add-plugin figma` or Connect in Settings → Tools & MCP). Cloud VMs can't complete the OAuth flow, so its tools show as `needsAuth` until then.
- `playwright` needs a browser binary present. If a tool call errors with `Browser "chrome-for-testing" is not installed`, run `npx playwright install --with-deps chromium` and/or `npx @playwright/mcp install-browser chrome-for-testing` once (binaries cache under `~/.cache/ms-playwright`). It writes runtime output to a `.playwright-mcp/` dir in the workspace.
