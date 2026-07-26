# GVG Global Trade OS

Enterprise B2B / B2C international trading platform for **Global Vista Group**.

```
GVG-Global-Trade-OS/
├── docs/           # Architecture & product docs
├── cursor/         # Cursor agent context
├── database/       # SQL schemas
├── frontend/       # Features & mock domain data
├── backend/        # Services & adapters
├── packages/       # Shared packages
├── supabase/       # Auth, DB, Edge Functions
├── api/            # API contracts / BFF docs
├── components/     # Atomic Design UI
├── app/            # Next.js App Router
├── lib/            # Utilities & constants
├── hooks/          # React hooks
├── styles/         # Global CSS tokens
├── types/          # Domain types & roles
├── public/         # Static assets
├── scripts/        # Maintenance scripts
├── tests/          # Unit / integration / e2e
├── docker/         # Containers
└── .github/        # CI/CD
```

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + Framer Motion
- Supabase · PostgreSQL · Edge Functions (Phase 2)
- Vercel · Cloudflare · Docker · GitHub Actions

## Modules (v1.0)

| # | Module | Route |
|---|---|---|
| 01 | Home | `/` |
| 02 | Products | `/products` |
| 03 | Categories | `/categories` |
| 04 | Brands | `/brands` |
| 05 | RFQ | `/rfq` |
| 06 | Quote | `/quotes` |
| 07 | Orders | `/orders` |
| 08 | Procurement | `/procurement` |
| 09 | Supplier Portal | `/portal/supplier` |
| 10 | Customer Portal | `/portal/customer` |
| 11 | Inventory | `/inventory` |
| 12 | Warehouses | `/warehouses` |
| 13 | Logistics | `/logistics` |
| 14 | Customs | `/customs` |
| 15 | CRM | `/crm` |
| 16 | CMS | `/cms` |
| 17 | News | `/news` |
| 18 | Analytics | `/analytics` |
| 19 | AI Assistant | `/ai` |
| 20 | Admin Dashboard | `/admin` |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Turbopack development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run test` | Foundation unit tests |
| `npm run structure` | Print enterprise folder map |

## Separate GitHub repository

This Trade OS must **not** share the weather forecast repo (`amjin358-svg/jin`).

See [`docs/027_NEW_GITHUB_REPO.md`](./docs/027_NEW_GITHUB_REPO.md) and:

```bash
./scripts/publish-new-github-repo.sh amjin358-svg/gvg-global-trade-os
```

## Docs

Numbered documentation set in [`docs/`](./docs) — start at [`docs/000_PROJECT_OVERVIEW.md`](./docs/000_PROJECT_OVERVIEW.md) or the [docs index](./docs/README.md).
