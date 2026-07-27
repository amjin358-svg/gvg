/** Shared cinematic constants */

export const BRAND_NAVY = "#0B1F3A";
export const BRAND_GOLD = "#C8A35F";
export const CLASSIC_GOLD = "#D4AF37";

/** Soft grain — keep subtle for a cleaner premium look */
export const NOISE_STRENGTH = 0.015;

/**
 * Scrub lag (seconds of smoothing).
 * `true` feels hard; 0.7–1.0 reads as cinematic inertia.
 */
export const SCRUB_SMOOTH = 0.85;

export const EARTH_SCROLL_END = "+=3000";

/** Bundled high-quality plates (see public/) — paths relative to site root */
const ASSET_PATHS = {
  earthDay: "/textures/earth-day.jpg",
  earthNight: "/textures/earth-night.jpg",
  earthTopo: "/textures/earth-topology.jpg",
  office: "/images/movie/office.jpg",
  skyline: "/images/movie/skyline.jpg",
  finance: "/images/movie/finance.jpg",
  port: "/images/movie/port.jpg",
  mapDark: "/images/movie/map-dark.jpg",
  glassProduct: "/images/movie/glass-product.jpg",
} as const;

export type MovieAssetKey = keyof typeof ASSET_PATHS;

/** Prefix with NEXT_PUBLIC_BASE_PATH for GitHub Pages (/gvg) */
export function movieAsset(key: MovieAssetKey): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${ASSET_PATHS[key]}`;
}

export const MOVIE_ASSETS = {
  get earthDay() {
    return movieAsset("earthDay");
  },
  get earthNight() {
    return movieAsset("earthNight");
  },
  get earthTopo() {
    return movieAsset("earthTopo");
  },
  get office() {
    return movieAsset("office");
  },
  get skyline() {
    return movieAsset("skyline");
  },
  get finance() {
    return movieAsset("finance");
  },
  get port() {
    return movieAsset("port");
  },
  get mapDark() {
    return movieAsset("mapDark");
  },
  get glassProduct() {
    return movieAsset("glassProduct");
  },
} as const;

/**
 * Scene05 stack (bottom → top):
 * 1 Animated Grid / Gradient / Noise
 * 2 Particles
 * 3 Charts · Connections · Numbers  (widgets)
 * 4 Glass Dashboard                 (frosted plate under widgets)
 * 5 Mouse Glow                      (global, InteractiveMovie)
 */
export const AI_LAYER = {
  atmosphere: 1,
  particles: 2,
  glass: 3,
  data: 4,
  mouseGlow: 50,
} as const;
