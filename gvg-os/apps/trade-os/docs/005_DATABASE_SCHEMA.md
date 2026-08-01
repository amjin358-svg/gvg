# 005 — Database Schema

## Principles

- PostgreSQL via Supabase
- UUID primary keys
- Soft status enums as `TEXT` with app-level unions (migrate to enums later if needed)
- RLS on all tenant/user tables
- Canonical SQL lives in `database/schema.sql`; versioned applies in `supabase/migrations/`

## Core entities

### profiles

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | Matches `auth.users.id` |
| email | TEXT UNIQUE | |
| full_name | TEXT | |
| role | TEXT | See roles doc |
| company_name | TEXT | Nullable |
| created_at | TIMESTAMPTZ | |

### brands / categories / products

Catalog entities supporting marketplace browse and RFQ targeting.

Key product fields: `sku`, `slug`, `moq`, `unit_price`, `currency`, `origin_country`, `lead_time_days`, `in_stock`.

### rfqs

Buyer request for quotation: quantity, target price, destination, status (`open|quoted|negotiating|awarded|closed`).

### quotes

Supplier response linked to RFQ: unit price, lead time, validity, status (`draft|sent|accepted|rejected|expired`).

### orders

Trade order lifecycle: `draft|pending|confirmed|in_transit|customs|delivered|cancelled`.

## Extended schema (Phase 2+)

| Table | Purpose |
|---|---|
| warehouses | Network hubs & capacity |
| inventory_balances | SKU × warehouse qty |
| shipments | Logistics tracking |
| customs_documents | Invoice, packing list, COO, HS |
| crm_accounts | Buyer/supplier accounts |
| crm_activities | Notes, tasks, touches |
| invoices | Finance documents |
| payments | Settlement records |
| embeddings | Vector metadata for AI search |
| audit_logs | Security / compliance trail |

## Relationships (simplified)

```
profiles ──┬── rfqs (buyer)
           ├── quotes (supplier)
           └── orders (buyer/supplier)

categories ── products ── brands
rfqs ── quotes ── orders
orders ── shipments ── customs_documents
warehouses ── inventory_balances ── products
```

## Indexing guidance

- Unique: `products.sku`, `products.slug`, `orders.order_number`
- Lookup: `rfqs.status`, `orders.status`, `shipments.tracking_number`
- Vector: embedding column / external vector store for product & RFQ semantic search

## Related docs

- [007_AUTHENTICATION.md](./007_AUTHENTICATION.md)
- [008_PERMISSION.md](./008_PERMISSION.md)
- [014_SUPABASE.md](./014_SUPABASE.md)
