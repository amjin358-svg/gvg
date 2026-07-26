/** Color tokens — Global Vista Group */

export const color = {
  primary: "#0B1F3A",
  primaryLight: "#15325A",
  secondary: "#C8A35F",
  secondaryStrong: "#B8924A",

  white: "#FFFFFF",
  black: "#111827",

  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",

  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
} as const;

export type ColorToken = keyof typeof color;

/** @deprecated use `color` */
export const colors = color;
