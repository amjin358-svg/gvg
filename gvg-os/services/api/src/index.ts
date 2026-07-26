/**
 * @gvg/api — GVG OS system API
 *
 * /api/system
 * /api/runtime
 * /api/plugins
 * /api/modules
 * /api/health
 * /api/config
 */

import { createServer } from "node:http";
import { readEnv } from "@gvg/shared";
import { bootstrapApplicationContext } from "@gvg/core";
import { handleRequest } from "./router";

export { handleRequest } from "./router";
export { getSystem } from "./routes/system";
export { getRuntime } from "./routes/runtime";
export { getPlugins } from "./routes/plugins";
export { getModules } from "./routes/modules";
export { getHealth } from "./routes/health";
export { getConfigView, patchConfig } from "./routes/config";

bootstrapApplicationContext({ name: "GVG OS" });

const port = Number(readEnv("API_PORT", "8787"));

const server = createServer((req, res) => {
  void handleRequest(req, res).catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: message }));
  });
});

if (process.env.GVG_API_DISABLE_LISTEN !== "1") {
  server.listen(port, () => {
    console.log(`[@gvg/api] listening on http://localhost:${port}`);
    console.log("  GET /api/system");
    console.log("  GET /api/runtime");
    console.log("  GET /api/plugins");
    console.log("  GET /api/modules");
    console.log("  GET /api/health");
    console.log("  GET|PATCH /api/config");
  });
}

export { server, port };
