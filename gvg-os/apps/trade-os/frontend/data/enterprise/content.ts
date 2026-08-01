export const ENTERPRISE_PILLARS = [
  {
    label: "Business",
    labelZh: "商務",
    href: "/business",
    detail: "儀表板 · 策略 · 投資人文件",
  },
  {
    label: "Design",
    labelZh: "設計",
    href: "/design",
    detail: "標誌 · 色彩 · UI Kit · 預覽",
  },
  {
    label: "Development",
    labelZh: "開發",
    href: "/development",
    detail: "Sprint · API · Database · Deploy",
  },
  {
    label: "Operations",
    labelZh: "營運",
    href: "/operations",
    detail: "訂單 · 出貨 · 倉庫 · AI 洞察",
  },
] as const;

export const ENTERPRISE_SURFACES = [
  {
    label: "Marketplace",
    labelZh: "市集",
    href: "/marketplace",
    detail: "供應商與熱銷商品",
  },
  {
    label: "Trade Center",
    labelZh: "貿易中心",
    href: "/trade",
    detail: "進出口 · RFQ · 合規",
  },
  {
    label: "AI Center",
    labelZh: "AI 中心",
    href: "/ai",
    detail: "採購助理與智慧服務",
  },
  {
    label: "Analytics",
    labelZh: "分析",
    href: "/analytics",
    detail: "KPI · 轉換 · 監控",
  },
] as const;

export const ENTERPRISE_KPIS = [
  { label: "今日新 RFQ", value: "12", delta: "+3" },
  { label: "進行中訂單", value: "47", delta: "-2" },
  { label: "在途貨況", value: "14", delta: "+1" },
  { label: "今日營收", value: "US$ 250k", delta: "+18%" },
] as const;

export const ENTERPRISE_AI_SUMMARY = [
  "今日熱門詢價：健康保健、五金工具；建議優先配置供應商回應人力。",
  "1 筆空運 customs hold（GVG-AIR-441290）— 缺 HS／包裝清單。",
  "EuroTools 大單已確認；本週營收可上修約 US$ 90k。",
] as const;
