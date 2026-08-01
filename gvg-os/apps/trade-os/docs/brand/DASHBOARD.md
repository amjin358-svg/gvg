# Dashboard — Brand application

**Surface:** Admin / Analytics / Portal operational views  
**Routes:** `/admin`, `/analytics`, `/portal/*`, ops tables  

---

## 1. Purpose

Dashboards must feel like the same GVG system as the marketing site — ink/teal precision — without turning into a neon “AI dashboard” template.

## 2. Layout anatomy

```
┌ App bar (ink) · mark · product · user/role ┐
├ Sidebar (optional) · module nav            │
│                                            │
│  Page title + one-line purpose             │
│  KPI row (max 4)                           │
│  Primary table / worklist                  │
│                                            │
└ Utility footer / status                    ┘
```

## 3. Visual rules

| Element | Spec |
|---|---|
| App bar | Ink `#0A1628`, teal soft labels |
| Page bg | Surface `#F7FAFB` |
| KPI blocks | No heavy cards; top border + large Outfit numeral |
| Tables | Hairline `#D5DEE7`, status via `StatusBadge` |
| Primary button | Teal `#1A7A6D` |
| Danger | Use sparingly; not brand copper |

## 4. Density

- Ops users need scan speed: 14px body, clear row height  
- Avoid multi-layer shadows and glow  
- One primary action per view  

## 5. Role-aware chrome

Show only modules allowed by `docs/008_PERMISSION.md`.  
Admin dashboard lists role matrix + module registry (current `/admin`).

## 6. KPI examples

- Open RFQs  
- Active orders  
- Shipments in motion  
- Avg warehouse utilization  

## 7. Component mapping

- `PageHero` for module headers inside ops (compact)  
- `Badge` / `StatusBadge` for state  
- `Button` variants: primary / outline / ghost  
- Future: extract dashboard shell to `components/organisms/AppShell`  

## 8. Do / Don’t

**Do:** quiet charts, teal for positive trend, muted for axes  
**Don’t:** rainbow charts, glassmorphism stacks, purple gradient sidebars  

## 9. Reference implementations

- `/admin` — control plane  
- `/analytics` — KPI strip  
- `/rfq`, `/orders`, `/logistics` — worklist tables  
