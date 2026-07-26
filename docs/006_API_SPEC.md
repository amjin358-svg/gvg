# 006 — API Specification

## Conventions

- Base: `/api`
- JSON request/response
- Auth via Bearer session / cookies (Supabase)
- Errors: `{ "error": { "code": string, "message": string } }`
- List endpoints support `?page&pageSize&q&status`

## Contracts (v1)

| Method | Path | Auth | Module |
|---|---|---|---|
| GET | `/api/health` | No | Platform |
| GET | `/api/products` | No | Marketplace |
| GET | `/api/products/:slug` | No | Marketplace |
| GET | `/api/categories` | No | Marketplace |
| GET | `/api/brands` | No | Marketplace |
| GET | `/api/rfqs` | Yes | Trade |
| POST | `/api/rfqs` | Yes | Trade |
| GET | `/api/rfqs/:id` | Yes | Trade |
| PATCH | `/api/rfqs/:id` | Yes | Trade |
| GET | `/api/quotes` | Yes | Trade |
| POST | `/api/quotes` | Yes | Trade |
| PATCH | `/api/quotes/:id` | Yes | Trade |
| GET | `/api/orders` | Yes | Trade |
| POST | `/api/orders` | Yes | Trade |
| GET | `/api/orders/:id` | Yes | Trade |
| GET | `/api/inventory` | Yes | WMS |
| GET | `/api/warehouses` | Yes | WMS |
| GET | `/api/shipments` | Yes | Logistics |
| GET | `/api/shipments/:tracking` | Yes | Logistics |
| GET | `/api/customs/:orderId` | Yes | Customs |
| POST | `/api/customs/:orderId/documents` | Yes | Customs |
| GET | `/api/crm/accounts` | Yes | CRM |
| POST | `/api/ai/procurement` | Yes | AI |
| GET | `/api/analytics/summary` | Yes | Analytics |

## Example: create RFQ

```http
POST /api/rfqs
Content-Type: application/json

{
  "title": "Private-label vitamin D3 bottles",
  "categorySlug": "health-supplements",
  "quantity": 50000,
  "targetPrice": 0.38,
  "currency": "USD",
  "destination": "Los Angeles, USA"
}
```

```json
{
  "id": "rfq-...",
  "status": "open",
  "createdAt": "2026-07-24T00:00:00.000Z"
}
```

## Example: AI procurement

```http
POST /api/ai/procurement
Content-Type: application/json

{
  "prompt": "Find OEM apparel suppliers under $12/unit",
  "context": { "destination": "Frankfurt" }
}
```

```json
{
  "reply": "Matched Pacific Thread — Performance Fleece...",
  "matches": [{ "sku": "GVG-AP-3308", "unitPrice": 11.75 }]
}
```

## Implementation map

- Contracts: `api/contracts.ts`
- Handlers: `app/api/**/route.ts`
- Services: `backend/services/**`

## Related docs

- [007_AUTHENTICATION.md](./007_AUTHENTICATION.md)
- [013_BACKEND_STANDARD.md](./013_BACKEND_STANDARD.md)
- [015_AI_AGENT.md](./015_AI_AGENT.md)
