# 025 — Deployment

## Environments

| Env | Purpose |
|---|---|
| Local | `npm run dev` |
| Preview | Vercel preview per PR |
| Staging | Pre-prod Supabase project |
| Production | Vercel + prod Supabase + Cloudflare |

## CI pipeline

GitHub Actions (`.github/workflows/ci.yml`):

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`

## Hosting

- **App:** Vercel (Next.js)
- **Edge/CDN/WAF:** Cloudflare
- **Data:** Supabase
- **Containers (optional):** `docker/Dockerfile` with Next standalone output

## Docker

```bash
docker compose -f docker/docker-compose.yml build
docker compose -f docker/docker-compose.yml up
```

Requires `output: "standalone"` in `next.config.ts` (enabled).

## Secrets

Store in Vercel / GitHub Actions / Supabase — never commit:

- Supabase URL + anon + service role
- OpenAI keys
- Sentry DSN
- Analytics IDs

## Release checklist

- [ ] Migrations applied
- [ ] RLS verified for new tables
- [ ] Smoke test: home, products, RFQ, AI, admin
- [ ] Sentry release created
- [ ] Rollback plan documented

## Related docs

- [003_TECH_STACK.md](./003_TECH_STACK.md)
- [014_SUPABASE.md](./014_SUPABASE.md)
- [026_MASTER_TASKS.md](./026_MASTER_TASKS.md)
