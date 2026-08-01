export const OPS_NAV = [
  { label: "Operations Dashboard", labelZh: "營運儀表板", href: "/operations" },
  { label: "Today's Orders", labelZh: "今日訂單", href: "/operations/orders" },
  { label: "Today's Shipment", labelZh: "今日出貨", href: "/operations/shipments" },
  { label: "Warehouse", labelZh: "倉庫", href: "/operations/warehouse" },
  { label: "Revenue", labelZh: "營收", href: "/operations/revenue" },
  { label: "Supplier", labelZh: "供應商", href: "/operations/supplier" },
  { label: "Customer", labelZh: "客戶", href: "/operations/customer" },
  { label: "Inventory", labelZh: "庫存", href: "/operations/inventory" },
  { label: "AI Insight", labelZh: "AI 洞察", href: "/operations/ai-insight" },
] as const;

export const OPS_MODULE_NAV = [
  { label: "ERP", labelZh: "ERP", href: "/operations/erp" },
  { label: "CRM", labelZh: "CRM", href: "/operations/crm" },
  { label: "WMS", labelZh: "WMS", href: "/operations/wms" },
  { label: "Marketplace", labelZh: "市集", href: "/operations/marketplace" },
  { label: "Trade Center", labelZh: "貿易中心", href: "/operations/trade-center" },
  { label: "Procurement", labelZh: "採購", href: "/operations/procurement" },
  { label: "Finance", labelZh: "財務", href: "/operations/finance" },
  { label: "Analytics", labelZh: "分析", href: "/operations/analytics" },
  { label: "AI Center", labelZh: "AI 中心", href: "/operations/ai-center" },
] as const;

export const TODAY_ORDERS = [
  {
    orderNumber: "GVG-2026-88602",
    buyer: "EuroTools Distribution",
    supplier: "HarborCraft Manufacturing",
    amount: "US$ 189,600",
    status: "confirmed",
  },
  {
    orderNumber: "GVG-2026-88618",
    buyer: "Pacific Wellness Co.",
    supplier: "VistaWell Labs",
    amount: "US$ 42,800",
    status: "pending",
  },
  {
    orderNumber: "GVG-2026-88621",
    buyer: "Sakura Home Retail",
    supplier: "NordicNest Home",
    amount: "US$ 18,240",
    status: "confirmed",
  },
] as const;

export const TODAY_SHIPMENTS = [
  {
    tracking: "GVG-OCN-778812",
    lane: "Kaohsiung → Los Angeles",
    mode: "ocean",
    status: "in_transit",
    eta: "2026-07-30",
  },
  {
    tracking: "GVG-AIR-441290",
    lane: "Ho Chi Minh → Frankfurt",
    mode: "air",
    status: "customs_hold",
    eta: "2026-07-24",
  },
  {
    tracking: "GVG-TRK-992101",
    lane: "Rotterdam → Munich",
    mode: "truck",
    status: "booked",
    eta: "2026-07-27",
  },
] as const;

export const REVENUE_TODAY = [
  { label: "今日成交", value: "US$ 250,640", hint: "3 筆新訂單" },
  { label: "本月營收", value: "US$ 1.84M", hint: "GMV + 服務" },
  { label: "待收款", value: "US$ 420k", hint: "AR open" },
  { label: "毛利率", value: "24%", hint: "示範加權" },
] as const;

export const SUPPLIER_BOARD = [
  { name: "HarborCraft Manufacturing", region: "Taiwan", score: "A", openQuotes: 6 },
  { name: "VistaWell Labs", region: "USA", score: "A-", openQuotes: 3 },
  { name: "NordicNest Home", region: "EU", score: "B+", openQuotes: 2 },
  { name: "Sakura Components", region: "Japan", score: "A", openQuotes: 1 },
] as const;

export const CUSTOMER_BOARD = [
  { name: "EuroTools Distribution", type: "Business Customer", stage: "Negotiation", owner: "Sales" },
  { name: "Pacific Wellness Co.", type: "Business Customer", stage: "Active", owner: "Sales" },
  { name: "Sakura Home Retail", type: "Customer", stage: "Active", owner: "Sales" },
  { name: "Alpine Outdoor GmbH", type: "Business Customer", stage: "Prospect", owner: "Purchasing" },
] as const;

export const INVENTORY_BOARD = [
  { sku: "GVG-HS-4401", name: "Omega-3 Softgel 1000mg", warehouse: "LAX-01", qty: 12800, status: "healthy" },
  { sku: "GVG-HW-2208", name: "Pro Torque Hex Bit Set", warehouse: "KHH-01", qty: 940, status: "low" },
  { sku: "GVG-HH-1180", name: "Ceramic Storage Canister Trio", warehouse: "RTM-01", qty: 2100, status: "healthy" },
  { sku: "GVG-AP-3302", name: "Branded Tee Blank Assortment", warehouse: "LAX-01", qty: 120, status: "critical" },
] as const;

export const AI_INSIGHTS = [
  "今日出貨風險：GVG-AIR-441290 卡關，建議優先補齊 HS／packing list。",
  "HarborCraft 對五金工具 RFQ 回應最快；可提高該供應商配額。",
  "LAX-01 利用率 78%，建議將低周轉服飾 SKU 轉運 KHH 或促銷出清。",
  "EuroTools 大單確認後，預估本週營收可再上修約 US$ 90k。",
] as const;

export const OPS_MODULES = [
  {
    label: "ERP",
    labelZh: "ERP",
    href: "/operations/erp",
    liveHref: "/orders",
    doc: "docs/019_ERP.md",
    summary: "Trade-ops ERP-lite：品項、訂單、採購意圖與庫存銜接。",
    kpis: [
      { label: "Open orders", value: "47" },
      { label: "SKU master", value: "10k+" },
    ],
  },
  {
    label: "CRM",
    labelZh: "CRM",
    href: "/operations/crm",
    liveHref: "/crm",
    doc: "docs/020_CRM.md",
    summary: "買方／供應商帳戶、商機與活動軌跡。",
    kpis: [
      { label: "Accounts", value: "128" },
      { label: "Active pipeline", value: "36" },
    ],
  },
  {
    label: "WMS",
    labelZh: "WMS",
    href: "/operations/wms",
    liveHref: "/warehouses",
    doc: "docs/021_WMS.md",
    summary: "倉庫主檔、庫存餘額、收發與利用率。",
    kpis: [
      { label: "Hubs", value: "6" },
      { label: "Avg utilization", value: "72%" },
    ],
  },
  {
    label: "Marketplace",
    labelZh: "市集",
    href: "/operations/marketplace",
    liveHref: "/marketplace",
    doc: "docs/016_MARKETPLACE.md",
    summary: "產品、分類、品牌與供應商發現面。",
    kpis: [
      { label: "Products", value: "10k+" },
      { label: "Suppliers", value: "5k+" },
    ],
  },
  {
    label: "Trade Center",
    labelZh: "貿易中心",
    href: "/operations/trade-center",
    liveHref: "/trade",
    doc: "docs/017_GLOBAL_TRADE.md",
    summary: "進出口、RFQ→Quote→Order、物流與報關。",
    kpis: [
      { label: "Open RFQ", value: "18" },
      { label: "In transit", value: "14" },
    ],
  },
  {
    label: "Procurement",
    labelZh: "採購",
    href: "/operations/procurement",
    liveHref: "/procurement",
    doc: "docs/018_SUPPLY_CHAIN.md",
    summary: "全球尋源、OEM／ODM、美國代採方案。",
    kpis: [
      { label: "Active programs", value: "12" },
      { label: "OEM samples", value: "9" },
    ],
  },
  {
    label: "Finance",
    labelZh: "財務",
    href: "/operations/finance",
    liveHref: "/finance",
    doc: "docs/023_FINANCE.md",
    summary: "訂單金額可視、發票／收款（Phase 2）與職能分離。",
    kpis: [
      { label: "AR open", value: "US$ 420k" },
      { label: "Invoices (demo)", value: "64" },
    ],
  },
  {
    label: "Analytics",
    labelZh: "分析",
    href: "/operations/analytics",
    liveHref: "/analytics",
    doc: "docs/024_ANALYTICS.md",
    summary: "營運 KPI、轉換漏斗與監控儀表。",
    kpis: [
      { label: "Conversion", value: "18%" },
      { label: "Customs hold", value: "3" },
    ],
  },
  {
    label: "AI Center",
    labelZh: "AI 中心",
    href: "/operations/ai-center",
    liveHref: "/ai",
    doc: "docs/015_AI_AGENT.md",
    summary: "採購助理、供應商匹配、落地成本與 HS 提示。",
    kpis: [
      { label: "Assist queries", value: "86" },
      { label: "Match rate", value: "78%" },
    ],
  },
] as const;

export const ERP_DOMAINS = [
  { domain: "Item master", coverage: "Products / SKUs" },
  { domain: "Vendors / customers", coverage: "CRM accounts + profiles" },
  { domain: "Sales orders", coverage: "Orders module" },
  { domain: "Purchase intents", coverage: "RFQ / procurement" },
  { domain: "Inventory", coverage: "WMS balances" },
  { domain: "Basic invoicing", coverage: "Finance (Phase 2)" },
] as const;

export const CRM_ACCOUNTS = [
  { name: "Pacific Wellness Co.", type: "Business Customer", owner: "Sales", stage: "Active" },
  { name: "HarborCraft Manufacturing", type: "Supplier", owner: "Purchasing", stage: "Preferred" },
  { name: "EuroTools Distribution", type: "Business Customer", owner: "Sales", stage: "Negotiation" },
  { name: "Sakura Home Retail", type: "Customer", owner: "Sales", stage: "Active" },
] as const;

export const WMS_PROCESSES = [
  { name: "Receive", detail: "Inbound ASN / PO receipt" },
  { name: "Putaway", detail: "Location assignment" },
  { name: "Reserve", detail: "On order confirm" },
  { name: "Pick / Pack", detail: "Outbound wave (Phase 2)" },
  { name: "Adjust", detail: "Cycle count variance" },
] as const;

export const TRADE_FLOW = [
  { step: "01", title: "RFQ", href: "/rfq" },
  { step: "02", title: "Quote", href: "/quotes" },
  { step: "03", title: "Order", href: "/orders" },
  { step: "04", title: "Logistics", href: "/logistics" },
  { step: "05", title: "Customs", href: "/customs" },
] as const;

export const PROCUREMENT_PROGRAMS = [
  { name: "US Purchasing Service", detail: "代採、集貨、出口" },
  { name: "OEM / ODM", detail: "私有品牌打樣到量產" },
  { name: "Global Sourcing", detail: "跨區供應商開發與比價" },
  { name: "Compliance Assist", detail: "文件與法規協作" },
] as const;

export const FINANCE_CAPABILITIES = [
  { name: "Order value visibility", phase: "Foundation" },
  { name: "Invoice from orders", phase: "Phase 2" },
  { name: "Payment status", phase: "Phase 2" },
  { name: "Settlement & reconciliation", phase: "Phase 2–3" },
  { name: "ERP export", phase: "Phase 3" },
] as const;

export const ANALYTICS_KPIS = [
  { label: "Open RFQs", value: "18" },
  { label: "Active orders", value: "47" },
  { label: "Shipments moving", value: "14" },
  { label: "Warehouse util.", value: "72%" },
] as const;

export const AI_CAPABILITIES = [
  { name: "Supplier matching", detail: "自然語言排序供應商／SKU" },
  { name: "RFQ drafting", detail: "結構化詢價草稿" },
  { name: "Landed-cost estimate", detail: "單價 + 運費 + 稅費啟發式" },
  { name: "HS hints", detail: "HS 族建議（需專家覆核）" },
  { name: "OCR / Translation", detail: "Phase 2 報關與在地化" },
] as const;

export const OPS_ALERTS = [
  { tone: "warn", text: "3 筆貨況 customs hold — 缺 HS／包裝清單" },
  { tone: "info", text: "12 筆今日新 RFQ，健康保健與五金工具為主" },
  { tone: "ok", text: "CI lint/test/build 綠燈；等待 Staging Supabase" },
] as const;
