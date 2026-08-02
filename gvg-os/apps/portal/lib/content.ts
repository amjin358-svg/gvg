import { asset } from "@/lib/assets";

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
  { href: "/products", label: "全球產品", en: "Global Products" },
  { href: "/trade", label: "貿易中心", en: "Trade Hub" },
  { href: "/suppliers", label: "供應商", en: "Suppliers" },
  { href: "/news", label: "最新消息", en: "News" },
  { href: "/contact", label: "聯絡我們", en: "Contact" },
] as const;

export const STATS = [
  { value: "50+", label: "國家與地區", en: "Markets", icon: "globe" },
  { value: "10,000+", label: "優質產品", en: "SKUs", icon: "box" },
  { value: "5,000+", label: "合作夥伴", en: "Partners", icon: "users" },
  { value: "20+", label: "年貿易經驗", en: "Years", icon: "chart" },
] as const;

export const SERVICES = [
  {
    href: "/services#trade",
    title: "國際貿易",
    en: "International Trade",
    desc: "進出口貿易專業服務",
  },
  {
    href: "/services#sourcing",
    title: "全球採購",
    en: "Global Sourcing",
    desc: "為您找到最優質的產品",
  },
  {
    href: "/services#supply-chain",
    title: "供應鏈管理",
    en: "Supply Chain",
    desc: "完整的供應鏈解決方案",
  },
  {
    href: "/services#logistics",
    title: "物流服務",
    en: "Logistics",
    desc: "全球物流運輸與配送",
  },
  {
    href: "/services#compliance",
    title: "貿易合規",
    en: "Compliance",
    desc: "專業報關與合規諮詢",
  },
  {
    href: "/services#oem",
    title: "OEM / ODM",
    en: "Custom Manufacturing",
    desc: "客製化生產服務",
  },
] as const;

export type CategoryId =
  | "supplements"
  | "food"
  | "home"
  | "hardware"
  | "materials"
  | "office";

export const CATEGORIES: ReadonlyArray<{
  id: CategoryId;
  href: string;
  zh: string;
  en: string;
  tone: string;
  blurb: string;
  image: string;
}> = [
  {
    id: "supplements",
    href: "/products/supplements",
    zh: "保健食品",
    en: "Health Supplements",
    tone: "a",
    blurb: "精選全球保健與營養品類，支援品牌導入與通路鋪貨。",
    image: asset("/images/categories/supplements.jpg"),
  },
  {
    id: "food",
    href: "/products/food",
    zh: "食品飲料",
    en: "Food & Beverages",
    tone: "b",
    blurb: "休閒食品、飲品與進口食材，靈活對接批發與零售需求。",
    image: asset("/images/categories/food.jpg"),
  },
  {
    id: "home",
    href: "/products/home",
    zh: "居家用品",
    en: "Home & Living",
    tone: "c",
    blurb: "家具、收納與居家生活選品，打造高質感生活場景。",
    image: asset("/images/categories/home.jpg"),
  },
  {
    id: "hardware",
    href: "/products/hardware",
    zh: "五金工具",
    en: "Hardware & Tools",
    tone: "d",
    blurb: "精選優質五金工具與配件，專業耐用，滿足各種工作需求。",
    image: asset("/images/categories/hardware.jpg"),
  },
  {
    id: "materials",
    href: "/products/materials",
    zh: "建材產品",
    en: "Building Materials",
    tone: "e",
    blurb: "工程與建材相關產品，協助專案採購與供應鏈整合。",
    image: asset("/images/categories/materials.jpg"),
  },
  {
    id: "office",
    href: "/products/office",
    zh: "辦公用品",
    en: "Office Supplies",
    tone: "f",
    blurb: "辦公設備與耗材，支援企業日常營運與據點佈建。",
    image: asset("/images/categories/office.jpg"),
  },
];

export type ProductItem = {
  id: string;
  name: string;
  model?: string;
  brand: string;
  price: string;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
};

export type SubCategory = { id: string; label: string };

export const CATEGORY_DETAILS: Record<
  CategoryId,
  {
    titleZh: string;
    titleEn: string;
    description: string;
    count: number;
    brands: string[];
    subcategories: SubCategory[];
    products: ProductItem[];
  }
> = {
  hardware: {
    titleZh: "五金工具",
    titleEn: "Hardware & Tools",
    description: "精選優質五金工具與配件，專業耐用，滿足各種工作需求。",
    count: 620,
    brands: ["Stanley", "DeWalt", "Bosch", "Makita", "Milwaukee"],
    subcategories: [
      { id: "hand", label: "手工具" },
      { id: "power", label: "電動工具" },
      { id: "accessories", label: "五金配件" },
      { id: "measure", label: "量測儀器" },
      { id: "cutting", label: "切割工具" },
      { id: "fasteners", label: "緊固件" },
      { id: "safety", label: "安全防護" },
      { id: "more", label: "更多分類" },
    ],
    products: [
      {
        id: "hw-1",
        name: "PowerLock 捲尺 25 英尺",
        model: "33-425",
        brand: "Stanley",
        price: "US$ 16.90",
        rating: 5,
        reviews: 128,
        image:
          asset("/images/products/tape-measure.jpg"),
      },
      {
        id: "hw-2",
        name: "20V 電鑽起子機套組",
        model: "DCD771C2",
        brand: "DeWalt",
        price: "US$ 149.00",
        rating: 5,
        reviews: 86,
        badge: "熱銷",
        image:
          asset("/images/products/drill.jpg"),
      },
      {
        id: "hw-3",
        name: "專業鉗子組合",
        model: "00-200",
        brand: "Knipex",
        price: "US$ 89.50",
        rating: 5,
        reviews: 64,
        image:
          asset("/images/products/pliers.jpg"),
      },
      {
        id: "hw-4",
        name: "鑽頭套組 15 件",
        model: "2607019540",
        brand: "Bosch",
        price: "US$ 24.90",
        rating: 4,
        reviews: 210,
        badge: "新品",
        image:
          asset("/images/products/drill-bits.jpg"),
      },
      {
        id: "hw-5",
        name: "衝擊起子機批頭組",
        model: "B-45081",
        brand: "Makita",
        price: "US$ 32.00",
        rating: 5,
        reviews: 93,
        image:
          asset("/images/products/screwdriver-bits.jpg"),
      },
      {
        id: "hw-6",
        name: "多功能潤滑劑 400ml",
        model: "WD-40",
        brand: "WD-40",
        price: "US$ 8.50",
        rating: 5,
        reviews: 412,
        image:
          asset("/images/products/wd40.jpg"),
      },
      {
        id: "hw-7",
        name: "纖維柄鐵鎚 16oz",
        model: "51-163",
        brand: "Stanley",
        price: "US$ 18.90",
        rating: 5,
        reviews: 77,
        image:
          asset("/images/products/hammer.jpg"),
      },
      {
        id: "hw-8",
        name: "快夾鉗 2 件組",
        model: "IRWIN-2PC",
        brand: "Irwin",
        price: "US$ 29.90",
        rating: 4,
        reviews: 55,
        image:
          asset("/images/products/clamp.jpg"),
      },
      {
        id: "hw-9",
        name: "工業級水平尺 60cm",
        model: "LVL-60",
        brand: "Bosch",
        price: "US$ 42.00",
        rating: 5,
        reviews: 39,
        image:
          asset("/images/products/level.jpg"),
      },
      {
        id: "hw-10",
        name: "安全防護手套",
        model: "SG-PRO",
        brand: "Milwaukee",
        price: "US$ 14.50",
        rating: 4,
        reviews: 148,
        image:
          asset("/images/products/gloves.jpg"),
      },
      {
        id: "hw-11",
        name: "充電式手電筒",
        model: "FL-LED",
        brand: "DeWalt",
        price: "US$ 39.00",
        rating: 5,
        reviews: 61,
        image:
          asset("/images/products/flashlight.jpg"),
      },
      {
        id: "hw-12",
        name: "工具收納箱",
        model: "TB-26",
        brand: "Stanley",
        price: "US$ 54.00",
        rating: 5,
        reviews: 102,
        image:
          asset("/images/products/toolbox.jpg"),
      },
    ],
  },
  home: {
    titleZh: "居家用品 / 家具",
    titleEn: "Home & Living / Furniture",
    description: "精選全球居家家具品牌，打造舒適、耐用且具設計感的生活空間。",
    count: 356,
    brands: ["Ashley", "IKEA", "West Elm", "Wayfair", "Herman Miller"],
    subcategories: [
      { id: "all", label: "全部家具" },
      { id: "living", label: "客廳" },
      { id: "bedroom", label: "臥室" },
      { id: "dining", label: "餐廳" },
      { id: "study", label: "書房" },
      { id: "storage", label: "收納" },
      { id: "outdoor", label: "戶外" },
      { id: "commercial", label: "商業空間" },
      { id: "more", label: "更多分類" },
    ],
    products: [
      {
        id: "hm-1",
        name: "MALM 高床架",
        brand: "IKEA",
        price: "US$ 349.00",
        rating: 5,
        reviews: 214,
        image:
          asset("/images/products/bed.jpg"),
      },
      {
        id: "hm-2",
        name: "現代布沙發三人座",
        brand: "West Elm",
        price: "US$ 899.00",
        rating: 5,
        reviews: 88,
        badge: "熱銷",
        image:
          asset("/images/products/sofa.jpg"),
      },
      {
        id: "hm-3",
        name: "實木餐椅",
        brand: "Ashley",
        price: "US$ 129.00",
        rating: 4,
        reviews: 56,
        image:
          asset("/images/products/chair.jpg"),
      },
      {
        id: "hm-4",
        name: "人體工學辦公椅",
        brand: "Herman Miller",
        price: "US$ 1,150.00",
        rating: 5,
        reviews: 173,
        badge: "新品",
        image:
          asset("/images/products/office-chair.jpg"),
      },
      {
        id: "hm-5",
        name: "北歐風茶几",
        brand: "Wayfair",
        price: "US$ 189.00",
        rating: 4,
        reviews: 97,
        image:
          asset("/images/products/coffee-table.jpg"),
      },
      {
        id: "hm-6",
        name: "開放式書櫃",
        brand: "IKEA",
        price: "US$ 159.00",
        rating: 5,
        reviews: 140,
        image:
          asset("/images/products/bookshelf.jpg"),
      },
      {
        id: "hm-7",
        name: "床頭櫃組",
        brand: "Ashley",
        price: "US$ 219.00",
        rating: 4,
        reviews: 45,
        image:
          asset("/images/products/nightstand.jpg"),
      },
      {
        id: "hm-8",
        name: "餐桌六人座",
        brand: "West Elm",
        price: "US$ 780.00",
        rating: 5,
        reviews: 62,
        image:
          asset("/images/products/dining.jpg"),
      },
      {
        id: "hm-9",
        name: "落地燈",
        brand: "Wayfair",
        price: "US$ 98.00",
        rating: 4,
        reviews: 119,
        image:
          asset("/images/products/lamp.jpg"),
      },
      {
        id: "hm-10",
        name: "收納櫃組",
        brand: "IKEA",
        price: "US$ 249.00",
        rating: 5,
        reviews: 201,
        image:
          asset("/images/products/storage.jpg"),
      },
      {
        id: "hm-11",
        name: "戶外休閒椅",
        brand: "Ashley",
        price: "US$ 169.00",
        rating: 4,
        reviews: 38,
        image:
          asset("/images/products/outdoor-chair.jpg"),
      },
      {
        id: "hm-12",
        name: "書房書桌",
        brand: "Herman Miller",
        price: "US$ 620.00",
        rating: 5,
        reviews: 74,
        image:
          asset("/images/products/desk.jpg"),
      },
    ],
  },
  supplements: {
    titleZh: "保健食品",
    titleEn: "Health Supplements",
    description: "精選全球保健與營養品類，支援品牌導入與通路鋪貨。",
    count: 280,
    brands: ["Nature Made", "NOW Foods", "Blackmores", "Swisse", "Centrum"],
    subcategories: [
      { id: "vitamin", label: "維他命" },
      { id: "protein", label: "蛋白營養" },
      { id: "beauty", label: "美容保健" },
      { id: "sport", label: "運動補給" },
      { id: "more", label: "更多分類" },
    ],
    products: [
      {
        id: "sp-1",
        name: "綜合維他命 90 錠",
        brand: "Centrum",
        price: "US$ 24.90",
        rating: 5,
        reviews: 320,
        image:
          asset("/images/products/vitamins.jpg"),
      },
      {
        id: "sp-2",
        name: "魚油軟膠囊",
        brand: "Blackmores",
        price: "US$ 29.50",
        rating: 5,
        reviews: 188,
        badge: "熱銷",
        image:
          asset("/images/products/protein.jpg"),
      },
      {
        id: "sp-3",
        name: "膠原蛋白粉",
        brand: "Swisse",
        price: "US$ 39.00",
        rating: 4,
        reviews: 96,
        image:
          asset("/images/products/vitamins.jpg"),
      },
      {
        id: "sp-4",
        name: "乳清蛋白 2lb",
        brand: "NOW Foods",
        price: "US$ 34.00",
        rating: 5,
        reviews: 150,
        image:
          asset("/images/products/protein.jpg"),
      },
      {
        id: "sp-5",
        name: "維生素 D3",
        brand: "Nature Made",
        price: "US$ 12.90",
        rating: 5,
        reviews: 240,
        image:
          asset("/images/products/vitamins.jpg"),
      },
      {
        id: "sp-6",
        name: "益生菌膠囊",
        brand: "Swisse",
        price: "US$ 27.00",
        rating: 4,
        reviews: 110,
        badge: "新品",
        image:
          asset("/images/products/protein.jpg"),
      },
    ],
  },
  food: {
    titleZh: "食品飲料",
    titleEn: "Food & Beverages",
    description: "休閒食品、飲品與進口食材，靈活對接批發與零售需求。",
    count: 410,
    brands: ["Nestlé", "Coca-Cola", "Pepsi", "Oreo", "KitKat"],
    subcategories: [
      { id: "snack", label: "休閒零食" },
      { id: "drink", label: "飲料" },
      { id: "grocery", label: "進口食材" },
      { id: "more", label: "更多分類" },
    ],
    products: [
      {
        id: "fd-1",
        name: "綜合堅果禮盒",
        brand: "Nestlé",
        price: "US$ 18.90",
        rating: 5,
        reviews: 76,
        image:
          asset("/images/products/snacks.jpg"),
      },
      {
        id: "fd-2",
        name: "氣泡飲 24 入",
        brand: "Coca-Cola",
        price: "US$ 22.00",
        rating: 4,
        reviews: 54,
        image:
          asset("/images/products/soda.jpg"),
      },
      {
        id: "fd-3",
        name: "夾心餅乾箱購",
        brand: "Oreo",
        price: "US$ 16.50",
        rating: 5,
        reviews: 201,
        badge: "熱銷",
        image:
          asset("/images/products/snacks.jpg"),
      },
      {
        id: "fd-4",
        name: "巧克力分享包",
        brand: "KitKat",
        price: "US$ 14.00",
        rating: 5,
        reviews: 133,
        image:
          asset("/images/products/soda.jpg"),
      },
      {
        id: "fd-5",
        name: "即溶咖啡組合",
        brand: "Nestlé",
        price: "US$ 19.90",
        rating: 4,
        reviews: 88,
        image:
          asset("/images/products/snacks.jpg"),
      },
      {
        id: "fd-6",
        name: "氣泡水箱裝",
        brand: "Pepsi",
        price: "US$ 17.50",
        rating: 4,
        reviews: 41,
        image:
          asset("/images/products/soda.jpg"),
      },
    ],
  },
  materials: {
    titleZh: "建材產品",
    titleEn: "Building Materials",
    description: "工程與建材相關產品，協助專案採購與供應鏈整合。",
    count: 190,
    brands: ["3M", "Schneider", "Legrand", "TOTO", "Kohler"],
    subcategories: [
      { id: "electrical", label: "電氣設備" },
      { id: "plumbing", label: "水電五金" },
      { id: "finish", label: "裝修材料" },
      { id: "more", label: "更多分類" },
    ],
    products: [
      {
        id: "mt-1",
        name: "工業膠帶捲",
        brand: "3M",
        price: "US$ 9.90",
        rating: 5,
        reviews: 67,
        image:
          asset("/images/products/faucet.jpg"),
      },
      {
        id: "mt-2",
        name: "配電箱模組",
        brand: "Schneider",
        price: "US$ 120.00",
        rating: 5,
        reviews: 22,
        image:
          asset("/images/products/level.jpg"),
      },
      {
        id: "mt-3",
        name: "開關面板組",
        brand: "Legrand",
        price: "US$ 28.00",
        rating: 4,
        reviews: 35,
        image:
          asset("/images/products/faucet.jpg"),
      },
      {
        id: "mt-4",
        name: "衛浴龍頭",
        brand: "TOTO",
        price: "US$ 89.00",
        rating: 5,
        reviews: 48,
        badge: "新品",
        image:
          asset("/images/products/level.jpg"),
      },
      {
        id: "mt-5",
        name: "浴室配件組",
        brand: "Kohler",
        price: "US$ 145.00",
        rating: 5,
        reviews: 29,
        image:
          asset("/images/products/faucet.jpg"),
      },
      {
        id: "mt-6",
        name: "LED 工程燈具",
        brand: "Schneider",
        price: "US$ 56.00",
        rating: 4,
        reviews: 18,
        image:
          asset("/images/products/level.jpg"),
      },
    ],
  },
  office: {
    titleZh: "辦公用品",
    titleEn: "Office Supplies",
    description: "辦公設備與耗材，支援企業日常營運與據點佈建。",
    count: 245,
    brands: ["Logitech", "HP", "Canon", "3M", "Moleskine"],
    subcategories: [
      { id: "desk", label: "桌面設備" },
      { id: "print", label: "列印耗材" },
      { id: "stationery", label: "文具" },
      { id: "more", label: "更多分類" },
    ],
    products: [
      {
        id: "of-1",
        name: "無線滑鼠",
        brand: "Logitech",
        price: "US$ 29.90",
        rating: 5,
        reviews: 260,
        image:
          asset("/images/products/mouse.jpg"),
      },
      {
        id: "of-2",
        name: "多功能事務機",
        brand: "HP",
        price: "US$ 189.00",
        rating: 4,
        reviews: 74,
        badge: "熱銷",
        image:
          asset("/images/products/printer.jpg"),
      },
      {
        id: "of-3",
        name: "噴墨相紙包",
        brand: "Canon",
        price: "US$ 16.00",
        rating: 4,
        reviews: 51,
        image:
          asset("/images/products/mouse.jpg"),
      },
      {
        id: "of-4",
        name: "便利貼組合",
        brand: "3M",
        price: "US$ 7.50",
        rating: 5,
        reviews: 190,
        image:
          asset("/images/products/printer.jpg"),
      },
      {
        id: "of-5",
        name: "筆記本套組",
        brand: "Moleskine",
        price: "US$ 22.00",
        rating: 5,
        reviews: 112,
        image:
          asset("/images/products/mouse.jpg"),
      },
      {
        id: "of-6",
        name: "人體工學鍵盤",
        brand: "Logitech",
        price: "US$ 79.00",
        rating: 5,
        reviews: 98,
        badge: "新品",
        image:
          asset("/images/products/printer.jpg"),
      },
    ],
  },
};

export const PRODUCT_TRUST = [
  { title: "全球精選", desc: "嚴選全球優質品牌與產品" },
  { title: "品質保證", desc: "原廠授權，品質有保障" },
  { title: "快速配送", desc: "全球物流，快速到貨" },
  { title: "安全付款", desc: "多元支付，交易安全" },
  { title: "專業服務", desc: "專人諮詢，售後無憂" },
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
