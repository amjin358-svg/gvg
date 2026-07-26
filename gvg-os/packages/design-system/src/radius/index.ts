/** Border radius */

export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  "2xl": 28,
  full: 9999,
} as const;

/** Default interactive radius (brand) */
export const radiusDefault = radius.lg;

export type RadiusToken = keyof typeof radius;

export function round(token: RadiusToken): string {
  return `${radius[token]}px`;
}
