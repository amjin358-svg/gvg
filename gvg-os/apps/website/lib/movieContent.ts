/**
 * Interactive Movie V2 — copy aligned with homepage OS narrative
 * & corporate portal journey (Connecting Markets. Creating Value.).
 */

export const MOVIE_V2 = {
  opening: {
    mark: "GVG",
    tag: "One OS. Limitless Vision.",
    tagZh: "一個系統 · 無限視野",
    scroll: "Scroll",
  },
  earth: {
    eyebrow: "02 · Orbital Markets",
    title: "One Planet. Infinite Markets.",
    body: "從軌道俯瞰全球商流 — 緩慢轉動地球，感受跨境貿易如何交織成 GVG 的完整版圖。",
  },
  global: {
    finale: "Global Supply Chain · 全球供應網絡",
  },
  market: {
    title: "Product Center",
    sub: "發現 · 採購 · 履約 · 成長",
    cards: [
      {
        title: "Discover",
        body: "瀏覽六大品類與全球選品，快速鎖定目標商品與供應來源。",
      },
      {
        title: "Source",
        body: "嚴選品牌與工廠網絡，建立可信賴的跨境採購節奏。",
      },
      {
        title: "Fulfill",
        body: "報價、訂單與物流一體化，讓履約節奏清晰可追蹤。",
      },
      {
        title: "Scale",
        body: "以企業級市集與數據洞察，陪同業務規模化成長。",
      },
    ],
  },
  ai: {
    line1: "Artificial Intelligence",
    lineFor: "for",
    line2: "Global Business",
    kpis: [
      { value: "99.9%", label: "系統可用率", kind: "static" as const },
      { value: "0", label: "數據節點", kind: "counter" as const },
      { value: "26", label: "核心模組", kind: "static" as const },
    ],
    charts: [
      { label: "Trade", blocks: 10, max: 12 },
      { label: "AI", blocks: 8, max: 12 },
      { label: "Growth", blocks: 12, max: 12 },
    ],
    rail: ["Particles", "Numbers", "Charts", "Connections"] as const,
  },
  business: {
    eyebrow: "06 · Business Lines",
    title: "Core Services",
    services: [
      {
        title: "International Trade",
        body: "進出口貿易專業服務，對接全球市場與合規節奏。",
      },
      {
        title: "Global Sourcing",
        body: "為您找到最優質的產品與供應來源。",
      },
      {
        title: "Supply Chain",
        body: "完整供應鏈解決方案，串聯採購到履約。",
      },
      {
        title: "Logistics",
        body: "全球物流運輸與配送，掌握交期與成本。",
      },
      {
        title: "Compliance",
        body: "專業報關與貿易合規諮詢，降低跨境風險。",
      },
      {
        title: "OEM / ODM",
        body: "客製化生產服務，支援品牌導入與規模擴張。",
      },
    ],
  },
  values: {
    eyebrow: "07 · Platform Strength",
    title: "Built to Scale",
    pillars: [
      {
        title: "AI-Powered",
        body: "以智慧決策驅動效率、預測與自動化成長。",
      },
      {
        title: "Cloud-Native",
        body: "彈性架構與高可用設計，支撐跨市場營運。",
      },
      {
        title: "Data-Driven",
        body: "數據驅動營運判斷，讓每一次決策更清晰。",
      },
    ],
  },
  presence: {
    eyebrow: "08 · Global Presence",
    title: "Markets & Presence",
    layers: [
      { title: "Markets", body: "以城市與港口作為全球佈局的視覺語言。" },
      { title: "Partners", body: "供應商、通路與企業夥伴的長期協作網絡。" },
      { title: "Operations", body: "貿易、物流與合規在地落地的營運節點。" },
      {
        title: "Global Vista Group",
        body: "以長遠視野連結市場，創造可持續的商業價值。",
      },
    ],
  },
  ending: {
    title: "Global Vista Group",
    line: "Connecting Markets. Creating Value.",
    lineZh: "連接全球市場，創造無限商機。",
    ctaPrimary: "進入企業官網",
    ctaAgain: "再看一次",
  },
} as const;

export default MOVIE_V2;
