# Training Manual — GVG Global Trade OS

**Document:** Training Manual  
**Audience:** New hires, pilot customers, supplier admins  
**System:** GVG Global Trade OS  
**Companion docs:** Operation Manual · SOP · Company Profile

---

## 1. How to use this manual

1. Complete **Module A** (everyone)  
2. Complete role track (Buyer / Supplier / Ops / Admin)  
3. Practice in **staging** before production  
4. Pass the role checklist with a mentor sign-off  

---

## Module A — Platform fundamentals (everyone)

### A1. What GVG is

Global Vista Group operates **Global Trade OS** — a system to **Connect. Source. Ship. Scale.** across marketplace, trade, logistics, and AI-assisted procurement.

### A2. Core lifecycle

```
Discover → RFQ → Quote → Order → Warehouse/Inventory
  → Logistics → Customs → Deliver → (Finance)
```

### A3. Roles overview

Guest, Customer, Business Customer, Supplier, Sales, Purchasing, Warehouse, Finance, Admin, Super Admin, AI Agent.

Learn only the roles you will use; never ask for Super Admin “just in case.”

### A4. Navigation tour

- Marketplace: Products, Categories, Brands, News  
- Trade: RFQ, Quotes, Orders, Procurement  
- Portals: Customer / Supplier  
- Ops: Inventory, Warehouses, Logistics, Customs  
- Intelligence: AI Assistant  
- Control: CRM, CMS, Analytics, Admin  

### A5. Golden rules

- Status fields must reflect reality  
- Do not paste secrets into AI chat  
- AI drafts; humans approve compliance-critical data  
- If unsure, escalate via SOP — do not invent process  

**Checkpoint A:** Explain the lifecycle and locate RFQ + Orders + AI pages.

---

## Module B — Buyer track (Customer / Business Customer / Purchasing)

### B1. Find products

Search/browse categories; open product detail; note MOQ, lead time, origin, tags.

### B2. Create an RFQ

Required: title, category, quantity, destination; optional target price.  
Use AI Assistant to draft, then edit for accuracy.

### B3. Compare quotes

Compare unit price, lead time, validity, supplier notes/Incoterms.

### B4. Award & confirm order

Award quote → confirm order fields → monitor status/ETA.

### B5. Track shipment & customs

Read logistics statuses; respond quickly if docs requested.

**Buyer checklist**

- [ ] Create sample RFQ in staging  
- [ ] Review at least two quotes  
- [ ] Explain when not to trust AI landed-cost blindly  
- [ ] Update CRM next-action if Sales-assisted  

---

## Module C — Supplier track

### C1. Complete company profile

Legal name, countries, categories, certifications.

### C2. Catalog quality

Every SKU needs: clear name, MOQ, price, lead time, origin, honest stock/MTO flag.

### C3. Respond to RFQs (SOP-04)

Respond before due date; include validity window.

### C4. Fulfillment visibility

Keep lead times current; coordinate warehouse/production updates.

**Supplier checklist**

- [ ] Publish or verify 3 SKUs  
- [ ] Submit one complete quote  
- [ ] Describe quote SLA  

---

## Module D — Operations track (Warehouse / Logistics / Trade Ops)

### D1. Inventory & warehouses

Read utilization; understand reserve vs available (as enabled).

### D2. Logistics milestones

Book → in transit → customs hold → delivered. Update same day as events.

### D3. Customs packet (SOP-08)

Invoice, packing list, HS (human-approved), COO when needed.

### D4. US purchasing (SOP-09)

Buy → receive → consolidate → export handoff.

**Ops checklist**

- [ ] Walk a mock shipment through statuses  
- [ ] List customs packet contents  
- [ ] Identify P1 vs P3 incidents  

---

## Module E — Admin / Sales / Finance track

### E1. CRM hygiene

Every account has type, owner, stage, next action.

### E2. CMS / News

Publish only approved content; preview before prod.

### E3. Role administration

Invite, role-change, offboard same day. Monthly access review.

### E4. Finance readiness

Understand order totals, invoice phases, and who can mark paid (segregation of duties).

**Admin checklist**

- [ ] Invite a user with least privilege  
- [ ] Complete a role audit sample  
- [ ] Locate analytics summary KPIs  

---

## Module F — AI Assistant literacy

1. Good prompts are specific (category, budget, destination)  
2. Verify matched SKUs before RFQ publish  
3. Landed-cost outputs are estimates  
4. Never paste API keys, passports, or unrestricted party lists into prompts  
5. Escalate weird/harmful outputs to AI Ops  

---

## 2. Training schedule (suggested)

| Day | Agenda |
|---|---|
| Day 1 | Module A + environment access |
| Day 2 | Role track (B/C/D/E) hands-on |
| Day 3 | SOP shadowing + checklist sign-off |
| Day 30 | Refresher: incidents, customs, AI misuse |

## 3. Sign-off form (copy into HR/ops tool)

| Field | Value |
|---|---|
| Trainee | |
| Role | |
| Mentor | |
| Modules completed | |
| Staging exercises | Pass / Fail |
| Production access granted | Yes / No |
| Date | |

## Related

- [SOP](./SOP.md)
- [Operation Manual](./OPERATION_MANUAL.md)
- [Company Profile](./COMPANY_PROFILE.md)
- Permissions: `docs/008_PERMISSION.md`
