# SOP — Standard Operating Procedures

**Company:** Global Vista Group  
**System:** GVG Global Trade OS  
**Audience:** Operators executing repeatable workflows

Each SOP uses: **Purpose · Roles · Preconditions · Steps · Outputs · Exceptions**

---

## SOP-01 Onboard Business Customer

**Purpose:** Activate a buyer company with correct roles.  
**Roles:** Admin, Sales  
**Preconditions:** Signed agreement / pilot approval  

1. Create company record in CRM  
2. Invite primary user (role `business_customer` or `customer`)  
3. Assign Sales owner  
4. Enable modules per contract (Trade, AI, etc.)  
5. Send welcome + training link  
**Output:** Active account + owner  
**Exceptions:** Credit hold → Finance approval before order rights

## SOP-02 Onboard Supplier

**Purpose:** Enable quoting and catalog publishing.  
**Roles:** Admin, Supplier Success, Purchasing  

1. Collect company legal name, countries, categories, certifications  
2. Invite supplier admin (`supplier`)  
3. Verify sample products (SKU, MOQ, lead time, origin)  
4. Set quote SLA expectations  
5. Mark supplier status: Pending → Verified  
**Output:** Verified supplier capable of quote response  
**Exceptions:** Missing certs for regulated categories → limited listing

## SOP-03 Create & Route RFQ

**Purpose:** Capture demand and notify suitable suppliers.  
**Roles:** Buyer, Purchasing, AI Assistant (draft only)  

1. Buyer creates RFQ (title, category, qty, destination, target price)  
2. Purchasing reviews completeness  
3. Optional: AI suggests suppliers / draft improvements  
4. Invite / open RFQ to matched suppliers  
5. Set due date; start SLA clock  
**Output:** RFQ status `open`  
**Exceptions:** Restricted item → compliance review before open

## SOP-04 Supplier Quote Response

**Purpose:** Collect comparable quotes.  
**Roles:** Supplier, Purchasing  

1. Supplier opens invited RFQ  
2. Submit unit price, currency, lead time, validity, notes/Incoterms  
3. Purchasing validates required fields  
4. Status → `sent`  
**Output:** Comparable quote records  
**Exceptions:** Incomplete quote → return to supplier

## SOP-05 Quote Award → Order

**Purpose:** Convert commercial agreement to order.  
**Roles:** Buyer / Purchasing, Sales, Finance (if credit checks)  

1. Compare shortlisted quotes  
2. Award winning quote (`accepted`)  
3. Create order from award (qty, price, parties, ETA draft)  
4. Confirm Incoterms & payment terms  
5. Order status → `confirmed`  
**Output:** Confirmed order  
**Exceptions:** Price change after award → re-approve delta

## SOP-06 Inventory Reserve & Warehouse Handoff

**Purpose:** Align stock/production with confirmed order.  
**Roles:** Warehouse, Purchasing, Supplier  

1. Check inventory availability by SKU/warehouse  
2. Reserve qty or create production/PO request  
3. Update order notes with warehouse code  
4. Schedule pick/pack or inbound receipt  
**Output:** Reservation or production plan linked to order  
**Exceptions:** Stockout → ETA revision + buyer notify same day

## SOP-07 Logistics Booking & Tracking

**Purpose:** Move goods with visible milestones.  
**Roles:** Logistics, Warehouse  

1. Book mode (ocean/air/rail/truck)  
2. Enter tracking number, ETD/ETA, origin/destination  
3. Update status: `booked` → `in_transit` → … → `delivered`  
4. Notify buyer on exceptions  
**Output:** Live shipment record  
**Exceptions:** `customs_hold` → trigger SOP-08

## SOP-08 Customs Documentation Packet

**Purpose:** Prepare clearance-ready documents.  
**Roles:** Logistics, Purchasing, Finance; AI assists  

1. Assemble commercial invoice + packing list  
2. Confirm HS codes (AI suggestion + human approval)  
3. Attach COO if applicable  
4. Link packet to order/shipment  
5. Clear hold when docs accepted  
**Output:** Document packet + status update  
**Exceptions:** HS dispute → escalate compliance advisor

## SOP-09 US Purchasing Consolidation

**Purpose:** Execute US buy → consolidate → export.  
**Roles:** Purchasing, Warehouse (US hub), Finance  

1. Validate buyer PO / RFQ award  
2. Place US vendor purchases  
3. Receive into US hub; QC checklist  
4. Consolidate cartons; create export packet  
5. Hand off to logistics booking (SOP-07)  
**Output:** Consolidated export shipment  
**Exceptions:** Vendor delay → revise ETA + buyer ack

## SOP-10 Incident Response (Platform)

**Purpose:** Restore service and communicate.  
**Roles:** Admin, Engineering on-call  

1. Detect / confirm severity (see Operation Manual)  
2. Acknowledge in channel; assign commander  
3. Mitigate (rollback/feature flag)  
4. Customer comms if user-facing  
5. Postmortem for P1/P2 within 72h  
**Output:** Restored service + write-up  

---

## SOP index (quick)

| ID | Name |
|---|---|
| SOP-01 | Onboard Business Customer |
| SOP-02 | Onboard Supplier |
| SOP-03 | Create & Route RFQ |
| SOP-04 | Supplier Quote Response |
| SOP-05 | Quote Award → Order |
| SOP-06 | Inventory Reserve & WH Handoff |
| SOP-07 | Logistics Booking & Tracking |
| SOP-08 | Customs Documentation Packet |
| SOP-09 | US Purchasing Consolidation |
| SOP-10 | Incident Response |

## Related

- [Operation Manual](./OPERATION_MANUAL.md)
- [Training Manual](./TRAINING_MANUAL.md)
