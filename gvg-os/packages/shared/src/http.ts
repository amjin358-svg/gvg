/** Minimal HTTP helpers for BFF / services */

export type HttpJson = Record<string, unknown> | unknown[] | string | number | boolean | null;

export async function fetchJson<T = HttpJson>(
  input: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${input}`);
  }
  return (await res.json()) as T;
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
