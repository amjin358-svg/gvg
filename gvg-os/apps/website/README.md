# @gvg/website — Interactive Movie

Cinematic marketing experience for Global Vista Group.

Feature modules (Marketplace, AI, Business, Investment, Real Estate, Dashboard) live in a **separate app**: [`../portal`](../portal) (`@gvg/portal`). Do not add those routes back into this package.

## Scenes

1. Logo (GSAP)
2. Earth (R3F + ScrollTrigger spin)
3. Global hops USA → Taiwan → Japan → Vietnam → Europe (Golden Arc → Glow → Pulse)
4. Marketplace (FloatingObjects + hover tilt)
5. AI (Particles → Numbers → Charts → Connections)
6–8. Business / Investment / Real Estate stubs
9. Ending

## Dev

```bash
npm run dev -w @gvg/website
```

Open http://localhost:3000

Portal (feature pages): `npm run dev:portal` → http://localhost:3001
