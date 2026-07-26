import { color } from "./color";

/** Gradient recipes — brand navy / gold atmospheres */

export const gradient = {
  hero: `linear-gradient(160deg, ${color.primary} 0%, ${color.primaryLight} 55%, ${color.primary} 100%)`,
  heroGold: `radial-gradient(ellipse at 30% 20%, rgba(200,163,95,0.28), transparent 50%), linear-gradient(160deg, ${color.primary} 0%, ${color.primaryLight} 55%, ${color.primary} 100%)`,
  goldSheen: `linear-gradient(135deg, ${color.secondary} 0%, ${color.secondaryStrong} 50%, ${color.secondary} 100%)`,
  mist: `linear-gradient(180deg, ${color.slate50} 0%, ${color.white} 100%)`,
  inkFade: `linear-gradient(90deg, ${color.primary} 0%, transparent 100%)`,
  aurora: `radial-gradient(circle at 18% 22%, rgba(200,163,95,0.35), transparent 34%), radial-gradient(circle at 78% 18%, rgba(21,50,90,0.45), transparent 30%)`,
} as const;

export type GradientToken = keyof typeof gradient;
