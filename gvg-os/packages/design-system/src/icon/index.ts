/** Icon sizing & stroke conventions */

export const icon = {
  size: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    "2xl": 40,
  },
  stroke: {
    thin: 1.25,
    regular: 1.75,
    bold: 2.25,
  },
  /** Default Lucide-compatible defaults */
  defaults: {
    size: 20,
    strokeWidth: 1.75,
  },
} as const;

export type IconSize = keyof typeof icon.size;
