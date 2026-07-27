/** Shared cinematic constants */

export const BRAND_NAVY = "#0B1F3A";
export const BRAND_GOLD = "#C8A35F";
export const CLASSIC_GOLD = "#D4AF37";

/** Soft grain — keep subtle unless a scene overrides */
export const NOISE_STRENGTH = 0.02;

export const EARTH_SCROLL_END = "+=3000";

/**
 * Scene05 stack (bottom → top):
 * 1 Animated Grid / Gradient / Noise
 * 2 Particles
 * 3 Charts · Connections · Numbers  (widgets)
 * 4 Glass Dashboard                 (frosted plate under widgets)
 * 5 Mouse Glow                      (global, InteractiveMovie)
 *
 * Glass plate sits just under data so metrics stay legible on the HUD.
 */
export const AI_LAYER = {
  atmosphere: 1,
  particles: 2,
  glass: 3,
  data: 4,
  mouseGlow: 50,
} as const;
