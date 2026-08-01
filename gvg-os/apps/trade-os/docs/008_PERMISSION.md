# 008 — Permissions (RBAC)

## Roles

| Role | Code |
|---|---|
| Guest | `guest` |
| Customer | `customer` |
| Business Customer | `business_customer` |
| Supplier | `supplier` |
| Sales | `sales` |
| Purchasing | `purchasing` |
| Warehouse | `warehouse` |
| Finance | `finance` |
| Admin | `admin` |
| Super Admin | `super_admin` |
| AI Agent | `ai_agent` |

## Permission matrix (summary)

| Capability | Guest | Customer | Biz | Supplier | Sales | Purch | WH | Finance | Admin | Super | AI |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Browse catalog | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create RFQ | | ✓ | ✓ | | | ✓ | | | ✓ | ✓ | ✓ |
| Respond quote | | | | ✓ | ✓ | | | | ✓ | ✓ | |
| Manage orders | | own | own | own | ✓ | ✓ | view | view | ✓ | ✓ | |
| Inventory/WMS | | | | limited | | ✓ | ✓ | | ✓ | ✓ | |
| Logistics | | track | track | track | ✓ | ✓ | ✓ | view | ✓ | ✓ | |
| Customs docs | | view | view | view | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |
| CRM | | | | | ✓ | ✓ | | | ✓ | ✓ | |
| CMS | | | | | | | | | ✓ | ✓ | |
| Analytics | | limited | limited | limited | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Admin console | | | | | | | | | ✓ | ✓ | |
| Role management | | | | | | | | | | ✓ | |
| AI procurement tools | | ✓ | ✓ | | ✓ | ✓ | | | ✓ | ✓ | ✓ |

## Enforcement layers

1. **UI** — hide unavailable nav/actions
2. **API** — role guard in route handlers / services
3. **Database** — Supabase RLS policies by `profiles.role` and ownership

## Ownership rules

- Buyers see own RFQs/orders
- Suppliers see RFQs they are invited to + own quotes
- Staff roles see team/org scoped records (org_id Phase 2)

## Related docs

- [007_AUTHENTICATION.md](./007_AUTHENTICATION.md)
- [005_DATABASE_SCHEMA.md](./005_DATABASE_SCHEMA.md)
