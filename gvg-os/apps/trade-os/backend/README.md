# Backend

Application services, use-cases, and adapters (Repository implementations, Supabase clients, external APIs).

## Planned structure

```
backend/
├── services/          # Domain services (rfq, orders, logistics)
├── repositories/      # Postgres / Supabase repository adapters
├── ai/                # OpenAI, embeddings, OCR adapters
└── auth/              # Role guards & session helpers
```

Phase 1 uses mock repositories under `frontend/features/*/repository.ts`.
