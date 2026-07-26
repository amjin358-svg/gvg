/**
 * GET /api/health
 */

import {
  createHealthService,
  predicateIndicator,
  getCache,
  getStorage,
} from "@gvg/core";

let health = createHealthService({ includePing: true })
  .register(
    predicateIndicator(
      "cache",
      async () => {
        const cache = getCache();
        await cache.set("__health__", true, 1000);
        return (await cache.get("__health__")) === true;
      },
      { name: "Cache", critical: true },
    ),
  )
  .register(
    predicateIndicator(
      "storage",
      async () => {
        const storage = getStorage();
        await storage.put({
          key: "__health__/ping.txt",
          body: "ok",
          contentType: "text/plain",
        });
        return storage.exists("__health__/ping.txt");
      },
      { name: "Storage", critical: false },
    ),
  );

export function setHealthServiceForApi(
  service: ReturnType<typeof createHealthService>,
): void {
  health = service;
}

export async function getHealth() {
  const status = await health.check();
  const httpStatus = status.ready ? 200 : 503;
  return { httpStatus, body: status };
}
