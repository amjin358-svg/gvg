/** Typography tokens */

export const typography = {
  fontSans: 'Outfit, "Noto Sans TC", system-ui, sans-serif',
  fontDisplay: "Outfit, system-ui, sans-serif",
  fontMono: "ui-monospace, SFMono-Regular, Menlo, monospace",

  hero: { size: "64px", weight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" },
  h1: { size: "48px", weight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" },
  h2: { size: "36px", weight: 700, lineHeight: 1.2, letterSpacing: "-0.01em" },
  h3: { size: "28px", weight: 600, lineHeight: 1.3, letterSpacing: "0" },
  h4: { size: "22px", weight: 600, lineHeight: 1.35, letterSpacing: "0" },
  body: { size: "16px", weight: 400, lineHeight: 1.7, letterSpacing: "0" },
  small: { size: "14px", weight: 400, lineHeight: 1.5, letterSpacing: "0" },
  caption: { size: "12px", weight: 500, lineHeight: 1.4, letterSpacing: "0.04em" },
} as const;

export type TypographyStyle = keyof Omit<
  typeof typography,
  "fontSans" | "fontDisplay" | "fontMono"
>;
