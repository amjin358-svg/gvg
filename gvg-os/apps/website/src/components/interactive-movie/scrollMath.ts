/** Shared helpers for ScrollControls page ranges (9 pages). */

export const PAGES = 9;

/** Normalized local progress inside page index (0-based). */
export function pageProgress(offset: number, page: number, pages = PAGES): number {
  const start = page / pages;
  const end = (page + 1) / pages;
  if (offset <= start) return 0;
  if (offset >= end) return 1;
  return (offset - start) / (end - start);
}

/** Smoothstep 0→1 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function latLonToVec(lat: number, lon: number, r = 1.62) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}
