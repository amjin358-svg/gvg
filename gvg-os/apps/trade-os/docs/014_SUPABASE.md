# 014 — Supabase

## Services used

| Service | Usage |
|---|---|
| Auth | Users, sessions, invites |
| PostgreSQL | System of record |
| RLS | Row-level authorization |
| Storage | Product media, customs PDFs |
| Realtime | RFQ/quote/order updates |
| Edge Functions | Privileged workflows, webhooks |

## Project layout

```
supabase/
├── config.toml
├── migrations/
└── functions/
```

Canonical schema notes also in `database/schema.sql`.

## RLS patterns

- `profiles`: user can read/update self; admin can manage
- `rfqs`: buyer owns; invited suppliers can read open RFQs
- `quotes`: supplier owns create/update; buyer can read quotes on own RFQs
- `orders`: participants + privileged staff roles

## Storage buckets (planned)

| Bucket | Access |
|---|---|
| `product-images` | public read |
| `customs-docs` | private, participant read |
| `invoices` | private, finance + participants |

## Edge Functions (planned)

- `rfq-match-suppliers`
- `generate-customs-packet`
- `ai-procurement`
- `daily-analytics-rollups`

## Local workflow

```bash
npx supabase init
npx supabase start
npx supabase db push
npx supabase functions serve
```

## Related docs

- [005_DATABASE_SCHEMA.md](./005_DATABASE_SCHEMA.md)
- [007_AUTHENTICATION.md](./007_AUTHENTICATION.md)
- [008_PERMISSION.md](./008_PERMISSION.md)
