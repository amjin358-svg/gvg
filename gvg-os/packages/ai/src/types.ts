/** Shared agent contracts for GVG AI Brain */

export type AgentId =
  | "procurement"
  | "trade"
  | "logistics"
  | "customer"
  | "finance"
  | "marketing"
  | "legal"
  | "translation"
  | "executive";

export type AgentMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  toolName?: string;
};

export type AgentTool = {
  name: string;
  description: string;
  run: (input: Record<string, unknown>) => Promise<unknown> | unknown;
};

export type AgentContext = {
  organizationId?: string;
  userId?: string;
  locale?: string;
  metadata?: Record<string, unknown>;
};

export type AgentRequest = {
  input: string;
  history?: AgentMessage[];
  context?: AgentContext;
};

export type AgentResponse = {
  agentId: AgentId;
  output: string;
  confidence: number;
  toolsUsed: string[];
  citations?: string[];
  uncertain?: boolean;
};

export type GvgAgent = {
  id: AgentId;
  name: string;
  nameZh: string;
  description: string;
  systemPrompt: string;
  tools: AgentTool[];
  run: (request: AgentRequest) => Promise<AgentResponse>;
};
