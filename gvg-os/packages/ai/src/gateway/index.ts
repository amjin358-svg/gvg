/** @gvg/ai AI Gateway — single entry for model/agent calls */

import type { AgentId, AgentRequest, AgentResponse } from "../types";
import { AiBrain, createAiBrain } from "../brain";
import { renderPrompt, getPrompt } from "../prompts";
import { searchKnowledge } from "../knowledge";
import { listTools, runTool } from "../tools";
import { getRegisteredAgent, listRegisteredAgents } from "../agent-registry";
import { logger } from "@gvg/core/logger";

export type GatewayChatRequest = AgentRequest & {
  agentId?: AgentId;
  promptId?: string;
  useKnowledge?: boolean;
};

export type GatewayChatResult = AgentResponse & {
  knowledgeHits?: Array<{ id: string; title: string }>;
  promptId?: string;
};

/**
 * AI Gateway
 * - Routes to Agent Registry
 * - Optionally injects Prompt Manager + Knowledge Base context
 * - Exposes Tool Registry for direct tool execution
 */
export class AiGateway {
  constructor(private readonly brain: AiBrain = createAiBrain(listRegisteredAgents())) {}

  listAgents() {
    return listRegisteredAgents().map((a) => ({
      id: a.id,
      name: a.name,
      nameZh: a.nameZh,
      description: a.description,
    }));
  }

  listTools(agentId?: string) {
    return listTools(agentId ? { agentId } : undefined);
  }

  async invokeTool(toolId: string, input: Record<string, unknown> = {}) {
    logger.info("ai.gateway.tool", { toolId });
    return runTool(toolId, input);
  }

  async chat(request: GatewayChatRequest): Promise<GatewayChatResult> {
    const agentId = request.agentId ?? this.brain.route(request.input);
    const agent = getRegisteredAgent(agentId);
    if (!agent) throw new Error(`Agent not registered: ${agentId}`);

    let input = request.input;
    let promptId = request.promptId;
    const knowledgeHits =
      request.useKnowledge === false
        ? []
        : searchKnowledge(request.input, 3).map((d) => ({ id: d.id, title: d.title }));

    if (promptId && getPrompt(promptId)) {
      const rendered = renderPrompt(promptId, {
        product: request.input,
        qty: "",
        destination: "",
      });
      input = [rendered.system, rendered.user, request.input].filter(Boolean).join("\n\n");
    }

    if (knowledgeHits.length) {
      const snippets = searchKnowledge(request.input, 3)
        .map((d) => `- ${d.title}: ${d.body}`)
        .join("\n");
      input = `${input}\n\nKnowledge:\n${snippets}`;
    }

    logger.info("ai.gateway.chat", { agentId, promptId, knowledge: knowledgeHits.length });

    const response = await this.brain.ask({
      ...request,
      agentId,
      input,
    });

    return {
      ...response,
      knowledgeHits,
      promptId,
    };
  }
}

export const gateway = new AiGateway();

export function createAiGateway(brain?: AiBrain) {
  return brain ? new AiGateway(brain) : new AiGateway();
}
