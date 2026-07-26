# 022 — Logistics

## Module

Route: `/logistics` (+ Customs `/customs`)

## Shipment model

| Field | Description |
|---|---|
| tracking_number | Carrier / internal id |
| mode | ocean · air · rail · truck |
| origin / destination | Ports or hubs |
| status | booked · in_transit · customs_hold · delivered |
| etd / eta | Schedule |

## Modes supported

Ocean · Air · Rail · Truck

## Customs documentation

Document types:

- Commercial Invoice
- Packing List
- HS Code Classification
- Certificate of Origin

AI assists classification; human confirmation required before filing.

## Operational flow

```
Book transport → Depart → In transit → Arrival
  → Customs clearance → Last mile → Delivered
```

## Integrations (Phase 2+)

- Carrier tracking APIs
- Freight forwarder EDI/webhooks
- Automated milestone emails/notifications

## Related docs

- [017_GLOBAL_TRADE.md](./017_GLOBAL_TRADE.md)
- [018_SUPPLY_CHAIN.md](./018_SUPPLY_CHAIN.md)
- [015_AI_AGENT.md](./015_AI_AGENT.md)
