/** @gvg/kernel/config/Environment */

export type GvgEnv = "development" | "preview" | "staging" | "production";

export function resolveEnvironment(
  value: string | undefined = process.env.NODE_ENV,
): GvgEnv {
  switch (value) {
    case "production":
      return "production";
    case "staging":
      return "staging";
    case "preview":
      return "preview";
    default:
      return "development";
  }
}

export function isProduction(env: GvgEnv = resolveEnvironment()): boolean {
  return env === "production";
}
