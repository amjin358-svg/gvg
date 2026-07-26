import type { AgentRequest, AgentResponse, AgentTool, GvgAgent, AgentId } from "./types";

/** Base runner — deterministic stub until model provider is wired */

export function createAgent(config: {
  id: AgentId;
  name: string;
  nameZh: string;
  description: string;
  systemPrompt: string;
  tools?: AgentTool[];
  summarize: (input: string, toolsUsed: string[]) => string;
}): GvgAgent {
  const tools = config.tools ?? [];

  return {
    id: config.id,
    name: config.name,
    nameZh: config.nameZh,
    description: config.description,
    systemPrompt: config.systemPrompt,
    tools,
    async run(request: AgentRequest): Promise<AgentResponse> {
      const toolsUsed: string[] = [];
      const lower = request.input.toLowerCase();

      for (const tool of tools) {
        if (lower.includes(tool.name.replace(/_/g, " ")) || lower.includes(tool.name)) {
          await tool.run({ input: request.input, context: request.context });
          toolsUsed.push(tool.name);
        }
      }

      return {
        agentId: config.id,
        output: config.summarize(request.input, toolsUsed),
        confidence: toolsUsed.length ? 0.82 : 0.7,
        toolsUsed,
        uncertain: false,
      };
    },
  };
}
