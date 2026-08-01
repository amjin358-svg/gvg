# 009 — UI Design System

## Brand

- **Name:** Global Vista Group (GVG)
- **Product:** Global Trade OS
- **Personality:** Confident, global, operationally precise — not playful startup kitsch

## Visual direction

- Deep ink navy surfaces for heroes
- Teal accent for primary actions
- Copper as secondary accent (sparingly)
- Mist/surface neutrals for content regions
- Atmospheric gradients + subtle grid (not flat single-color pages)
- Full-bleed heroes on marketing surfaces
- No card clutter in heroes; cards only when interaction needs a container

## Typography

| Role | Font |
|---|---|
| Display / brand | Outfit |
| Body / UI | Source Sans 3 |

Avoid default AI stacks (Inter, Roboto, Arial, system-only).

## Motion

Ship intentional motion with Framer Motion:

1. Hero entrance (brand → headline → CTA)
2. Section fade-in on scroll
3. Ambient hero glow / drift (respect `prefers-reduced-motion`)

## Accessibility

- WCAG AA contrast
- Visible focus rings (`--color-accent`)
- Semantic landmarks (`header`, `main`, `footer`)
- Do not convey status by color alone (use badges + text)

## Layout rules

- One composition in first viewport
- Brand is hero-level signal
- One job per section
- Mobile-first responsive breakpoints

## Related docs

- [010_COMPONENT_LIBRARY.md](./010_COMPONENT_LIBRARY.md)
- [011_DESIGN_TOKEN.md](./011_DESIGN_TOKEN.md)
- [012_FRONTEND_STANDARD.md](./012_FRONTEND_STANDARD.md)
