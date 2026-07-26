# 013 — Backend Standard

## Principles

- Clean Architecture boundaries
- SOLID service design
- Repository pattern for persistence
- Explicit DTOs at API edge
- Fail closed on authz

## Layering

```
Route Handler (app/api)
  → validate input
  → authorize role
  → Service use-case
  → Repository / adapter
  → Supabase / Redis / OpenAI
```

## Service rules

- Pure domain decisions in services where possible
- Side effects (email, realtime, AI) behind interfaces
- Idempotent writes for order/payment webhooks
- Structured errors with stable codes

## Repository rules

```ts
export interface ProductRepository {
  list(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
}
```

- Interfaces in domain-facing modules
- Implementations in `backend/repositories/`
- Swap mock → Supabase without rewriting UI

## Validation

- Zod (recommended) or equivalent schema validation at boundary
- Never trust client role claims; read role from server session/profile

## Logging

- Correlate `requestId`
- No PII in info logs
- Send exceptions to Sentry

## Related docs

- [006_API_SPEC.md](./006_API_SPEC.md)
- [014_SUPABASE.md](./014_SUPABASE.md)
- [005_DATABASE_SCHEMA.md](./005_DATABASE_SCHEMA.md)
