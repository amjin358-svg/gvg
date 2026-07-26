/** @gvg/ai Tool Registry */

import type { AgentTool } from "../types";

export type RegisteredTool = AgentTool & {
  id: string;
  version: string;
  agentIds?: string[];
};

const tools = new Map<string, RegisteredTool>();

export function registerTool(tool: RegisteredTool): void {
  tools.set(tool.id, tool);
}

export function getTool(id: string): RegisteredTool | undefined {
  return tools.get(id);
}

export function listTools(filter?: { agentId?: string }): RegisteredTool[] {
  const all = Array.from(tools.values());
  if (!filter?.agentId) return all;
  return all.filter((t) => !t.agentIds?.length || t.agentIds.includes(filter.agentId!));
}

export async function runTool(id: string, input: Record<string, unknown> = {}) {
  const tool = getTool(id);
  if (!tool) throw new Error(`Tool not found: ${id}`);
  return tool.run(input);
}

export function clearTools(): void {
  tools.clear();
}

registerTool({
  id: "search_catalog",
  name: "search_catalog",
  version: "1.0.0",
  description: "Search marketplace catalog",
  agentIds: ["procurement", "customer"],
  run: async (input) => ({ hits: [], query: input.input ?? null }),
});

registerTool({
  id: "estimate_landed_cost",
  name: "estimate_landed_cost",
  version: "1.0.0",
  description: "Estimate duties, freight, and total landed cost",
  agentIds: ["procurement", "finance", "trade"],
  run: async () => ({ currency: "USD", estimate: null }),
});

registerTool({
  id: "track_shipment",
  name: "track_shipment",
  version: "1.0.0",
  description: "Lookup shipment milestones",
  agentIds: ["logistics", "customer", "executive"],
  run: async () => ({ status: "unknown" }),
});

registerTool({
  id: "kpi_snapshot",
  name: "kpi_snapshot",
  version: "1.0.0",
  description: "Fetch executive KPI snapshot",
  agentIds: ["executive"],
  run: async () => ({ openRfqs: 0, inTransit: 0, revenueMtd: null }),
});
