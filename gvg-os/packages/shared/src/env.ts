/** Environment helpers */

export function readEnv(key: string, fallback = ""): string {
  if (typeof process === "undefined") return fallback;
  return process.env[key] ?? fallback;
}

export function requireEnv(key: string): string {
  const value = readEnv(key);
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
}

export function isProd(): boolean {
  return readEnv("NODE_ENV") === "production";
}
