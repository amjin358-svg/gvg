# 004 — Folder Structure

```
GVG-Global-Trade-OS/
├── docs/                 # Numbered product & engineering docs
├── cursor/               # Cursor agent context
├── database/             # Canonical SQL schemas
├── frontend/             # Feature modules & mock domain data
│   ├── data/
│   └── features/
├── backend/              # Services, repositories, adapters
├── packages/             # Shared packages (config, ui, tsconfig)
├── supabase/             # Migrations, functions, local config
├── api/                  # API contracts / OpenAPI notes
├── components/           # Atomic Design UI
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── app/                  # Next.js App Router (pages + api)
├── lib/                  # Shared utilities & constants
├── hooks/                # Client hooks
├── styles/               # Global CSS / design tokens
├── types/                # Domain TypeScript types
├── public/               # Static assets
├── scripts/              # Maintenance scripts
├── tests/                # unit / integration / e2e
├── docker/               # Dockerfile + compose
└── .github/              # CI workflows
```

## Placement rules

| Concern | Location |
|---|---|
| Route / page | `app/` |
| UI primitive | `components/` |
| Feature UI + domain UI logic | `frontend/features/<feature>/` |
| Demo / seed data | `frontend/data/` |
| Business service | `backend/services/` |
| Persistence adapter | `backend/repositories/` |
| Shared pure util | `lib/` |
| Domain type | `types/` |
| SQL source of truth | `database/` + `supabase/migrations/` |
| Spec docs | `docs/` |

## Import aliases

```ts
@/*            → ./*
@/frontend/*   → ./frontend/*
@/backend/*    → ./backend/*
@/packages/*   → ./packages/*
@/api/*        → ./api/*
@/database/*   → ./database/*
```

## Related docs

- [012_FRONTEND_STANDARD.md](./012_FRONTEND_STANDARD.md)
- [013_BACKEND_STANDARD.md](./013_BACKEND_STANDARD.md)
