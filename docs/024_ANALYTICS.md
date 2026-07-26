# 024 — Analytics

## Module

Route: `/analytics`  
Instrumentation: GA4 · Clarity · Search Console · Bing Webmaster (ops analytics)

## Product analytics (in-app)

Foundation KPIs:

- Open RFQs
- Active orders
- Shipments in motion
- Average warehouse utilization

Phase 2 dashboards:

- RFQ → Quote → Order conversion
- Landed-cost variance
- Supplier OTIF
- Customs hold rate
- GMV by vertical / corridor

## Technical analytics & monitoring

| Tool | Purpose |
|---|---|
| GA4 | Funnel & acquisition |
| Microsoft Clarity | UX heatmaps/session |
| Sentry | Error monitoring |
| OpenTelemetry | Traces/metrics |
| Search Console / Bing | SEO health |

## Data model (Phase 2)

Nightly rollups via Edge Function into `analytics_daily` tables; cache hot tiles in Redis.

## Permissions

- Leadership/Admin: full
- Role-scoped operational tiles for Sales/Purchasing/Warehouse/Finance
- External users: limited own-account metrics

## Related docs

- [025_DEPLOYMENT.md](./025_DEPLOYMENT.md)
- [018_SUPPLY_CHAIN.md](./018_SUPPLY_CHAIN.md)
