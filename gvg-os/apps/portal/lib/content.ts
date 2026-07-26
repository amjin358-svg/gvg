export const BRAND = {
  short: "GVG",
  nameZh: "環球視界集團",
  nameEn: "Global Vista Group",
  taglineZh: "連接全球市場 創造無限商機",
  taglineEn: "Connecting Markets. Creating Value.",
  trustZh: "您值得信賴的全球貿易與供應鏈合作夥伴",
  trustEn: "Your trusted global trade & supply-chain partner",
};

export const NAV = [
  { href: "/", label: "首頁", en: "Home" },
  { href: "/about", label: "關於GVG", en: "About" },
  { href: "/services", label: "服務項目", en: "Services" },
  { href: "/products", label: "全球產品", en: "Products" },
  { href: "/trade", label: "貿易中心", en: "Trade Hub" },
  { href: "/suppliers", label: "供應商", en: "Suppliers" },
  { href: "/news", label: "最新消息", en: "News" },
  { href: "/contact", label: "聯絡我們", en: "Contact" },
] as const;

export const STATS = [
  { value: "50+", label: "國家與地區", en: "Markets" },
  { value: "10,000+", label: "優質產品", en: "SKUs" },
  { value: "5,000+", label: "合作夥伴", en: "Partners" },
  { value: "20+", label: "年貿易經驗", en: "Years" },
] as const;

export const SERVICES = [
  {
    href: "/services#trade",
    title: "國際貿易",
    en: "International Trade",
    desc: "進出口貿易專業服務，串聯跨境商機與合規流程。",
  },
  {
    href: "/services#sourcing",
    title: "全球採購",
    en: "Global Sourcing",
    desc: "為您找到最優質的產品，覆蓋多市場供應網絡。",
  },
  {
    href: "/services#supply-chain",
    title: "供應鏈管理",
    en: "Supply Chain",
    desc: "完整的供應鏈解決方案，從下單到履約一站整合。",
  },
  {
    href: "/services#logistics",
    title: "物流服務",
    en: "Logistics",
    desc: "全球物流運輸與配送，掌握時效與成本。",
  },
  {
    href: "/services#compliance",
    title: "貿易合規",
    en: "Compliance",
    desc: "專業報關與合規諮詢，降低跨境風險。",
  },
  {
    href: "/services#oem",
    title: "OEM / ODM",
    en: "Custom Manufacturing",
    desc: "客製化生產服務，協助品牌快速落地。",
  },
] as const;

export const CATEGORIES = [
  {
    href: "/products#supplements",
    zh: "保健食品",
    en: "Health Supplements",
    tone: "a",
  },
  {
    href: "/products#food",
    zh: "食品飲料",
    en: "Food & Beverages",
    tone: "b",
  },
  {
    href: "/products#home",
    zh: "居家用品",
    en: "Home & Living",
    tone: "c",
  },
  {
    href: "/products#hardware",
    zh: "五金工具",
    en: "Hardware & Tools",
    tone: "d",
  },
  {
    href: "/products#materials",
    zh: "建材產品",
    en: "Building Materials",
    tone: "e",
  },
  {
    href: "/products#office",
    zh: "辦公用品",
    en: "Office Supplies",
    tone: "f",
  },
] as const;

export const ABOUT_HIGHLIGHTS = [
  {
    title: "全球視野",
    en: "Global Reach",
    body: "深耕亞太、歐美與新興市場，協助企業拓展跨境通路。",
  },
  {
    title: "專業團隊",
    en: "Expert Team",
    body: "貿易、物流、合規與採購專才協同，縮短決策到交付的距離。",
  },
  {
    title: "可信賴夥伴",
    en: "Trusted Partner",
    body: "以透明流程與長期關係為核心，陪您穩健成長。",
  },
] as const;

export const NEWS_ITEMS = [
  {
    date: "2026-07-12",
    title: "GVG 擴大東南亞供應網絡",
    en: "Expanding ASEAN supply network",
    summary: "新增越南與馬來西亞關鍵合作據點，強化區域履約能力。",
  },
  {
    date: "2026-06-28",
    title: "貿易合規服務升級上線",
    en: "Compliance desk upgrade",
    summary: "導入數位報關輔助流程，協助客戶更快完成跨境文件準備。",
  },
  {
    date: "2026-06-05",
    title: "OEM／ODM 客製產線開放洽詢",
    en: "OEM/ODM lines open for inquiry",
    summary: "支援保健與居家類別小量試產與量產規劃。",
  },
] as const;

export const SUPPLIER_BENEFITS = [
  {
    title: "曝光全球買主",
    en: "Buyer Access",
    body: "進入 GVG 買主網絡，獲得精準詢價與長期合作機會。",
  },
  {
    title: "訂單與履約支援",
    en: "Order Support",
    body: "從樣品、報價到出貨節點，由專責團隊協助對接。",
  },
  {
    title: "合規與品質把關",
    en: "Quality Gate",
    body: "共同建立可追溯的品質與文件標準，提升信任度。",
  },
] as const;
