# API / BFF

HTTP contracts and Next.js route handlers that bridge the frontend to backend services.

## Planned routes

| Method | Path | Module |
|---|---|---|
| GET | `/api/health` | Platform |
| GET | `/api/products` | Products |
| GET | `/api/rfqs` | RFQ |
| POST | `/api/rfqs` | RFQ |
| GET | `/api/orders` | Orders |
| POST | `/api/ai/procurement` | AI Assistant |

Route handlers live under `app/api/` (Next.js) with contracts documented here.
