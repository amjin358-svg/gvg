# GVG Global Trade OS — Product Vision (Canonical)

**Version:** 1.0  
**Project:** Global Vista Group Global Trade Platform  
**Architecture:** Enterprise SaaS  
**Framework:** Next.js 15 + React 19 + TypeScript  

This file is the product source of truth. Engineering docs (`000`–`026`), Cursor rules, and business collateral must stay aligned with it.

---

## Product Vision

GVG Global Trade OS is an enterprise-grade B2B and B2C international trading platform connecting suppliers, manufacturers, buyers, logistics providers, and global sourcing services.

### Core Business Modules

- International Trading
- Import / Export
- OEM / ODM
- Global Procurement
- US Purchasing Service
- Health Supplements
- Packaged Foods
- Household Goods
- Hardware & Tools
- Home Improvement
- Furniture
- Branded Apparel
- Logistics
- Customs Documentation
- AI Procurement Assistant

---

## User Roles

| Role | Code |
|---|---|
| Guest | `guest` |
| Customer | `customer` |
| Business Customer | `business_customer` |
| Supplier | `supplier` |
| Sales | `sales` |
| Purchasing | `purchasing` |
| Warehouse | `warehouse` |
| Finance | `finance` |
| Admin | `admin` |
| Super Admin | `super_admin` |
| AI Agent | `ai_agent` |

Implementation: `types/roles.ts`

---

## Platform Modules

| # | Module | Route | Foundation |
|---|---|---|---|
| 01 | Home | `/` | Done |
| 02 | Products | `/products` | Done |
| 03 | Categories | `/categories` | Done |
| 04 | Brands | `/brands` | Done |
| 05 | RFQ | `/rfq` | Done (demo data) |
| 06 | Quote | `/quotes` | Done (demo data) |
| 07 | Orders | `/orders` | Done (demo data) |
| 08 | Procurement | `/procurement` | Done |
| 09 | Supplier Portal | `/portal/supplier` | Done |
| 10 | Customer Portal | `/portal/customer` | Done |
| 11 | Inventory | `/inventory` | Done (demo data) |
| 12 | Warehouses | `/warehouses` | Done (demo data) |
| 13 | Logistics | `/logistics` | Done (demo data) |
| 14 | Customs | `/customs` | Done |
| 15 | CRM | `/crm` | Done |
| 16 | CMS | `/cms` | Done |
| 17 | News | `/news` | Done |
| 18 | Analytics | `/analytics` | Done |
| 19 | AI Assistant | `/ai` | Done (demo assistant) |
| 20 | Admin Dashboard | `/admin` | Done |

---

## Technology Stack

### Frontend

Next.js 15 · React 19 · TypeScript · TailwindCSS · Shadcn-style UI (CVA) · Framer Motion

### Backend

Supabase · PostgreSQL · Edge Functions · Realtime · Storage · Redis  
*(Auth/DB persistence = Phase 1 — see `docs/026_MASTER_TASKS.md`)*

### Infrastructure

Vercel · Cloudflare · GitHub Actions · Docker

### Monitoring

Sentry · OpenTelemetry *(Phase 2 wiring)*

### Analytics

Google Analytics 4 · Microsoft Clarity · Search Console · Bing Webmaster *(Phase 2 wiring)*

### AI

OpenAI · Embedding · Vector Search · OCR · Translation · Recommendation Engine  
*(Demo assistant live; production tools Phase 2)*

---

## Coding Standards

| Standard | Status |
|---|---|
| Strict TypeScript | Enforced |
| Server Components First | Enforced |
| No `any` type | Enforced |
| Reusable Components | `components/` Atomic Design |
| Clean Architecture / SOLID | `backend/` + repositories |
| Repository Pattern | `frontend/features/products/repository.ts` (+ Phase 1 adapters) |
| Feature Based Folder Structure | `frontend/features/` |
| 100% Responsive | Foundation UI |
| Accessibility WCAG AA | Focus/semantics baseline |
| SEO Ready | metadata, sitemap, robots |
| GEO Ready | Content/module structure |
| Enterprise Ready | Docs, RBAC model, brand kit |
| Production Ready | Lint/test/build; persist Auth next |

---

## Related canon

- Overview: `docs/000_PROJECT_OVERVIEW.md`
- PRD: `docs/001_PRD.md`
- Tasks: `docs/026_MASTER_TASKS.md`
- Cursor rules: `.cursor/rules/`
- Business: `docs/business/`
- Brand: `docs/brand/`
