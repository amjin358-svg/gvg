# Design System: GVG OS — Global Trade Platform
**Project ID:** 695461038082223086  
**Design System:** Orbital Command (`assets/a1d079b816f548cca036453381c30e95`)

## 1. Visual Theme & Atmosphere

GVG OS is a **cinematic Space-Tech enterprise OS** for global international trade. The interface blends a deep cosmic backdrop with **glassmorphism** panels, holographic Earth energy, and clean professional data presentation. It feels **premium, operational, and globally connected** — like a command center for cross-border commerce rather than a consumer landing page.

The mood is **dark, luminous, and precise**: deep navy/black space with cyan and electric-blue light trails, subtle purple accent gradients on key words only, and frosted glass surfaces that float above nebula texture. Visual hierarchy is anchored by a large photorealistic Earth hologram with orbital arcs symbolizing trade routes and data flow.

**Key Characteristics:**
- Deep space background with subtle nebulae and dark gradient overlays for text readability
- Glass panels: transparency + backdrop blur + thin glowing cyan borders
- Holographic Earth as the primary visual anchor (center/right of hero)
- Balanced desktop layout: left copy/CTAs, center Earth, right stats rail
- Bilingual Chinese + English labels (Traditional Chinese primary in body where natural)
- Modular enterprise cards for trade functions (Member, Product, Order, Inventory, AI)

## 2. Color Palette & Roles

### Primary Foundation
- **Void Navy** (#050B1A) – Deep page background / space canvas
- **Midnight Ink** (#0A1628) – Secondary surface under glass layers
- **Nebula Slate** (#12203A) – Soft panel underlays and section bands

### Accent & Interactive
- **Orbital Cyan** (#40BAF7) – Primary accent: CTAs, active links, glow borders, orbital arcs
- **Electric Blue** (#2F6BFF) – Primary button gradient end / strong interactive fill
- **Vision Violet** (#8B5CFF) – Sparse gradient highlight only (e.g. the word “Vision”); never as page theme wash
- **Signal White** (#F4F8FF) – Primary headline / high-contrast text
- **Mist Blue** (#A8C0D8) – Secondary body text on dark surfaces

### Glass & Borders
- **Glass Fill** (rgba(12, 24, 48, 0.45)) – Semi-transparent panels
- **Glass Border** (rgba(64, 186, 247, 0.35)) – Thin luminous edges
- **Glow Soft** (rgba(64, 186, 247, 0.25)) – Outer box-shadow / rim light

### Functional States
- **Success Teal** (#22C55E) – Positive trade metrics / confirmed shipments
- **Alert Amber** (#F59E0B) – Warnings / pending clearance
- **Critical Red** (#EF4444) – Errors / blocked transactions

## 3. Typography Rules

**Primary Font Family:** Montserrat (or similar modern geometric sans — Space Grotesk / Manrope acceptable). Avoid Inter/Roboto/Arial as the hero display face.

### Hierarchy & Weights
- **Display Headlines (H1):** Bold (700), ~3–4.5rem, tight tracking. Hero: “One OS. Limitless Vision.” with “Vision” in cyan→violet gradient.
- **Section Headers (H2):** Semi-bold (600), ~1.75–2.25rem. English + Chinese pairing allowed.
- **Card Titles (H3):** Semi-bold (600), bilingual stacked (Chinese above English or side-by-side).
- **Body:** Regular (400), 1rem–1.125rem, Mist Blue, line-height ~1.65.
- **Stats Numbers:** Bold (700), large tabular figures in Signal White with cyan unit labels.
- **Nav / Meta:** Medium (500), slightly tracked uppercase or sentence case, muted Mist Blue; hover → Orbital Cyan.

## 4. Component Stylings

### Buttons
- **Primary CTA:** Blue gradient (`#2F6BFF` → `#40BAF7`), white text, 10–12px radius, soft cyan glow. Label examples: “Get Started”.
- **Secondary CTA:** Transparent glass with 1px cyan border (“Explore Modules →”).
- **Tertiary / Play:** Icon + text row (“Watch Movie”) with subtle hover brightness.

### Glass Cards (Module Cards)
- Dark translucent fill, thin glowing border, light inner highlight
- Icon top-left (line/outline, cyan stroke)
- Title bilingual, short description, diagonal arrow affordance bottom-right
- Hover: border brightens, slight lift, stronger glow — no heavy multi-layer shadows

### Stats Panel
- Vertical frosted rail with thin dividers
- Large metric + short bilingual caption
- Icons are thin line glyphs, not emoji

### Navigation
- Top bar: wordmark “GVG OS” left (no hexagon logo), centered links, Get Started right
- Links: Overview, Modules, Solutions, Marketplace, AI Services, About GVG
- Sticky optional; always translucent over space background

### Value / Feature Bar
- Five icon+title+short Chinese description columns
- Flat, no card chrome if readability holds; light glass acceptable

## 5. Layout Principles

### Desktop Structure (1440px target)
1. **Header** — logo / nav / CTA
2. **Hero** — left headline+sub+CTAs; center Earth hologram with orbital arcs; right stats
3. **Modules** — “ALL-IN-ONE BUSINESS PLATFORM / 26 Core Modules…” + 5 horizontal module cards
4. **Value bar** — AI-Powered, Cloud-Native, Data-Driven, Secure & Reliable, Scalable
5. **Footer** — compact dark footer with trade platform links

### Atmosphere Rules
- Background must feel like deep space (texture/gradient/nebula), never flat solid black alone
- Earth hologram is the dominant visual anchor — not decorative abstract blobs
- Prefer glass + glow borders over opaque white cards
- Keep Chinese/English bilingual rhythm consistent across sections

## 6. Design System Notes for Stitch Generation

**USE THESE EXACT TOKENS when generating new screens:**

- Background: Void Navy `#050B1A` with Midnight Ink `#0A1628` and subtle nebula atmosphere
- Text: Signal White `#F4F8FF` headlines, Mist Blue `#A8C0D8` body
- Accent: Orbital Cyan `#40BAF7`, Electric Blue `#2F6BFF`, sparse Vision Violet `#8B5CFF` for gradient words only
- Surfaces: glass panels `rgba(12,24,48,0.45)` + border `rgba(64,186,247,0.35)` + soft cyan glow
- Typography: Montserrat / Space Grotesk geometric sans; bold display headlines
- Components: primary blue-gradient CTAs; frosted module cards with thin glowing borders; bilingual CN/EN labels
- Mood: cinematic Space-Tech enterprise OS for global international trade — holographic Earth, orbital data arcs, glassmorphism command UI
- Do NOT use light cream editorial themes, newspaper layouts, or purple-washed white SaaS templates
- Device: DESKTOP (wide cinematic composition)
