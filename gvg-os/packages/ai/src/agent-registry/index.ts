/** @gvg/ai Agent Registry */

import type { AgentId, GvgAgent } from "../types";
import { agents as defaultAgents } from "../agents";

const registry = new Map<string, GvgAgent>();

for (const agent of defaultAgents) {
  registry.set(agent.id, agent);
}

export function registerAgent(agent: GvgAgent): void {
  registry.set(agent.id, agent);
}

export function unregisterAgent(id: AgentId | string): boolean {
  return registry.delete(id);
}

export function getRegisteredAgent(id: AgentId | string): GvgAgent | undefined {
  return registry.get(id);
}

export function listRegisteredAgents(): GvgAgent[] {
  return Array.from(registry.values());
}

export function clearAgentRegistry(seedDefaults = true): void {
  registry.clear();
  if (seedDefaults) {
    for (const agent of defaultAgents) registry.set(agent.id, agent);
  }
}

export type AgentRegistrySnapshot = {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  tools: string[];
};

export function snapshotAgents(): AgentRegistrySnapshot[] {
  return listRegisteredAgents().map((a) => ({
    id: a.id,
    name: a.name,
    nameZh: a.nameZh,
    description: a.description,
    tools: a.tools.map((t) => t.name),
  }));
}
