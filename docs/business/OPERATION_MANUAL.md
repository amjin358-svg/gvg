# Operation Manual — GVG Global Trade OS

**Document:** Operation Manual  
**Owner:** Trade Operations + Platform Admin  
**Audience:** Internal operators, CS, warehouse leads, finance ops  
**Product:** GVG Global Trade OS v1.0+

---

## 1. Purpose

Define how Global Vista Group runs day-to-day platform and trade operations safely, consistently, and auditably.

## 2. Operating principles

1. **System of record first** — if it is not in Trade OS, it is not official  
2. **Role least privilege** — grant only required access  
3. **Human confirms compliance** — AI assists; humans approve customs-critical actions  
4. **Customer-visible status** — keep RFQ/order/shipment states current  
5. **Document everything material** — quotes, changes, holds, credits  

## 3. Org functions

| Function | Responsibilities |
|---|---|
| Platform Admin | Roles, CMS, module health, incidents |
| Trade Ops / Purchasing | RFQ triage, supplier matching, OEM programs |
| Sales | Accounts, opportunities, quote coaching |
| Supplier Success | Catalog quality, onboarding, response SLAs |
| Warehouse | Inventory accuracy, receiving, utilization |
| Logistics | Booking milestones, customs packet readiness |
| Finance | Invoices/settlements (as enabled), credit checks |
| AI Ops | Prompt quality, tool evals, abuse monitoring |

## 4. Daily operating rhythm

### Morning

- Check failed jobs / Sentry (when live)  
- Review open RFQs aging > SLA  
- Review shipments in `customs_hold` / exceptions  
- Confirm warehouse priority orders  

### Midday

- Supplier quote follow-ups  
- Buyer clarifications (specs, MOQ, Incoterms)  
- Catalog QA sampling  

### End of day

- Update blocked orders  
- Handoff notes for next shift / region  
- Log incidents in tracker  

## 5. Environments & access

| Env | Use |
|---|---|
| Production | Real customers |
| Staging | UAT / training |
| Local / Preview | Engineering |

Access via Supabase Auth roles. Never share service-role keys. Offboard same day as employment/contract end.

## 6. Module operations cheat sheet

| Module | Ops focus |
|---|---|
| Products/Brands | Data completeness, certifications tags |
| RFQ | SLA clocks, category routing |
| Quotes | Completeness (price, LT, validity) |
| Orders | Status hygiene, ETA honesty |
| Inventory/WH | Accuracy, utilization alerts |
| Logistics | Milestone updates |
| Customs | Packet checklist before file |
| CRM | Owner hygiene, next action dates |
| AI | Review escalations / bad answers |
| Admin | Role audits monthly |

## 7. SLA targets (starter — adjust per contract)

| Item | Target |
|---|---|
| RFQ first response | < 1 business day |
| Quote completeness review | < 4 business hours after submit |
| Shipment status update | Same day as carrier event |
| P1 platform outage ack | < 30 minutes |
| Catalog critical error fix | < 1 business day |

## 8. Incident severity

| Sev | Example | Response |
|---|---|---|
| P1 | Checkout/order create down; data leak | Page on-call; exec notify |
| P2 | RFQ submit broken for segment | Same-day fix |
| P3 | UI defect non-blocking | Backlog |
| P4 | Cosmetic | Weekly triage |

## 9. Compliance & records

- Retain commercial records per jurisdiction policy (define with legal)  
- Customs filings require dual control when amounts exceed threshold (_set threshold_)  
- AI HS suggestions require human approval  

## 10. Related manuals

- [SOP](./SOP.md) — step procedures  
- [Training Manual](./TRAINING_MANUAL.md) — role onboarding  
- Engineering: `docs/008_PERMISSION.md`, `docs/025_DEPLOYMENT.md`
