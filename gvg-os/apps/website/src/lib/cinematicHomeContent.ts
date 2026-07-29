/** Cinematic homepage copy + scene metadata — GVG Interactive Experience */

export const CRAWL_LINES = [
  "BUILD BEYOND BORDERS",
  "GLOBAL BUSINESS",
  "GLOBAL MARKETPLACE",
  "ARTIFICIAL INTELLIGENCE",
  "GLOBAL TRADE",
  "BUSINESS SERVICES",
  "INVESTMENT",
  "REAL ESTATE",
  "SUPPLY CHAIN",
  "CONSTRUCTION",
  "PROPERTY MANAGEMENT",
  "OEM MANUFACTURING",
  "GLOBAL PARTNERSHIP",
  "ONE ECOSYSTEM",
  "ONE PLATFORM",
  "ONE FUTURE",
  "GVG",
] as const;

export const NETWORK_CITIES = [
  { id: "la", name: "Los Angeles", lat: 34.05, lon: -118.24 },
  { id: "tw", name: "Taiwan", lat: 25.03, lon: 121.57 },
  { id: "tyo", name: "Tokyo", lat: 35.68, lon: 139.69 },
  { id: "sgn", name: "Vietnam", lat: 10.82, lon: 106.63 },
  { id: "sin", name: "Singapore", lat: 1.35, lon: 103.82 },
  { id: "dxb", name: "Dubai", lat: 25.2, lon: 55.27 },
  { id: "eu", name: "Europe", lat: 48.86, lon: 2.35 },
] as const;

export const MARKET_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Pet",
  "Industrial",
  "Automotive",
  "Office",
  "Tools",
  "Medical",
] as const;

export const SERVICE_BEATS = [
  "Construction",
  "Interior Design",
  "Global Procurement",
  "Logistics",
  "Warehousing",
  "Import",
  "Export",
  "OEM",
  "Financial Services",
  "Marketing",
] as const;

export const HOME_COPY = {
  brand: "GVG",
  brandFull: "Global Vista Group",
  tagline: "BUILD BEYOND BORDERS",
  networkTitle: "GVG GLOBAL NETWORK",
  aiTitle: "Artificial Intelligence",
  aiSub: "Powering Global Business",
  investLines: ["BUILD", "INVEST", "GROW"] as const,
  endingCta: "ENTER GVG ECOSYSTEM",
  scrollHint: "SCROLL",
} as const;

/** Pin scroll length per scene (px added to viewport) */
export const SCENE_SCROLL = {
  awaken: 3200,
  crawl: 4800,
  earth: 3600,
  network: 3400,
  ai: 3800,
  market: 3200,
  services: 3600,
  invest: 3400,
  ending: 2800,
} as const;
