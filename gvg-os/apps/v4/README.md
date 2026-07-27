# @gvg/v4 — Homepage backup (GitHub V4)

**Purpose:** Frozen snapshot of the GitHub-published marketing homepage (`@gvg/website` / https://amjin358-svg.github.io/gvg/).

Treat this folder as a **read-mostly backup**. New redesigns should go elsewhere (`website`, `v3`, `site/public` stitch OS, etc.) so V4 can be restored or compared without mixing versions.

## What was copied

Full source tree from `gvg-os/apps/website` at backup time (app, components, lib, public, styles), excluding `node_modules`, `.next`, and `out`.

Key homepage entry points:

| Path | Role |
| --- | --- |
| `app/page.tsx` | Route `/` |
| `components/home/HomePage.tsx` | Homepage composition |
| `components/home/HeroCinematic.tsx` | Hero |
| `app/experience/page.tsx` | Interactive Movie |

## Dev (optional)

```bash
# from gvg-os/
npm install
npm run dev:v4
```

http://localhost:3004

## Version map (apps)

| App | Role |
| --- | --- |
| `website` | Live / working cinematic site (evolves) |
| `v3` | Cosmos ↔ trade bridge experiment |
| `v4` | **This backup** — GitHub V4 homepage freeze |
| `portal` | Corporate trade site |
