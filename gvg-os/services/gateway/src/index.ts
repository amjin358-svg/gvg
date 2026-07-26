import { getConfig } from "@gvg/core/config";
import { logger } from "@gvg/core/logger";
import { readEnv } from "@gvg/shared";

/**
 * @gvg/gateway — edge entry for apps → services
 */

export type GatewayRoute = {
  prefix: string;
  upstream: string;
  auth?: boolean;
};

export const defaultRoutes: GatewayRoute[] = [
  { prefix: "/api/system", upstream: "api", auth: false },
  { prefix: "/api/runtime", upstream: "api", auth: false },
  { prefix: "/api/plugins", upstream: "api", auth: false },
  { prefix: "/api/modules", upstream: "api", auth: false },
  { prefix: "/api/health", upstream: "api", auth: false },
  { prefix: "/api/config", upstream: "api", auth: false },
  { prefix: "/api/", upstream: "api", auth: true },
  { prefix: "/ai/", upstream: "api", auth: true },
];

export function resolveUpstream(
  pathname: string,
  routes = defaultRoutes,
): GatewayRoute | null {
  return routes.find((r) => pathname.startsWith(r.prefix)) ?? null;
}

export function startGateway() {
  const port = Number(readEnv("GATEWAY_PORT", "8080"));
  const config = getConfig();
  logger.info("gateway ready", {
    port,
    env: config.env,
    routes: defaultRoutes.map((r) => r.prefix),
  });
  return { port, routes: defaultRoutes };
}

startGateway();
