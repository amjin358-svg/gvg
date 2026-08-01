# 002 — System Architecture

## 1. Architecture style

Clean Architecture + Feature-based modules + Repository pattern on an Enterprise SaaS stack.

```
┌──────────────────────────────────────────────────────────┐
│                     Presentation                          │
│   app/ · components/ · hooks/ · styles/ · frontend/      │
└────────────────────────────┬─────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────┐
│                   API / BFF layer                         │
│              app/api/ · api/contracts                     │
└────────────────────────────┬─────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────┐
│                 Application services                      │
│                    backend/services                       │
└────────────────────────────┬─────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────┐
│              Adapters / repositories                      │
│         backend/repositories · supabase clients           │
└────────────────────────────┬─────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────┐
│                      Data plane                           │
│   PostgreSQL · Storage · Realtime · Redis · Vector DB     │
└──────────────────────────────────────────────────────────┘
```

## 2. Runtime topology

| Layer | Technology |
|---|---|
| Web | Next.js 15 App Router on Vercel |
| Edge | Cloudflare (CDN / WAF / optional Workers) |
| Auth + DB | Supabase (Auth, Postgres, RLS, Storage, Realtime) |
| Functions | Supabase Edge Functions |
| Cache | Redis |
| AI | OpenAI (+ embeddings / vector search) |
| Observability | Sentry · OpenTelemetry |
| CI/CD | GitHub Actions · Docker |

## 3. Domain boundaries

| Bounded context | Owns |
|---|---|
| Marketplace | Products, categories, brands, CMS, news |
| Trade | RFQ, quotes, orders, procurement |
| Supply chain | Inventory, warehouses, logistics, customs |
| Relationships | CRM accounts & ownership |
| Finance | Invoices, settlements (Phase 2+) |
| Intelligence | AI assistant tools & embeddings |
| Platform | Roles, admin, analytics |

## 4. Request flow (example: create RFQ)

1. Authenticated buyer submits RFQ in UI (`/rfq`)
2. Next.js route handler validates DTO (`/api/rfqs`)
3. `RfqService` applies business rules
4. `RfqRepository` persists via Supabase
5. Optional: AI agent suggests suppliers
6. Realtime notifies matched suppliers

## 5. Cross-cutting concerns

- Authentication & session (Supabase Auth)
- Authorization (RBAC + RLS)
- Validation (Zod / typed DTOs)
- Logging & tracing
- Feature flags (future)
- i18n / multi-currency (future)

## 6. Related docs

- [003_TECH_STACK.md](./003_TECH_STACK.md)
- [004_FOLDER_STRUCTURE.md](./004_FOLDER_STRUCTURE.md)
- [006_API_SPEC.md](./006_API_SPEC.md)
- [014_SUPABASE.md](./014_SUPABASE.md)
