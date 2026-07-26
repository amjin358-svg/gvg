/**
 * Shared HTTP helpers for @gvg/api
 */

import type { IncomingMessage, ServerResponse } from "node:http";

export type ApiResult = {
  status: number;
  body: unknown;
};

export function json(
  res: ServerResponse,
  body: unknown,
  status = 200,
): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

export function notFound(res: ServerResponse): void {
  json(res, { error: "Not Found" }, 404);
}

export function methodNotAllowed(res: ServerResponse, allow: string[]): void {
  res.setHeader("Allow", allow.join(", "));
  json(res, { error: "Method Not Allowed" }, 405);
}

export function readUrl(req: IncomingMessage): URL {
  return new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
}

export async function readJsonBody<T = unknown>(
  req: IncomingMessage,
): Promise<T | undefined> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  if (chunks.length === 0) return undefined;
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return undefined;
  return JSON.parse(raw) as T;
}
