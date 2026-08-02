# HOME-V6.0 — Homepage FX Freeze

Frozen restore point for the **root cinematic homepage** (`HeroExperience`).

This is separate from Interactive Movie freezes:

| Freeze | Surface |
|--------|---------|
| IM-V4.0 (`apps/v4`) | Interactive Movie pipeline |
| IM-V5.0 (`apps/v5`) | Interactive Movie pipeline |
| **HOME-V6.0 (`apps/v6`)** | **Homepage FX** (galaxy / warp / globe) |

## Run

```bash
# from gvg-os/
npm run dev:v6
# http://localhost:3006
```

## Build

```bash
npm run build:v6
# or static Pages export:
GITHUB_PAGES=true npm run build -w @gvg/v6
```

## Restore

Copy `frontend/features/experience` (and supporting Button / constants / utils) back into the target app, or point the homepage at this package’s `app/page.tsx` pattern.
