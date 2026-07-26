import { color } from "./color";
import { spacing } from "./spacing";
import { radius, radiusDefault } from "./radius";
import { shadow } from "./shadow";
import { animation } from "./animation";
import { elevation } from "./elevation";
import { glass } from "./glass";
import { gradient } from "./gradient";

/** CSS custom property map (`--gv-*`) */

export function tokensToCssVars() {
  return {
    "--gv-primary": color.primary,
    "--gv-primary-light": color.primaryLight,
    "--gv-secondary": color.secondary,
    "--gv-bg": "#FFFFFF",
    "--gv-surface": color.slate50,
    "--gv-text": color.slate900,
    "--gv-text-secondary": color.slate600,
    "--gv-border": color.slate200,
    "--gv-radius": `${radiusDefault}px`,
    "--gv-shadow-sm": shadow.sm,
    "--gv-shadow-md": shadow.md,
    "--gv-shadow-lg": shadow.lg,
    "--space-md": `${spacing.md}px`,
    "--motion-normal": animation.normal,
    "--z-modal": String(elevation.modal.z),
    "--gv-gradient-hero": gradient.hero,
    "--gv-glass-light-bg": glass.light.background,
  } as const;
}
