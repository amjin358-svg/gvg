# 003 — Tech Stack

## Frontend

| Tech | Version / notes |
|---|---|
| Next.js | 15 (App Router, Server Components) |
| React | 19 |
| TypeScript | Strict mode |
| Tailwind CSS | 4 |
| Shadcn-style primitives | CVA + Radix-ready patterns |
| Framer Motion | Intentional motion (2–3 key interactions) |

## Backend

| Tech | Role |
|---|---|
| Supabase | Auth, PostgreSQL, Storage, Realtime |
| Edge Functions | Workflows & privileged operations |
| Redis | Caching, rate limits, session assist |
| Repository pattern | Data access abstraction |

## Infrastructure

| Tech | Role |
|---|---|
| Vercel | App hosting |
| Cloudflare | CDN / security edge |
| GitHub Actions | CI (lint, test, build) |
| Docker | Containerized deploy option |

## Monitoring & analytics

- Sentry
- OpenTelemetry
- Google Analytics 4
- Microsoft Clarity
- Search Console
- Bing Webmaster

## AI

- OpenAI (chat / tools)
- Embeddings + vector search
- OCR (customs docs)
- Translation
- Recommendation engine

## Coding standards (enforced)

- Strict TypeScript · no `any`
- Server Components first
- Reusable Atomic Design components
- Clean Architecture · SOLID
- Feature-based folders
- 100% responsive · WCAG AA
- SEO ready · GEO ready
- Enterprise / production ready

## Related docs

- [012_FRONTEND_STANDARD.md](./012_FRONTEND_STANDARD.md)
- [013_BACKEND_STANDARD.md](./013_BACKEND_STANDARD.md)
- [025_DEPLOYMENT.md](./025_DEPLOYMENT.md)
