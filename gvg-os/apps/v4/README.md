# @gvg/v4 — GitHub V4 (live restore)

**Purpose:** Frozen V4 marketing homepage + Interactive Movie pipeline.

This package is the **live GitHub Pages deploy target** again (`npm run build:pages` → `apps/v4/out`).

Later experiments stay elsewhere so they do not overwrite V4:

| App | Role |
| --- | --- |
| `v4` | **Live** V4 homepage + IM-V4 experience |
| `website` | Later ScrollControls / cinematic WIP |
| `v5` | IM-V5 freeze |
| `v6` / `website` `cinematic-v6` | Homepage FX / V6 WIP |
| `portal` | Corporate trade site |

## Entry points

| Path | Role |
| --- | --- |
| `app/page.tsx` | Route `/` — `HomePage` |
| `components/home/HeroCinematic.tsx` | Hero |
| `app/experience/page.tsx` | Interactive Movie IM-V4 |

## Dev

```bash
# from gvg-os/
npm install
npm run dev:v4
```

http://localhost:3004

## Deploy

```bash
npm run build:pages
# publishes apps/v4/out (+ nested portal/os) to gh-pages
```
