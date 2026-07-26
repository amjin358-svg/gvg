export { procurementAgent } from "./procurement";
export { tradeAgent } from "./trade";
export { logisticsAgent } from "./logistics";
export { customerAgent } from "./customer";
export { financeAgent } from "./finance";
export { marketingAgent } from "./marketing";
export { legalAgent } from "./legal";
export { translationAgent } from "./translation";
export { executiveAgent } from "./executive";

import { procurementAgent } from "./procurement";
import { tradeAgent } from "./trade";
import { logisticsAgent } from "./logistics";
import { customerAgent } from "./customer";
import { financeAgent } from "./finance";
import { marketingAgent } from "./marketing";
import { legalAgent } from "./legal";
import { translationAgent } from "./translation";
import { executiveAgent } from "./executive";
import type { AgentId, GvgAgent } from "../types";

export const agents: GvgAgent[] = [
  procurementAgent,
  tradeAgent,
  logisticsAgent,
  customerAgent,
  financeAgent,
  marketingAgent,
  legalAgent,
  translationAgent,
  executiveAgent,
];

export const agentById: Record<AgentId, GvgAgent> = {
  procurement: procurementAgent,
  trade: tradeAgent,
  logistics: logisticsAgent,
  customer: customerAgent,
  finance: financeAgent,
  marketing: marketingAgent,
  legal: legalAgent,
  translation: translationAgent,
  executive: executiveAgent,
};
