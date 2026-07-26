import type { AgentId, AgentRequest, AgentResponse, GvgAgent } from "./types";
import { agentById, agents } from "./agents";

/**
 * AI Brain — routes intents to specialized GVG agents.
 */
export class AiBrain {
  constructor(private readonly roster: GvgAgent[] = agents) {}

  listAgents() {
    return this.roster.map((a) => ({
      id: a.id,
      name: a.name,
      nameZh: a.nameZh,
      description: a.description,
    }));
  }

  getAgent(id: AgentId) {
    return agentById[id];
  }

  /** Naive router — keyword match; replace with classifier later. */
  route(input: string): AgentId {
    const text = input.toLowerCase();
    if (/rfq|supplier|moq|landed|procurement|採購|詢價/.test(text)) return "procurement";
    if (/incoterm|hs code|export|import|貿易|報關/.test(text)) return "trade";
    if (/shipment|eta|freight|ocean|air|物流|貨運/.test(text)) return "logistics";
    if (/invoice|fx|payment|財務|匯率/.test(text)) return "finance";
    if (/campaign|copy|marketing|行銷/.test(text)) return "marketing";
    if (/contract|legal|條款|法務/.test(text)) return "legal";
    if (/translate|翻譯|中英/.test(text)) return "translation";
    if (/kpi|executive|board|高階|營運摘要/.test(text)) return "executive";
    if (/order status|portal|客戶|訂單狀態/.test(text)) return "customer";
    return "executive";
  }

  async ask(request: AgentRequest & { agentId?: AgentId }): Promise<AgentResponse> {
    const id = request.agentId ?? this.route(request.input);
    const agent = this.getAgent(id);
    return agent.run(request);
  }
}

export const brain = new AiBrain();

export function createAiBrain(roster?: GvgAgent[]) {
  return new AiBrain(roster);
}
