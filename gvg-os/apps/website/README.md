# @gvg/website — Interactive Movie

Cinematic Interactive Movie scaffold for Global Vista Group.

## Scene flow

1. **Logo** — GVG fade/scale → punch → fade out (GSAP)
2. **Earth** — R3F `Earth` + `Stars`, ScrollTrigger spin `+=3000`
3. **Global** — USA → Taiwan → Japan → Vietnam → Europe · Golden Arc → Glow → Pulse
4. **Marketplace** — FloatingObjects + cards `whileHover` 3D tilt
5. **AI** — Particles → Numbers → Charts → Connections (gold particle language, noise `0.02`)
6–8. Business / Investment / Real Estate stubs
9. Ending

**MouseGlow**: fixed `#D4AF37` radial, `blur(80px)`, `pointer-events-none`.

## Routes

| Path | Role |
| --- | --- |
| `/` | Marketing homepage shell |
| `/experience` | Interactive Movie |
| `/marketplace` `/ai` `/business` `/investment` `/real-estate` `/dashboard` | Stubs |

## Dev

```bash
npm run dev -w @gvg/website
```

Open http://localhost:3000 — Watch Movie → `/experience`
