export const DEV_NAV = [
  { label: "Development Dashboard", labelZh: "開發儀表板", href: "/development" },
  { label: "Current Sprint", labelZh: "目前 Sprint", href: "/development/sprint" },
  { label: "Progress", labelZh: "進度", href: "/development/progress" },
  { label: "Cursor Tasks", labelZh: "Cursor 任務", href: "/development/cursor-tasks" },
  { label: "API", labelZh: "API", href: "/development/api" },
  { label: "Database", labelZh: "資料庫", href: "/development/database" },
  { label: "Components", labelZh: "元件", href: "/development/components" },
  { label: "Deployment", labelZh: "部署", href: "/development/deploy" },
] as const;

export const DEV_DOC_NAV = [
  { label: "PRD", labelZh: "產品需求", href: "/development/prd" },
  { label: "React", labelZh: "React", href: "/development/react" },
  { label: "Next.js", labelZh: "Next.js", href: "/development/nextjs" },
  { label: "Supabase", labelZh: "Supabase", href: "/development/supabase" },
  { label: "Docker", labelZh: "Docker", href: "/development/docker" },
  { label: "Cloudflare", labelZh: "Cloudflare", href: "/development/cloudflare" },
  { label: "Master Tasks", labelZh: "主任務", href: "/development/master-tasks" },
] as const;

export const CURRENT_SPRINT = {
  name: "Sprint 1 — Auth & Persistence",
  nameZh: "Sprint 1 — 認證與持久化",
  phase: "Phase 1",
  window: "2026-07-21 → 2026-08-03",
  goal: "接通 Supabase Auth／profiles／RLS，並把 RFQ API 接到 UI。",
  items: [
    { title: "Supabase project + env wiring", owner: "Platform", status: "in_progress", points: 5 },
    { title: "Profiles + role bootstrap", owner: "Backend", status: "pending", points: 5 },
    { title: "RLS for RFQ / quote / order", owner: "Backend", status: "pending", points: 8 },
    { title: "RFQ create/list API + UI bind", owner: "Full-stack", status: "pending", points: 8 },
    { title: "Staging deploy smoke", owner: "DevOps", status: "pending", points: 3 },
  ],
} as const;

export const PROGRESS_METRICS = [
  { label: "Phase 0 Foundation", value: 100, hint: "Scaffold · docs · CI" },
  { label: "Phase 1 Auth", value: 15, hint: "Schema ready · adapters pending" },
  { label: "API surface", value: 8, hint: "1/12+ contracts live" },
  { label: "UI modules", value: 85, hint: "Routes + mock data" },
  { label: "Design Center", value: 100, hint: "Tokens · previews" },
  { label: "Deploy readiness", value: 40, hint: "CI green · staging TBD" },
] as const;

export const CURSOR_TASKS = [
  {
    title: "Wire Supabase client + auth guards",
    area: "Backend",
    rule: ".cursor/rules/backend.mdc",
    status: "todo",
    detail: "Create lib/supabase clients; protect portal/admin routes.",
  },
  {
    title: "Apply schema via migrations",
    area: "Database",
    rule: ".cursor/rules/database.mdc",
    status: "todo",
    detail: "Promote database/schema.sql into supabase/migrations.",
  },
  {
    title: "Implement RFQ route handlers",
    area: "API",
    rule: ".cursor/rules/api.mdc",
    status: "todo",
    detail: "POST/GET /api/rfqs per docs/006_API_SPEC.md.",
  },
  {
    title: "Replace product mock repository",
    area: "Frontend",
    rule: ".cursor/rules/frontend.mdc",
    status: "todo",
    detail: "Swap frontend/features/products/repository to Supabase adapter.",
  },
  {
    title: "Security pass on secrets & RLS",
    area: "Security",
    rule: ".cursor/rules/security.mdc",
    status: "todo",
    detail: "No service-role in client; verify RLS before staging.",
  },
  {
    title: "Staging deploy checklist",
    area: "Deployment",
    rule: ".cursor/rules/deployment.mdc",
    status: "todo",
    detail: "Vercel + Supabase staging + Cloudflare DNS/WAF.",
  },
] as const;

export const COMPONENT_INVENTORY = [
  { name: "Button", path: "components/atoms/Button.tsx", status: "stable" },
  { name: "Badge", path: "components/atoms/Badge.tsx", status: "stable" },
  { name: "Container", path: "components/atoms/Container.tsx", status: "stable" },
  { name: "StatusBadge", path: "components/molecules/StatusBadge.tsx", status: "stable" },
  { name: "ProductCard", path: "components/molecules/ProductCard.tsx", status: "stable" },
  { name: "SiteHeader", path: "components/organisms/SiteHeader.tsx", status: "stable" },
  { name: "SiteFooter", path: "components/organisms/SiteFooter.tsx", status: "stable" },
  { name: "BusinessShell", path: "frontend/features/business/BusinessShell.tsx", status: "stable" },
  { name: "DesignShell", path: "frontend/features/design/DesignShell.tsx", status: "stable" },
  { name: "DevShell", path: "frontend/features/development/DevShell.tsx", status: "stable" },
  { name: "AppShell", path: "components/organisms/AppShell.tsx", status: "planned" },
  { name: "DataTable", path: "components/molecules/DataTable.tsx", status: "planned" },
] as const;

export const API_STATUS = [
  { method: "GET", path: "/api/health", status: "live" },
  { method: "GET", path: "/api/products", status: "spec" },
  { method: "GET/POST", path: "/api/rfqs", status: "spec" },
  { method: "GET/POST", path: "/api/quotes", status: "spec" },
  { method: "GET/POST", path: "/api/orders", status: "spec" },
  { method: "POST", path: "/api/ai/procurement", status: "demo" },
] as const;

export const DB_STATUS = [
  { name: "database/schema.sql", status: "ready", note: "Canonical core model" },
  { name: "supabase/migrations", status: "pending", note: "Apply Phase 1 tables" },
  { name: "RLS policies", status: "pending", note: "RFQ / quote / order" },
  { name: "Storage buckets", status: "planned", note: "product-images · customs-docs" },
] as const;

export const DEPLOY_STATUS = [
  { name: "CI lint/test/build", status: "live", href: "/development/deploy" },
  { name: "Docker standalone", status: "ready", href: "/development/docker" },
  { name: "Vercel preview", status: "pending", href: "/development/deploy" },
  { name: "Cloudflare WAF/DNS", status: "pending", href: "/development/cloudflare" },
  { name: "Staging Supabase", status: "pending", href: "/development/supabase" },
  { name: "Production cutover", status: "planned", href: "/development/deploy" },
] as const;

export const DEV_STACK = [
  { label: "Next.js 15", detail: "App Router · RSC" },
  { label: "React 19", detail: "Client islands" },
  { label: "TypeScript", detail: "Strict" },
  { label: "Supabase", detail: "Auth · Postgres · RLS" },
  { label: "Tailwind 4", detail: "Design tokens" },
  { label: "Docker", detail: "Standalone image" },
  { label: "Cloudflare", detail: "CDN · WAF · edge" },
  { label: "GitHub Actions", detail: "CI lint/test/build" },
] as const;

export const PRD_GOALS = [
  "Launch a production-ready Trade OS foundation for Global Vista Group.",
  "Enable buyers and suppliers to complete RFQ → Quote → Order flows.",
  "Provide operational modules for inventory, warehouse, logistics, and customs.",
  "Expose an AI Procurement Assistant for matching, drafting, and cost estimation.",
  "Support multi-role enterprise access with clear permissions.",
] as const;

export const PRD_PERSONAS = [
  { role: "Guest", need: "Browse catalog, news, brand story" },
  { role: "Customer", need: "RFQ, orders, tracking, portal" },
  { role: "Supplier", need: "Catalog, quote response, fulfillment" },
  { role: "Sales / Purchasing", need: "CRM, sourcing, OEM programs" },
  { role: "Warehouse / Finance", need: "Inventory, invoices, settlement" },
  { role: "Admin", need: "Roles, CMS, module health" },
] as const;

export const DB_ENTITIES = [
  { name: "profiles", note: "Auth-linked users + roles" },
  { name: "brands / categories / products", note: "Marketplace catalog" },
  { name: "rfqs", note: "Buyer request lifecycle" },
  { name: "quotes", note: "Supplier responses" },
  { name: "orders", note: "Trade order lifecycle" },
  { name: "warehouses / inventory_balances", note: "Phase 2 WMS" },
  { name: "shipments / customs_documents", note: "Phase 2 logistics" },
  { name: "crm_accounts", note: "Phase 2 CRM" },
] as const;

export const API_ENDPOINTS = [
  { method: "GET", path: "/api/health", auth: "No", module: "Platform" },
  { method: "GET", path: "/api/products", auth: "No", module: "Marketplace" },
  { method: "GET", path: "/api/rfqs", auth: "Yes", module: "Trade" },
  { method: "POST", path: "/api/rfqs", auth: "Yes", module: "Trade" },
  { method: "GET", path: "/api/quotes", auth: "Yes", module: "Trade" },
  { method: "POST", path: "/api/quotes", auth: "Yes", module: "Trade" },
  { method: "GET", path: "/api/orders", auth: "Yes", module: "Trade" },
  { method: "POST", path: "/api/orders", auth: "Yes", module: "Trade" },
  { method: "GET", path: "/api/shipments", auth: "Yes", module: "Logistics" },
  { method: "POST", path: "/api/ai/procurement", auth: "Yes", module: "AI" },
  { method: "GET", path: "/api/analytics/summary", auth: "Yes", module: "Analytics" },
] as const;

export const REACT_RULES = [
  { title: "Server Components first", body: "Client components only for state, effects, and browser APIs." },
  { title: "Strict TypeScript", body: "No any; domain models live in types/." },
  { title: "Feature modules", body: "UI + feature logic in frontend/features/<name>." },
  { title: "Atomic UI", body: "Shared primitives in components/ (atoms → molecules → organisms)." },
  { title: "Responsive state", body: "Prefer useDeferredValue / startTransition for filtering; avoid premature memo." },
] as const;

export const NEXT_RULES = [
  { title: "App Router", body: "Routes under app/; metadata via export const metadata / generateMetadata." },
  { title: "RSC data", body: "Pages call repositories/services; never embed service-role keys in client bundles." },
  { title: "API routes", body: "Route handlers under app/api/*; health already live at GET /api/health." },
  { title: "Standalone", body: "next.config output standalone for Docker production images." },
  { title: "i18n surface", body: "lang=zh-Hant root; marketing copy Traditional Chinese-first." },
] as const;

export const SUPABASE_SERVICES = [
  { name: "Auth", use: "Users, sessions, invites" },
  { name: "PostgreSQL", use: "System of record" },
  { name: "RLS", use: "Row-level authorization" },
  { name: "Storage", use: "Product media, customs PDFs" },
  { name: "Realtime", use: "RFQ/quote/order updates" },
  { name: "Edge Functions", use: "Privileged workflows, webhooks" },
] as const;

export const DOCKER_COMMANDS = [
  { label: "Build", cmd: "docker compose -f docker/docker-compose.yml build" },
  { label: "Up", cmd: "docker compose -f docker/docker-compose.yml up" },
] as const;

export const CLOUDFLARE_ROLES = [
  { title: "CDN / cache", body: "Accelerate static assets and edge cache HTML where safe." },
  { title: "WAF / DDoS", body: "Protect public marketing and API surfaces." },
  { title: "DNS", body: "globalvistagroup.com and preview hostnames." },
  { title: "Pages / Workers (optional)", body: "Edge helpers, redirects, or Workers AI experiments — primary app may stay on Vercel." },
  { title: "R2 / KV (later)", body: "Media mirrors, session assist, rate-limit counters." },
] as const;

export const MASTER_PHASES = [
  {
    name: "Phase 0 — Foundation",
    status: "done",
    items: [
      "Next.js 15 + React 19 + TypeScript scaffold",
      "Enterprise folder structure",
      "Design tokens + brand-first surfaces",
      "Module routes with mock data",
      "Health API + CI lint/test/build",
      "Numbered documentation set",
    ],
  },
  {
    name: "Phase 1 — Auth & persistence",
    status: "next",
    items: [
      "Supabase project + local config",
      "Profiles + role bootstrap triggers",
      "RLS for RFQ/quote/order",
      "Replace mock repositories with Supabase adapters",
      "Protected API routes with session guards",
      "Supplier invite flow",
    ],
  },
  {
    name: "Phase 2 — Trade OS depth",
    status: "planned",
    items: [
      "RFQ CRUD + supplier matching",
      "Quote compare → order conversion",
      "Inventory + warehouse ops",
      "Shipment milestones + customs uploads",
      "CRM / CMS / finance basics",
      "OpenAI production assistant + Sentry",
    ],
  },
  {
    name: "Phase 3 — Scale & integrations",
    status: "planned",
    items: [
      "Redis caching + rate limits",
      "Carrier / forwarder integrations",
      "OCR customs extraction",
      "ERP export connectors",
      "Advanced analytics + load tests",
    ],
  },
] as const;

export const PRIORITY_NEXT = [
  "Supabase auth + profiles",
  "Product repository on Postgres",
  "RFQ create/list API + UI bind",
  "Quote response API",
  "Order conversion",
  "RLS hardening",
  "Storage for product images",
  "AI procurement Edge Function",
  "Sentry",
  "Staging deploy",
] as const;

export const DEPLOY_ENVS = [
  { name: "Local", purpose: "npm run dev" },
  { name: "Preview", purpose: "Vercel preview per PR" },
  { name: "Staging", purpose: "Pre-prod Supabase project" },
  { name: "Production", purpose: "Vercel + prod Supabase + Cloudflare" },
] as const;

export const DEPLOY_CHECKLIST = [
  "Migrations applied",
  "RLS verified for new tables",
  "Smoke test: home, products, RFQ, AI, admin",
  "Sentry release created",
  "Rollback plan documented",
] as const;

export const DOC_LINKS = [
  { label: "001 PRD", path: "docs/001_PRD.md" },
  { label: "005 Database", path: "docs/005_DATABASE_SCHEMA.md" },
  { label: "006 API", path: "docs/006_API_SPEC.md" },
  { label: "012 Frontend", path: "docs/012_FRONTEND_STANDARD.md" },
  { label: "014 Supabase", path: "docs/014_SUPABASE.md" },
  { label: "025 Deployment", path: "docs/025_DEPLOYMENT.md" },
  { label: "026 Master Tasks", path: "docs/026_MASTER_TASKS.md" },
  { label: "Product Vision", path: "docs/PRODUCT_VISION.md" },
] as const;
