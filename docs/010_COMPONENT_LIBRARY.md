# 010 — Component Library

Atomic Design hierarchy under `components/`.

## Atoms

| Component | Path | Purpose |
|---|---|---|
| Button | `components/atoms/Button.tsx` | Primary actions (CVA variants) |
| Badge | `components/atoms/Badge.tsx` | Status / tags |
| Container | `components/atoms/Container.tsx` | Max-width page shell |
| SectionHeading | `components/atoms/SectionHeading.tsx` | Section title block |
| FadeIn | `components/atoms/FadeIn.tsx` | Motion wrapper |

## Molecules

| Component | Path | Purpose |
|---|---|---|
| ProductCard | `components/molecules/ProductCard.tsx` | Catalog item |
| StatusBadge | `components/molecules/StatusBadge.tsx` | Domain status mapping |

## Organisms

| Component | Path | Purpose |
|---|---|---|
| SiteHeader | `components/organisms/SiteHeader.tsx` | Global nav |
| SiteFooter | `components/organisms/SiteFooter.tsx` | Global footer |
| PageHero | `components/organisms/PageHero.tsx` | Internal page hero |

## Feature compositions

| Feature | Path |
|---|---|
| HomeHero / HomeSections | `frontend/features/home/` |
| AiAssistantPanel | `frontend/features/ai/` |

## Rules

- No business fetching inside atoms
- Prefer Server Components; mark `"use client"` only for interactivity
- Variants via `class-variance-authority`
- Class merging via `cn()` (`clsx` + `tailwind-merge`)
- Accessibility props required for icon-only controls

## Future (`packages/ui`)

Extract stable primitives into `@gvg/ui` once multi-app consumption is needed.

## Related docs

- [009_UI_DESIGN_SYSTEM.md](./009_UI_DESIGN_SYSTEM.md)
- [011_DESIGN_TOKEN.md](./011_DESIGN_TOKEN.md)
