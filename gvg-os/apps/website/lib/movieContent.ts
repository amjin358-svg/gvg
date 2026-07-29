/**
 * Interactive Movie version identity — IM-V5.0
 * Frozen twin: @gvg/v5 (gvg-os/apps/v5)
 */

export const MOVIE_VERSION = {
  code: "IM-V5.0",
  semver: "0.5.0",
  label: "Interactive Movie V5",
  releasedAt: "2026-07-29",
  path: "/experience",
  pipeline: "open → earth → routes → pillars → finale",
} as const;

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
        body: "六大品類精選，支援跨境採購與品牌導入。",
      },
      {
        title: "Supply Chain",
        body: "從報價到履約，節奏清晰可追蹤。",
      },
      {
        title: "AI Insight",
        body: "以數據與智慧決策，加速全球佈局。",
      },
    ],
  },
  finale: {
    ready: "Are you ready?",
    lead: "Begin with",
    brand: "Global Vista Group",
    line: "Ready to connect markets?",
    lineZh: "準備好開啟全球視野了嗎？",
    ctaPrimary: "進入企業官網",
    ctaAgain: "GVG簡介",
  },
} as const;

/** @deprecated Use MOVIE_V5 */
export const MOVIE_V3 = MOVIE_V5;

export default MOVIE_V5;
