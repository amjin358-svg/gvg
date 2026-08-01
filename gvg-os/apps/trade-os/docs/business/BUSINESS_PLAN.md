# Business Plan — Global Vista Group / GVG Global Trade OS

**Document:** Full Business Plan  
**Version:** 1.0 (aligned to platform foundation)  
**Company:** Global Vista Group (GVG)

---

## 1. Executive summary

Global Vista Group is building **GVG Global Trade OS**, an enterprise-grade B2B/B2C international trading platform. The product consolidates marketplace discovery, RFQ/quoting, orders, procurement programs (including US purchasing and OEM/ODM), inventory/warehousing, logistics, customs documentation, CRM, analytics, and an AI Procurement Assistant into a single role-based operating system.

**Vision:** Become the default Trade OS for cross-border mid-market operators who outgrew spreadsheets but cannot absorb heavyweight ERP complexity.

## 2. Problem

1. **Tool fragmentation** — sourcing, CRM, WMS, freight, and customs live in separate systems  
2. **Slow trade cycles** — RFQ/quote comparison is manual and lossy  
3. **Landed-cost opacity** — freight + duty discovered too late  
4. **Role chaos** — buyers, suppliers, warehouse, finance lack a shared system of record  
5. **Compliance burden** — HS, COO, invoicing packets are error-prone  

## 3. Solution

A modular Trade OS with:

- Public marketplace + authenticated portals  
- Trade lifecycle objects: RFQ, Quote, Order  
- Supply-chain modules: Inventory, Warehouses, Logistics, Customs  
- AI assistant for matching, drafting, cost estimation  
- Enterprise controls: RBAC (11 roles), admin, analytics, audit-ready design  

## 4. Market

### 4.1 Categories we serve

Health supplements, packaged foods, household goods, hardware & tools, home improvement, furniture, branded apparel, OEM/ODM.

### 4.2 Customer segments

| Segment | Pain | Willingness to pay |
|---|---|---|
| Import distributors | Multi-supplier chaos | High (time + error cost) |
| DTC / retail brands | OEM sampling & MOQ | Medium–high |
| Contract manufacturers | Quote/order visibility | Medium (seat + leads) |
| Purchasing agents | US buy & consolidate | Service + platform |

### 4.3 Positioning

Not a generic Shopify clone. Not a full ERP on day one.  
**Category:** Trade Operating System (marketplace + ops + AI).

## 5. Products & services

### 5.1 Software (SaaS)

- Starter / Growth / Enterprise seat bundles  
- Module packs (Trade, WMS, AI, Finance connectors)  

### 5.2 Enabled services

- US Purchasing Service  
- Global procurement programs  
- OEM/ODM project coordination  
- Customs documentation assistance (platform + ops)  

## 6. Business model

| Revenue | Driver | Notes |
|---|---|---|
| Subscriptions | Companies × seats × tier | Primary near-term |
| Services | Retainers / project fees | Cashflow + catalog seed |
| Take-rate | % GMV or per-order | After liquidity |
| Add-ons | AI, OCR, ERP sync | Expansion revenue |

Pricing hypothesis (to validate):

- Buyer Growth: mid-hundreds USD / month  
- Enterprise: custom  
- Supplier: freemium → paid featured / advanced quoting  

## 7. Go-to-market

1. **Design partners** — 3–5 accounts shaping RFQ/order UX  
2. **Supply seeding** — onboard verified suppliers in 2–3 verticals  
3. **Corridor wedge** — US purchasing + Asia OEM  
4. **Content / SEO / GEO** — category and corridor pages  
5. **Partnerships** — freight forwarders, inspectors, payment providers  

## 8. Competition

| Type | Examples (illustrative) | GVG contrast |
|---|---|---|
| B2B marketplaces | Alibaba-class portals | Deeper ops + roles + AI OS |
| ERP / trade modules | NetSuite-class suites | Faster mid-market time-to-value |
| Point tools | Freight / WMS / CRM silos | Unified trade lifecycle |
| Agency sourcing | Manual trading desks | Software leverage + auditability |

## 9. Operations plan

See [Operation Manual](./OPERATION_MANUAL.md) and [SOP](./SOP.md).

Key functions: Product & Eng · Trade Ops · Supplier Success · Customer Success · Finance · Compliance advisor.

## 10. Technology plan

Stack: Next.js 15, React 19, TypeScript, Supabase, Vercel, Cloudflare, OpenAI.  
Delivery phases: Foundation → Auth/persistence → Trade depth → Scale/integrations  
Detail: `docs/002`–`docs/003`, `docs/026`.

## 11. Financial plan (framework)

Build a 24-month model with:

- SaaS MRR  
- Services revenue  
- Gross margin (software vs services)  
- CAC / payback (after GTM starts)  
- Infrastructure COGS  
- Headcount plan  

_Do not publish unverified revenue forecasts externally until finance signs off._

## 12. Milestones

| Phase | Outcome |
|---|---|
| Phase 0 | Product foundation + docs (current) |
| Phase 1 | Auth, RLS, persistent trade objects |
| Phase 2 | WMS/logistics/CRM/AI production |
| Phase 3 | Carriers, OCR, ERP export, scale |

## 13. Risks

Regulatory/compliance · Cold start · Credit/payment risk · Data quality · Key-person risk  

Mitigations: human-in-loop customs, services-led seeding, staged payments, supplier QA, documented SOPs/training.

## 14. Ask / next decisions

1. Finalize legal entity profile fields  
2. Lock E1 pricing experiments  
3. Approve Phase 1 eng budget  
4. Select first design partners  

## Related

- [E1 Business Plan](./E1_BUSINESS_PLAN.md)
- [Investor Deck](./INVESTOR_DECK.md)
- [Company Profile](./COMPANY_PROFILE.md)
