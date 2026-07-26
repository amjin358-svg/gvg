export const BUSINESS_NAV = [
  { label: "Business Dashboard", labelZh: "商務儀表板", href: "/business" },
  { label: "Company Profile", labelZh: "公司簡介", href: "/business/company-profile" },
  { label: "Vision", labelZh: "願景", href: "/business/vision" },
  { label: "Mission", labelZh: "使命", href: "/business/mission" },
  { label: "Business Model", labelZh: "商業模式", href: "/business/business-model" },
  { label: "Market Analysis", labelZh: "市場分析", href: "/business/market-analysis" },
  { label: "Business Plan", labelZh: "事業計劃", href: "/business/business-plan" },
  { label: "Investor Deck", labelZh: "投資人簡報", href: "/business/investor-deck" },
  { label: "E1 Plan", labelZh: "E1 計劃", href: "/business/e1-plan" },
  { label: "Roadmap", labelZh: "產品路線圖", href: "/business/roadmap" },
  { label: "Revenue Model", labelZh: "營收模型", href: "/business/revenue-model" },
  { label: "Partner Program", labelZh: "夥伴計畫", href: "/business/partner-program" },
] as const;

export const EXEC_KPIS = [
  { label: "設計合作夥伴", value: "3", hint: "Phase 1 目標" },
  { label: "平台模組", value: "20+", hint: "Foundation 已上線" },
  { label: "目標走廊", value: "US ↔ Asia", hint: "Beachhead" },
  { label: "下一里程碑", value: "Auth + RFQ", hint: "Phase 1" },
] as const;

export const TODAY_KPIS = [
  { label: "今日新 RFQ", value: "12", delta: "+3", tone: "up" },
  { label: "待審報價", value: "28", delta: "+5", tone: "up" },
  { label: "進行中訂單", value: "47", delta: "-2", tone: "down" },
  { label: "海關滞留", value: "3", delta: "0", tone: "flat" },
  { label: "AI 助理詢問", value: "86", delta: "+18", tone: "up" },
  { label: "新註冊供應商", value: "4", delta: "+1", tone: "up" },
] as const;

export const REVENUE_SNAPSHOT = [
  { label: "本月經常性收入 (MRR)", value: "US$ 48,200", hint: "SaaS 訂閱" },
  { label: "本月服務收入", value: "US$ 32,500", hint: "美國代採／OEM" },
  { label: "本季預估 GMV", value: "US$ 2.4M", hint: "平台促成交易" },
  { label: "毛利率（軟體）", value: "78%", hint: "示範數據" },
] as const;

export const DASHBOARD_PROJECTS = [
  {
    name: "Pacific Wellness OEM D3",
    owner: "Purchasing",
    status: "in_progress",
    progress: 72,
    due: "2026-08-15",
  },
  {
    name: "EuroTools Q4 Catalog",
    owner: "Sales",
    status: "negotiation",
    progress: 55,
    due: "2026-08-30",
  },
  {
    name: "US Hub Consolidation Pilot",
    owner: "Trade Ops",
    status: "on_track",
    progress: 40,
    due: "2026-09-10",
  },
  {
    name: "Supabase Auth Rollout",
    owner: "Engineering",
    status: "blocked",
    progress: 25,
    due: "2026-08-05",
  },
] as const;

export const TRADE_STATUS_BOARD = [
  { label: "Open RFQ", count: 18, href: "/rfq", tone: "info" },
  { label: "Quotes Pending", count: 28, href: "/quotes", tone: "warn" },
  { label: "Orders In Transit", count: 14, href: "/orders", tone: "accent" },
  { label: "Customs Hold", count: 3, href: "/customs", tone: "danger" },
  { label: "Delivered (7d)", count: 22, href: "/orders", tone: "success" },
] as const;

export const AI_SUMMARY_POINTS = [
  "今日熱門詢價品類：健康保健、五金工具；建議優先配置供應商回應人力。",
  "3 筆貨況處於 customs_hold，主要缺 HS／包裝清單；可啟動報關文件助理。",
  "AI 採購助理匹配成功率示範值 78%；OEM 服飾關鍵字需加強目錄標籤。",
  "本週建議動作：完成 Auth 設計夥伴導入、催收 2 家高潛力供應商報價。",
] as const;

export const RECENT_ACTIVITIES = [
  {
    time: "09:42",
    actor: "Sales",
    action: "建立 RFQ",
    detail: "Private-label vitamin D3 — Pacific Wellness",
  },
  {
    time: "09:15",
    actor: "Supplier",
    action: "提交報價",
    detail: "HarborCraft · Pro Torque Hex Bit Set",
  },
  {
    time: "08:50",
    actor: "Logistics",
    action: "更新貨況",
    detail: "GVG-OCN-778812 → in_transit",
  },
  {
    time: "08:20",
    actor: "AI Agent",
    action: "產生摘要",
    detail: "到岸成本估算 · Omega-3 → Los Angeles",
  },
  {
    time: "昨天",
    actor: "Admin",
    action: "邀請用戶",
    detail: "Business Customer · Sakura Home Retail",
  },
  {
    time: "昨天",
    actor: "Warehouse",
    action: "庫存調整",
    detail: "LAX-01 利用率 78% → 警示門檻接近",
  },
] as const;

export const ROADMAP_PHASES = [
  {
    phase: "Phase 0",
    title: "Foundation",
    status: "done",
    items: ["Next.js 15 平台骨架", "20 模組路由", "品牌／文件／商務套件", "AI 助理 Demo"],
  },
  {
    phase: "Phase 1",
    title: "Auth & Persistence",
    status: "next",
    items: ["Supabase Auth + RLS", "RFQ／Quote／Order 持久化", "供應商邀請流", "角色守衛 API"],
  },
  {
    phase: "Phase 2",
    title: "Trade OS Depth",
    status: "planned",
    items: ["WMS／物流里程碑", "CRM／CMS 資料化", "正式 AI 尋源", "Sentry／GA4"],
  },
  {
    phase: "Phase 3",
    title: "Scale & Integrations",
    status: "planned",
    items: ["承運商／Forwarder API", "OCR 報關", "ERP 匯出", "FX／支付深化"],
  },
] as const;

export const REVENUE_STREAMS = [
  {
    name: "SaaS 訂閱",
    timing: "近程",
    model: "依公司／席次／方案月繳或年繳",
    note: "主要經常性收入",
  },
  {
    name: "貿易賦能服務",
    timing: "近程",
    model: "美國代採、尋源顧問、OEM 專案費",
    note: "現金流 + 目錄冷啟動",
  },
  {
    name: "市集抽成",
    timing: "中程",
    model: "成交 GMV % 或每單固定費",
    note: "需供應／需求流動性",
  },
  {
    name: "加值模組",
    timing: "中長程",
    model: "AI Pack、OCR、ERP Connector",
    note: "擴張營收／提高 ARPU",
  },
] as const;

export const PARTNER_TIERS = [
  {
    name: "Supplier Partner",
    audience: "製造商／貿易商／品牌商",
    benefits: ["市集曝光", "詢價通知", "Verified 標章申請", "基礎分析"],
  },
  {
    name: "Logistics Partner",
    audience: "貨代／倉儲／清關",
    benefits: ["訂單／貨況串接", "推薦位", "共案報價", "API 優先"],
  },
  {
    name: "Solution Partner",
    audience: "顧問／系統整合商",
    benefits: ["轉介分潤", "共同提案", "訓練認證", "沙盒環境"],
  },
  {
    name: "Strategic Alliance",
    audience: "通路／金融／產業公協會",
    benefits: ["聯合 GTM", "專屬方案", "資料合作", "高層對口"],
  },
] as const;

export const INVESTOR_SLIDES = [
  { id: "01", title: "Title", body: "GVG Global Trade OS — Connect. Source. Ship. Scale." },
  { id: "02", title: "Problem", body: "工具碎片化、詢報價慢、到岸成本不透明、角色無共用系統。" },
  { id: "03", title: "Insight", body: "中型貿易商需要 Trade OS，而非單點市集或重型 ERP。" },
  { id: "04", title: "Solution", body: "市集 → RFQ → Quote → Order → WMS／物流／報關 → AI。" },
  { id: "05", title: "Product", body: "20+ 平台模組＋角色治理＋AI 採購助理。" },
  { id: "06", title: "Who pays", body: "進口商、品牌主、供應商、企業貿易桌。" },
  { id: "07", title: "Business model", body: "SaaS + 服務 + 抽成 + AI／合規加值。" },
  { id: "08", title: "Why now", body: "AI 可用於尋源／草稿；供應鏈多源化；ERP 對中市過重。" },
  { id: "09", title: "Moat", body: "流程深度、角色圖譜、走廊玩法、交易資料網絡效應。" },
  { id: "10", title: "GTM", body: "設計夥伴 → 供應商播種 → 美國代採楔入 → SEO／夥伴。" },
  { id: "11", title: "Status", body: "Foundation 完成；下一步 Auth＋持久化貿易物件。" },
  { id: "12", title: "Roadmap", body: "Phase 1–3：Auth → Depth → Scale。" },
  { id: "13", title: "Team", body: "產品工程、貿易營運、供應商成功（待補 bios）。" },
  { id: "14", title: "The Ask", body: "資金用於工程、合規、導入、雲端安全、GTM（金額待定）。" },
  { id: "15", title: "Close", body: "跨境中市貿易的作業系統。" },
] as const;
