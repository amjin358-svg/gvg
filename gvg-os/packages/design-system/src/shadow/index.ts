/** Shadow tokens */

export const shadow = {
  none: "none",
  sm: "0 1px 3px rgba(0,0,0,.08)",
  md: "0 8px 20px rgba(0,0,0,.12)",
  lg: "0 20px 40px rgba(0,0,0,.16)",
  xl: "0 30px 60px rgba(0,0,0,.20)",
  gold: "0 8px 24px rgba(200,163,95,.28)",
  navy: "0 12px 32px rgba(11,31,58,.28)",
} as const;

export type ShadowToken = keyof typeof shadow;
