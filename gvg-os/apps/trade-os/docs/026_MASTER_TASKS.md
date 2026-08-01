# 026 — Master Tasks

Tracked delivery backlog for GVG Global Trade OS v1.x.

## Phase 0 — Foundation (done / in progress)

- [x] Next.js 15 + React 19 + TypeScript scaffold
- [x] Enterprise folder structure
- [x] Design tokens + brand-first home
- [x] 20 module routes with mock data
- [x] AI assistant demo panel
- [x] Health API + CI lint/test/build
- [x] Numbered documentation set (`000`–`026`)

## Phase 1 — Auth & persistence

- [ ] Supabase project + local config
- [ ] Profiles + role bootstrap triggers
- [ ] RLS policies for RFQ/quote/order
- [ ] Replace mock repositories with Supabase adapters
- [ ] Protected API routes with session guards
- [ ] Supplier invite flow

## Phase 2 — Trade OS depth

- [ ] RFQ CRUD + supplier matching notifications
- [ ] Quote compare + accept → order conversion
- [ ] Inventory balances + warehouse ops screens
- [ ] Shipment milestones + customs document uploads
- [ ] CRM accounts/activities persistence
- [ ] CMS backed by Supabase tables
- [ ] Finance invoices (basic)
- [ ] OpenAI production assistant + embeddings
- [ ] Sentry + OpenTelemetry
- [ ] GA4 / Clarity wiring

## Phase 3 — Scale & integrations

- [ ] Redis caching + rate limits
- [ ] Carrier / forwarder integrations
- [ ] OCR customs extraction
- [ ] Translation pipelines
- [ ] ERP export connectors
- [ ] Advanced analytics rollups
- [ ] Multi-currency FX provider
- [ ] Performance budgets & load tests

## Definition of done (feature)

1. Spec referenced in docs
2. Types + repository/service coverage
3. UI route or API contract updated
4. Permissions considered
5. Tests for critical path
6. Lint/build green

## Priority order (next 10)

1. Supabase auth + profiles
2. Product repository on Postgres
3. RFQ create/list API + UI bind
4. Quote response API
5. Order conversion
6. RLS hardening
7. Storage for product images
8. AI procurement Edge Function
9. Sentry
10. Staging deploy

## Related docs

- [000_PROJECT_OVERVIEW.md](./000_PROJECT_OVERVIEW.md)
- [001_PRD.md](./001_PRD.md)
- [025_DEPLOYMENT.md](./025_DEPLOYMENT.md)
