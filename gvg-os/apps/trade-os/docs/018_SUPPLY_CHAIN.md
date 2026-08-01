# 018 — Supply Chain

## Scope

Operational flow from confirmed order to delivered goods across warehouses, inventory, logistics, and customs.

## Components

| System | Doc |
|---|---|
| WMS / Inventory | [021_WMS.md](./021_WMS.md) |
| Logistics | [022_LOGISTICS.md](./022_LOGISTICS.md) |
| Customs | part of Global Trade + Logistics |
| Procurement execution | Orders + supplier portal |

## Control tower view (Analytics)

- Open orders by status
- Shipments in transit / customs hold
- Warehouse utilization
- OTIF (on-time in-full) — Phase 2 KPI

## Events

| Event | Downstream |
|---|---|
| `order.confirmed` | Reserve inventory / create production request |
| `shipment.booked` | Attach tracking |
| `shipment.customs_hold` | Notify buyer + finance |
| `shipment.delivered` | Trigger invoice settlement window |

## Related docs

- [021_WMS.md](./021_WMS.md)
- [022_LOGISTICS.md](./022_LOGISTICS.md)
- [024_ANALYTICS.md](./024_ANALYTICS.md)
