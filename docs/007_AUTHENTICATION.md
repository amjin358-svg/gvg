# 007 — Authentication

## Provider

Supabase Auth (email/password, magic link, optional OAuth).

## Session model

- Browser: HTTP-only cookie session via `@supabase/ssr`
- Server Components / Route Handlers: create server client per request
- Service role key: Edge Functions / privileged jobs only (never in client)

## Identity tables

- `auth.users` — Supabase managed
- `public.profiles` — app profile + role + company

On signup trigger: create `profiles` row with default role `customer` (or `supplier` via invite flow).

## Flows

### Guest

No session. Public marketplace + news only.

### Sign up / sign in

1. User authenticates with Supabase
2. Middleware refreshes session
3. Profile loaded for role-aware navigation

### Invite (supplier / staff)

Admin creates invite → user accepts → role assigned (`supplier`, `sales`, etc.).

### AI Agent

Service identity or tool-scoped token; never end-user impersonation without audit.

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Security rules

- Validate JWT on every protected API route
- Enforce RLS even when using user-scoped clients
- Rotate keys via platform secrets manager
- Log auth failures to audit stream

## Related docs

- [008_PERMISSION.md](./008_PERMISSION.md)
- [014_SUPABASE.md](./014_SUPABASE.md)
