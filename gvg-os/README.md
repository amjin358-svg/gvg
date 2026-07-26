# GVG OS

**Global Vista Group** — Enterprise Trade OS monorepo  
**Tagline:** Connecting Markets. Creating Value.

```
gvg-os/
│
├── apps/
│   ├── website/
│   ├── admin/
│   ├── buyer/
│   └── supplier/
│
├── packages/
│   ├── core/
│   ├── ui/
│   ├── design-system/
│   ├── auth/
│   ├── database/
│   ├── ai/
│   ├── sdk/
│   ├── motion/
│   └── shared/
│
├── plugins/
│   ├── marketplace/
│   ├── trade/
│   ├── procurement/
│   ├── warehouse/
│   ├── crm/
│   ├── ai-center/
│   ├── investment/
│   └── real-estate/
│
├── services/
│   ├── api/
│   ├── worker/
│   └── gateway/
│
└── docs/
```

## Quick start

```bash
cd gvg-os
npm install
npm run dev:website
```

## Workspaces

| Area | Packages |
|---|---|
| Apps | `@gvg/website` · `@gvg/admin` · `@gvg/buyer` · `@gvg/supplier` |
| Packages | `@gvg/core` · `@gvg/ui` · `@gvg/design-system` · `@gvg/auth` · `@gvg/database` · `@gvg/ai` · `@gvg/sdk` · `@gvg/motion` · `@gvg/shared` |
| Plugins | marketplace · trade · procurement · warehouse · crm · ai-center · investment · real-estate |
| Services | `@gvg/api` · `@gvg/worker` · `@gvg/gateway` |
