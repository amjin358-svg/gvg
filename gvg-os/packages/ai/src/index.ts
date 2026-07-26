/**
 * @gvg/ai — GVG AI Brain
 *
 * Infrastructure:
 * AI Gateway · Prompt Manager · Knowledge Base · Tool Registry · Agent Registry
 *
 * Agents:
 * Procurement · Trade · Logistics · Customer · Finance
 * Marketing · Legal · Translation · Executive
 */

export type {
  AgentId,
  AgentMessage,
  AgentTool,
  AgentContext,
  AgentRequest,
  AgentResponse,
  GvgAgent,
} from "./types";

export { createAgent } from "./create-agent";
export { AiBrain, brain, createAiBrain } from "./brain";

export {
  agents,
  agentById,
  procurementAgent,
  tradeAgent,
  logisticsAgent,
  customerAgent,
  financeAgent,
  marketingAgent,
  legalAgent,
  translationAgent,
  executiveAgent,
} from "./agents";

export { AiGateway, gateway, createAiGateway } from "./gateway";
export type { GatewayChatRequest, GatewayChatResult } from "./gateway";

export {
  registerPrompt,
  getPrompt,
  listPrompts,
  renderPrompt,
  clearPrompts,
} from "./prompts";
export type { PromptTemplate } from "./prompts";

export {
  upsertDocument,
  getDocument,
  searchKnowledge,
  listKnowledge,
  clearKnowledge,
} from "./knowledge";
export type { KnowledgeDoc } from "./knowledge";

export {
  registerTool,
  getTool,
  listTools,
  runTool,
  clearTools,
} from "./tools";
export type { RegisteredTool } from "./tools";

export {
  registerAgent,
  unregisterAgent,
  getRegisteredAgent,
  listRegisteredAgents,
  clearAgentRegistry,
  snapshotAgents,
} from "./agent-registry";
export type { AgentRegistrySnapshot } from "./agent-registry";

export const name = "@gvg/ai";
export const version = "0.1.0";
