# AGENTS.md

## Cursor Cloud specific instructions

GVG Global Trade OS is a single Next.js 15 (App Router) + React 19 + TypeScript app. There is one runtime service to run for development.

- Node 22 is required (matches CI in `.github/workflows/ci.yml`). It is preinstalled in the cloud environment.
- Dependencies are installed by the startup update script (`npm ci`); you do not need to reinstall on session start.
- Standard commands live in `package.json` scripts and `README.md`; use those rather than duplicating here:
  - Dev server: `npm run dev` (Turbopack, serves on http://localhost:3000). Run it in a tmux session for long-running use.
  - Lint: `npm run lint` · Tests: `npm run test` (Node test runner via `tsx`) · Build: `npm run build`.
- Non-obvious notes:
  - This is currently a Phase 0 scaffold: all trade data is in-memory mock data (`frontend/data/mock/catalog.ts`). There is no database, auth, or external API to configure — no `.env` is needed for local dev.
  - Supabase / OpenAI / Redis are documented in `docs/` as future phases but are NOT wired up; do not expect them to run.
  - The only real API route is `GET /api/health`. The `/ai` Procurement Assistant is a fully client-side heuristic over the mock catalog (no OpenAI calls), so it works offline.
  - The app pulls hero/category imagery from `images.unsplash.com` and Google Fonts, so image/font rendering needs outbound network; core functionality still works without it.
