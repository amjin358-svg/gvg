/**
 * OpenAPI-oriented route contract stubs for GVG Trade OS.
 */

export interface ApiRouteContract {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  module: string;
  auth: boolean;
}

export const API_CONTRACTS: ApiRouteContract[] = [
  { method: "GET", path: "/api/health", module: "platform", auth: false },
  { method: "GET", path: "/api/products", module: "products", auth: false },
  { method: "GET", path: "/api/rfqs", module: "rfq", auth: true },
  { method: "POST", path: "/api/rfqs", module: "rfq", auth: true },
  { method: "GET", path: "/api/orders", module: "orders", auth: true },
  { method: "POST", path: "/api/ai/procurement", module: "ai", auth: true },
];
