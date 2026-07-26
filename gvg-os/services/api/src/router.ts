/**
 * API router — system / runtime / plugins / modules / health / config
 */

import type { IncomingMessage, ServerResponse } from "node:http";
import { json, methodNotAllowed, notFound, readJsonBody, readUrl } from "./http";
import { getSystem } from "./routes/system";
import { getRuntime } from "./routes/runtime";
import { getPlugins } from "./routes/plugins";
import { getModules } from "./routes/modules";
import { getHealth } from "./routes/health";
import { getConfigView, patchConfig } from "./routes/config";
import type { CoreSettings } from "@gvg/core/config";
import type { GvgConfig } from "@gvg/kernel/config";

export async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = readUrl(req);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = (req.method ?? "GET").toUpperCase();

  if (path === "/api/system") {
    if (method !== "GET") return methodNotAllowed(res, ["GET"]);
    return json(res, getSystem());
  }

  if (path === "/api/runtime") {
    if (method !== "GET") return methodNotAllowed(res, ["GET"]);
    return json(res, getRuntime());
  }

  if (path === "/api/plugins") {
    if (method !== "GET") return methodNotAllowed(res, ["GET"]);
    return json(res, getPlugins());
  }

  if (path === "/api/modules") {
    if (method !== "GET") return methodNotAllowed(res, ["GET"]);
    return json(res, getModules());
  }

  if (path === "/api/health") {
    if (method !== "GET") return methodNotAllowed(res, ["GET"]);
    const { httpStatus, body } = await getHealth();
    return json(res, body, httpStatus);
  }

  if (path === "/api/config") {
    if (method === "GET") return json(res, getConfigView());
    if (method === "PATCH" || method === "PUT") {
      const body = (await readJsonBody<{
        settings?: Partial<CoreSettings>;
        app?: Partial<GvgConfig>;
      }>(req)) ?? {};
      return json(res, patchConfig(body));
    }
    return methodNotAllowed(res, ["GET", "PATCH", "PUT"]);
  }

  if (path === "/" || path === "/api") {
    return json(res, {
      service: "@gvg/api",
      endpoints: [
        "/api/system",
        "/api/runtime",
        "/api/plugins",
        "/api/modules",
        "/api/health",
        "/api/config",
      ],
    });
  }

  return notFound(res);
}
