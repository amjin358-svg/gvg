# 023 — Finance

## Status

Finance is a first-class role in v1 navigation/permissions; full ledger features land in Phase 2+.

## Scope

| Capability | Phase |
|---|---|
| Order value visibility | Foundation |
| Invoice generation from orders | Phase 2 |
| Multi-currency display | Foundation / Phase 2 FX |
| Payment status tracking | Phase 2 |
| Settlement & reconciliation | Phase 2–3 |
| ERP export | Phase 3 |

## Objects (planned)

- Invoice
- Credit note
- Payment
- FX rate snapshot
- Settlement batch

## Controls

- Segregation of duties: Sales cannot mark invoices paid without Finance
- Audit log on amount changes
- Immutable fiscal snapshots at invoice issue

## Role access

- Finance: invoices, payments, settlements
- Admin/Super Admin: oversight
- Buyer/Supplier: own invoices

## Related docs

- [019_ERP.md](./019_ERP.md)
- [008_PERMISSION.md](./008_PERMISSION.md)
