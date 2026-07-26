# Supabase

Supabase project assets for Auth, PostgreSQL, Storage, Realtime, and Edge Functions.

```
supabase/
├── config.toml          # Local Supabase config (generate via CLI)
├── migrations/          # Versioned SQL migrations
└── functions/           # Edge Functions
```

## Setup (Phase 2)

```bash
npx supabase init
npx supabase db push
```

Environment variables (do not commit secrets):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
