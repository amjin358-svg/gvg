/**
 * Interactive Movie version identity — IM-V5.0
 * Frozen twin: @gvg/v5 (gvg-os/apps/v5)
 */

export const MOVIE_VERSION = {
  /** Public version code */
  code: "IM-V5.0",
  /** Semver for the experience package surface */
  semver: "0.5.0",
  /** Human label */
  label: "Interactive Movie V5",
  /** ISO date of this script freeze */
  releasedAt: "2026-07-29",
  /** Live watch path (GitHub Pages: /gvg/experience/) */
  path: "/experience",
  /** Scene stack id */
  pipeline: "open → earth → routes → pillars → finale",
} as const;

/**
 * Interactive Movie V5 — polished cosmo opening, Earth spin, trade routes,
 * pillars, and gold finale. Alias MOVIE_V3 kept for transitional imports.
 */
export const MOVIE_V5 = {
  open: {
    mark: "GVG",
    title: "Global Vista Group",
    line: "Connecting Markets. Creating Value.",
    lineZh: "連接全球市場，創造無限商機。",
    hint: "Scroll · Move to summon meteors",
  },
  earth: {
    eyebrow: "Orbital View",
    title: "One Planet. Infinite Markets.",
    body: "保留地球自轉視角 — 緩慢轉動，感受全球貿易版圖在星空中展開。",
  },
  routes: {
    eyebrow: "Trade Routes",
    title: "Across Oceans & Skies",
    body: "海運、空運與數位網絡交會，形成 GVG 的全球動線。",
    hubs: [
      { name: "Americas", note: "市場入口" },
      { name: "Asia Pacific", note: "供應樞紐" },
      { name: "Europe", note: "合規通道" },
      { name: "Global Hub", note: "協作中心" },
    ],
  },
  pillars: {
    eyebrow: "What We Build",
    title: "Trade. Intelligence. Scale.",
    items: [
      {
        title: "Product Center",
        body: "對接企業官網商品中心總架構：保健、食品、居家、五金、建材與辦公六大品類，支援批發採購、品牌導入、OEM／ODM 與跨境通路鋪貨，讓選品到上架形成一條可執行動線。",
      },
      {
        title: "Supply Chain",
        body: "串聯國際貿易、全球採購、供應鏈管理與物流配送：從需求釐清、供應對接、報價履約到跨境運輸，節奏可追蹤、節點可協同，縮短決策到交付的距離。",
      },
      {
        title: "AI Insight",
        body: "以市場、品類與合規數據驅動決策：整合貿易合規諮詢、通路洞察與佈局建議，協助企業判讀機會、控管風險，並加速全球市場拓展與夥伴協作。",
      },
    ],
  },
  finale: {
    lead: "Begin with",
    brand: "Global Vista Group",
    line: "Ready to connect markets?",
    lineZh: "準備好開啟全球視野了嗎？",
    ctaPrimary: "進入企業官網",
    ctaAgain: "GVG簡介",
  },
} as const;

/** @deprecated Use MOVIE_V5 — kept so older scene imports keep resolving. */
export const MOVIE_V3 = MOVIE_V5;

export default MOVIE_V5;
