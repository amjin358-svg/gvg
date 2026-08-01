import type { NavItem } from "@/types";

export const BRAND = {
  name: "Global Vista Group",
  nameZh: "全球視界集團",
  shortName: "GVG",
  product: "Global Trade OS",
  productZh: "全球貿易作業系統",
  tagline: "Connect. Source. Ship. Scale.",
  taglineZh: "連接全球市場 創造無限商機",
  description:
    "Enterprise B2B and B2C international trading platform connecting suppliers, manufacturers, buyers, logistics providers, and global sourcing services.",
  descriptionZh:
    "企業級 B2B／B2C 國際貿易平台，連結供應商、製造商、買方、物流商與全球採購服務。",
  url: "https://globalvistagroup.com",
} as const;

/** Top utility links (mockup header — lean chrome) */
export const UTILITY_NAV: NavItem[] = [
  { label: "關於 GVG", href: "/about" },
  { label: "服務項目", href: "/services" },
  { label: "最新消息", href: "/news" },
  { label: "聯絡我們", href: "/contact" },
];

/** Primary marketing nav — matches marketplace mockup IA */
export const PRIMARY_NAV: NavItem[] = [
  { label: "首頁", href: "/" },
  { label: "商品中心", href: "/products", description: "全球商品目錄" },
  { label: "全球採購", href: "/procurement", description: "採購與 OEM 方案" },
  { label: "國際貿易", href: "/trade", description: "進出口與合規" },
  { label: "Marketplace", href: "/marketplace", description: "供應商與熱銷商品" },
  { label: "AI 智慧服務", href: "/ai", description: "AI 採購助理" },
  { label: "合作夥伴專區", href: "/portal/supplier", description: "供應商／夥伴入口" },
];

export const PORTAL_NAV: NavItem[] = [
  { label: "客戶入口", href: "/portal/customer" },
  { label: "供應商入口", href: "/portal/supplier" },
  { label: "AI 助理", href: "/ai" },
  { label: "後台管理", href: "/admin" },
];

export const PLATFORM_MODULES = [
  { id: "01", name: "Home", href: "/", description: "品牌首頁" },
  { id: "02", name: "Products", href: "/products", description: "產品中心" },
  { id: "03", name: "Categories", href: "/categories", description: "分類" },
  { id: "04", name: "Brands", href: "/brands", description: "品牌" },
  { id: "05", name: "RFQ", href: "/rfq", description: "詢價" },
  { id: "06", name: "Quote", href: "/quotes", description: "報價" },
  { id: "07", name: "Orders", href: "/orders", description: "訂單" },
  { id: "08", name: "Procurement", href: "/procurement", description: "採購" },
  { id: "09", name: "Supplier Portal", href: "/portal/supplier", description: "供應商入口" },
  { id: "10", name: "Customer Portal", href: "/portal/customer", description: "客戶入口" },
  { id: "11", name: "Inventory", href: "/inventory", description: "庫存" },
  { id: "12", name: "Warehouses", href: "/warehouses", description: "倉庫" },
  { id: "13", name: "Logistics", href: "/logistics", description: "物流" },
  { id: "14", name: "Customs", href: "/customs", description: "報關" },
  { id: "15", name: "CRM", href: "/crm", description: "客戶關係" },
  { id: "16", name: "CMS", href: "/cms", description: "內容管理" },
  { id: "17", name: "News", href: "/news", description: "最新消息" },
  { id: "18", name: "Analytics", href: "/analytics", description: "分析" },
  { id: "19", name: "AI Assistant", href: "/ai", description: "AI 智慧服務" },
  { id: "20", name: "Admin Dashboard", href: "/admin", description: "管理後台" },
  { id: "21", name: "Trade", href: "/trade", description: "國際貿易" },
  { id: "22", name: "Marketplace", href: "/marketplace", description: "市集" },
  { id: "23", name: "Business Center", href: "/business", description: "企業資訊中心" },
  { id: "24", name: "Design Center", href: "/design", description: "設計中心" },
  { id: "25", name: "Development Dashboard", href: "/development", description: "開發儀表板" },
  { id: "26", name: "Operations Dashboard", href: "/operations", description: "營運儀表板" },
  { id: "27", name: "GVG Enterprise", href: "/enterprise", description: "企業總控台" },
] as const;

export const HOME_STATS = [
  { value: "50+", label: "國家與地區" },
  { value: "10,000+", label: "優質產品" },
  { value: "5,000+", label: "合作夥伴" },
  { value: "20+", label: "年貿易經驗" },
] as const;

export const CORE_SERVICES = [
  {
    title: "國際貿易",
    description: "跨境 B2B 交易、合約與多幣別結算",
    href: "/trade",
    icon: "globe",
  },
  {
    title: "全球採購",
    description: "一站式尋源、比價與供應商開發",
    href: "/procurement",
    icon: "cart",
  },
  {
    title: "供應鏈管理",
    description: "訂單、庫存與倉儲協同可視",
    href: "/inventory",
    icon: "package",
  },
  {
    title: "物流服務",
    description: "海空陸運追蹤與據點網絡",
    href: "/logistics",
    icon: "ship",
  },
  {
    title: "貿易合規",
    description: "報關文件、HS 編碼與法規協助",
    href: "/customs",
    icon: "shield",
  },
  {
    title: "OEM / ODM",
    description: "私有品牌開發、打樣到量產",
    href: "/procurement",
    icon: "handshake",
  },
] as const;

export const HOT_CATEGORIES = [
  {
    nameZh: "健康保健",
    nameEn: "Health Supplements",
    href: "/categories/health-supplements",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80",
  },
  {
    nameZh: "食品飲料",
    nameEn: "Food & Beverages",
    href: "/categories/packaged-foods",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  },
  {
    nameZh: "居家生活",
    nameEn: "Home & Living",
    href: "/categories/household-goods",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    nameZh: "五金工具",
    nameEn: "Hardware & Tools",
    href: "/categories/hardware-tools",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
  },
  {
    nameZh: "建材裝修",
    nameEn: "Building Materials",
    href: "/categories/home-improvement",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    nameZh: "辦公用品",
    nameEn: "Office Supplies",
    href: "/categories/furniture",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export const TRADE_SERVICES = [
  {
    id: "international-trading",
    title: "International Trading",
    description: "Cross-border B2B commerce with compliant contracts and multi-currency settlement.",
  },
  {
    id: "import-export",
    title: "Import / Export",
    description: "End-to-end import and export workflows from sourcing to delivery.",
  },
  {
    id: "oem-odm",
    title: "OEM / ODM",
    description: "Private-label manufacturing with quality gates and sample tracking.",
  },
  {
    id: "global-procurement",
    title: "Global Procurement",
    description: "Centralized sourcing across suppliers, regions, and product verticals.",
  },
  {
    id: "us-purchasing",
    title: "US Purchasing Service",
    description: "Proxy purchasing, consolidation, and export from the United States.",
  },
  {
    id: "logistics",
    title: "Logistics",
    description: "Ocean, air, rail, and truck routing with live shipment visibility.",
  },
  {
    id: "customs-documentation",
    title: "Customs Documentation",
    description: "Commercial invoices, packing lists, HS codes, and clearance packets.",
  },
  {
    id: "ai-procurement",
    title: "AI Procurement Assistant",
    description: "RFQ drafting, supplier matching, and landed-cost recommendations.",
  },
] as const;
