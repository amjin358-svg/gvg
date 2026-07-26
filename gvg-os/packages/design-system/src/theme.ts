import { color } from "./color";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { radius } from "./radius";
import { shadow } from "./shadow";
import { animation } from "./animation";

/** Theme compositions */

export const lightTheme = {
  mode: "light" as const,
  color: {
    background: color.white,
    surface: color.slate50,
    card: color.white,
    primary: color.primary,
    secondary: color.secondary,
    text: color.slate900,
    textSecondary: color.slate600,
    border: color.slate200,
  },
  typography,
  spacing,
  radius,
  shadow,
  animation,
};

export const darkTheme = {
  mode: "dark" as const,
  color: {
    background: "#020617",
    surface: color.slate900,
    card: color.black,
    primary: color.primary,
    secondary: color.secondary,
    text: color.slate50,
    textSecondary: color.slate300,
    border: color.slate700,
  },
  typography,
  spacing,
  radius,
  shadow,
  animation,
};

export const defaultTheme = lightTheme;

export type GvgTheme = typeof lightTheme;
