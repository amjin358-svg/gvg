export const BRAND = {
  short: "GVG",
  nameZh: "環球視界集團",
  nameEn: "Global Vista Group",
  heroZh: "從全球視野，連到每一條貿易航線",
  heroEn: "From global vista to every trade lane",
  leadZh: "宇宙尺度看市場，港口節奏做履約——同一套海軍藍與金線語言。",
  leadEn: "Market scale in orbit. Fulfillment at the port.",
};

export const NAV = [
  { href: "#observe", label: "全球視野", en: "Vista" },
  { href: "#orbit", label: "貿易航線", en: "Routes" },
  { href: "#ground", label: "履約落地", en: "Port" },
  { href: "#services", label: "核心服務", en: "Services" },
  { href: "#contact", label: "聯絡詢價", en: "Contact" },
] as const;

export const ROUTES = [
  { from: "USA", to: "Taiwan", zh: "美西 ↔ 台灣" },
  { from: "Taiwan", to: "Japan", zh: "台灣 ↔ 日本" },
  { from: "Japan", to: "Vietnam", zh: "日本 ↔ 越南" },
  { from: "Vietnam", to: "Europe", zh: "越南 ↔ 歐洲" },
] as const;

export const ORBIT_MODULES = [
  {
    title: "全球採購",
    en: "Sourcing",
    body: "在航線節點找對供應，而不是在雜訊裡搜尋。",
  },
  {
    title: "貿易合規",
    en: "Compliance",
    body: "文件、報關與風險節點，跟航線一樣可追蹤。",
  },
  {
    title: "供應鏈調度",
    en: "Supply Chain",
    body: "從下單到出貨，把節奏收斂成一條清楚軌道。",
  },
  {
    title: "智慧決策",
    en: "AI Desk",
    body: "用數據照亮下一趟航線，而不是堆疊儀表板。",
  },
] as const;

export const SERVICES = [
  {
    title: "國際貿易",
    en: "Trade",
    body: "進出口專業流程，串聯跨境商機與交期。",
  },
  {
    title: "物流履約",
    en: "Logistics",
    body: "海空倉配一體，把全球視野落到碼頭。",
  },
  {
    title: "OEM / ODM",
    en: "Custom",
    body: "客製產線與品牌落地，支援試產到量產。",
  },
] as const;

export const STATS = [
  { value: "50+", label: "國家與地區", en: "Markets" },
  { value: "10,000+", label: "優質產品", en: "SKUs" },
  { value: "5,000+", label: "合作夥伴", en: "Partners" },
  { value: "20+", label: "年貿易經驗", en: "Years" },
] as const;
