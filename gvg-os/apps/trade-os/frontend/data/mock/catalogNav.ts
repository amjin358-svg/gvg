import type { ProductCategory } from "@/types";

export type CatalogNavItem = {
  slug: ProductCategory | "all";
  nameZh: string;
  nameEn: string;
  href: string;
  count: number;
  children?: { label: string; href: string }[];
};

/** Product Center left-rail categories (mockup verticals) */
export const CATALOG_NAV: CatalogNavItem[] = [
  {
    slug: "health-supplements",
    nameZh: "保健食品",
    nameEn: "Health Food",
    href: "/categories/health-supplements",
    count: 368,
    children: [
      { label: "全部商品", href: "/categories/health-supplements" },
      { label: "男性保健", href: "/categories/health-supplements" },
      { label: "女性保健", href: "/categories/health-supplements" },
      { label: "維生素", href: "/categories/health-supplements" },
      { label: "魚油", href: "/categories/health-supplements" },
    ],
  },
  {
    slug: "packaged-foods",
    nameZh: "食品飲料",
    nameEn: "Food & Drink",
    href: "/categories/packaged-foods",
    count: 214,
  },
  {
    slug: "household-goods",
    nameZh: "居家生活",
    nameEn: "Home Living",
    href: "/categories/household-goods",
    count: 356,
    children: [
      { label: "傢俱", href: "/categories/furniture" },
      { label: "收納", href: "/categories/household-goods" },
      { label: "廚具", href: "/categories/household-goods" },
      { label: "寢具", href: "/categories/household-goods" },
    ],
  },
  {
    slug: "hardware-tools",
    nameZh: "五金工具",
    nameEn: "Hardware Tools",
    href: "/categories/hardware-tools",
    count: 620,
    children: [
      { label: "手工具", href: "/categories/hardware-tools" },
      { label: "電動工具", href: "/categories/hardware-tools" },
      { label: "五金配件", href: "/categories/hardware-tools" },
      { label: "量測儀器", href: "/categories/hardware-tools" },
    ],
  },
  {
    slug: "home-improvement",
    nameZh: "裝潢建材",
    nameEn: "Building Materials",
    href: "/categories/home-improvement",
    count: 428,
    children: [
      { label: "地板材料", href: "/categories/home-improvement" },
      { label: "牆面材料", href: "/categories/home-improvement" },
      { label: "門窗", href: "/categories/home-improvement" },
      { label: "衛浴廚房", href: "/categories/home-improvement" },
    ],
  },
  {
    slug: "branded-apparel",
    nameZh: "品牌服飾",
    nameEn: "Brand Apparel",
    href: "/categories/branded-apparel",
    count: 860,
    children: [
      { label: "男裝", href: "/categories/branded-apparel" },
      { label: "女裝", href: "/categories/branded-apparel" },
      { label: "運動服飾", href: "/categories/branded-apparel" },
      { label: "配件鞋履", href: "/categories/branded-apparel" },
    ],
  },
  {
    slug: "furniture",
    nameZh: "生活雜貨",
    nameEn: "General Merchandise",
    href: "/categories/furniture",
    count: 892,
    children: [
      { label: "紙品清潔", href: "/categories/furniture" },
      { label: "洗衣清潔", href: "/categories/furniture" },
      { label: "個人護理", href: "/categories/furniture" },
    ],
  },
  {
    slug: "oem-odm",
    nameZh: "汽車用品",
    nameEn: "Auto Supplies",
    href: "/categories/oem-odm",
    count: 146,
  },
];

export const TRUST_BADGES = [
  { title: "全球精選", text: "嚴選全球優質品牌" },
  { title: "品質保證", text: "原廠授權，品質安心" },
  { title: "快速配送", text: "全球物流，快速到貨" },
  { title: "安全付款", text: "多元支付，交易安全" },
  { title: "貼心客服", text: "專業團隊，即時支援" },
] as const;

export const MARKETPLACE_SUPPLIERS = [
  {
    name: "Green Life Co., Ltd.",
    country: "台灣",
    type: "製造商",
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "HarborCraft Manufacturing",
    country: "台灣",
    type: "OEM 工廠",
    rating: 4.8,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "VistaWell Labs",
    country: "美國",
    type: "品牌商",
    rating: 4.7,
    reviews: 212,
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Pacific Thread",
    country: "越南",
    type: "製造商",
    rating: 4.6,
    reviews: 74,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "NordicNest Home",
    country: "瑞典",
    type: "品牌商",
    rating: 4.8,
    reviews: 163,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
] as const;
