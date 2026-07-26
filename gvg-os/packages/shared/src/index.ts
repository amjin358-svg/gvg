/**
 * @gvg/shared — Cross-cutting utilities
 */

export { readEnv, requireEnv, isProd } from "./env";
export { ok, err, unwrap } from "./result";
export type { Result, Ok, Err } from "./result";
export { fetchJson, jsonResponse } from "./http";
export type { HttpJson } from "./http";

export const name = "@gvg/shared";
export const version = "0.1.0";
