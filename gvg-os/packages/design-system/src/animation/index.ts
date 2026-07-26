/** Animation / motion tokens */

export const animation = {
  fast: "150ms ease",
  normal: "250ms ease",
  slow: "400ms ease",
  cinematic: "700ms cubic-bezier(0.22, 1, 0.36, 1)",

  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
    cinematic: 700,
  },

  easing: {
    standard: "ease",
    entrance: "cubic-bezier(0.22, 1, 0.36, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
    linear: "linear",
  },
} as const;

export type AnimationToken = keyof typeof animation.duration;
