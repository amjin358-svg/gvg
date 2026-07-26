/** Glass — frosted surface recipes */

export const glass = {
  light: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.25)",
    blur: "12px",
    shadow: "0 8px 20px rgba(0,0,0,.12)",
  },
  dark: {
    background: "rgba(11,31,58,0.55)",
    border: "1px solid rgba(255,255,255,0.12)",
    blur: "16px",
    shadow: "0 12px 32px rgba(11,31,58,.28)",
  },
  gold: {
    background: "rgba(200,163,95,0.18)",
    border: "1px solid rgba(200,163,95,0.35)",
    blur: "14px",
    shadow: "0 8px 24px rgba(200,163,95,.28)",
  },
} as const;

export type GlassToken = keyof typeof glass;

export function glassCss(token: GlassToken = "light"): string {
  const g = glass[token];
  return [
    `background:${g.background}`,
    `border:${g.border}`,
    `backdrop-filter:blur(${g.blur})`,
    `-webkit-backdrop-filter:blur(${g.blur})`,
    `box-shadow:${g.shadow}`,
  ].join(";");
}
