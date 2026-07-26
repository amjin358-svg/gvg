/**
 * @gvg/design-system — Enterprise Design System v1.0
 *
 * Color · Typography · Spacing · Radius · Shadow
 * Animation · Icon · Elevation · Glass · Gradient
 */

export { color, colors } from "./color";
export type { ColorToken } from "./color";

export { typography } from "./typography";
export type { TypographyStyle } from "./typography";

export { spacing, space } from "./spacing";
export type { SpacingToken } from "./spacing";

export { radius, radiusDefault, round } from "./radius";
export type { RadiusToken } from "./radius";

export { shadow } from "./shadow";
export type { ShadowToken } from "./shadow";

export { animation } from "./animation";
export type { AnimationToken } from "./animation";

export { icon } from "./icon";
export type { IconSize } from "./icon";

export { elevation } from "./elevation";
export type { ElevationToken } from "./elevation";

export { glass, glassCss } from "./glass";
export type { GlassToken } from "./glass";

export { gradient } from "./gradient";
export type { GradientToken } from "./gradient";

export { lightTheme, darkTheme, defaultTheme } from "./theme";
export type { GvgTheme } from "./theme";

export { tokensToCssVars } from "./css-vars";

export const name = "@gvg/design-system";
export const version = "0.1.0";
