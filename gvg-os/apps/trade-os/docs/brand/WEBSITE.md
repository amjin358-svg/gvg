# Website — Brand application

**Surface:** Marketing + product web (`app/`)  
**Brand refs:** [BRAND_GUIDELINE.md](./BRAND_GUIDELINE.md)

---

## 1. Purpose

Public website presents GVG as an enterprise Trade OS — not a weather tool, not a generic SaaS landing clone.

## 2. Sitemap (brand-critical)

| Route | Job |
|---|---|
| `/` | Brand hero + value + CTA |
| `/products` | Catalog proof |
| `/rfq` | Trade action |
| `/ai` | Intelligence differentiator |
| `/news` | Authority / GEO content |
| `/admin` | (internal) control plane |

## 3. First viewport rules

1. **Brand first** — GVG / Global Vista Group hero-level  
2. One headline + one supporting sentence + one CTA group  
3. Full-bleed atmospheric field (ink + teal/copper light)  
4. No stats strips, card grids, or sticker badges in the hero  

## 4. Header

- Mark (square) + company name + product eyebrow  
- Primary nav: Products, Categories, Brands, RFQ, Logistics, News  
- CTA: Start RFQ · AI Assistant  

Logo assets:

- Mark: `/brand/gvg-mark.svg`  
- Optional lockup for wide desktop: `/brand/gvg-product-lockup-dark.svg` on dark header  

## 5. Footer

Ink background, module directory, portals, copyright, version line.

## 6. SEO / GEO

- Title pattern: `%s | GVG Global Trade OS`  
- `sitemap.xml` / `robots.txt` enabled  
- Category and corridor pages for discovery  

## 7. Motion

Hero entrance + section fade-in + subtle ambient drift; honor reduced motion.

## 8. Implementation pointers

- Tokens: `styles/globals.css`  
- Header/Footer: `components/organisms/SiteHeader.tsx`, `SiteFooter.tsx`  
- Home: `frontend/features/home/*`  

## 9. Acceptance checklist

- [ ] Removing nav still leaves unmistakable GVG brand in viewport one  
- [ ] Teal CTA contrast AA on dark and light  
- [ ] Lockups render crisp at 1× and 2×  
- [ ] Mobile hamburger includes portals + Start RFQ  
