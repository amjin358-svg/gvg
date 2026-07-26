import { createAgent } from "../create-agent";

/** Executive Agent — KPI briefings, cross-domain summaries */
export const executiveAgent = createAgent({
  id: "executive",
  name: "Executive Agent",
  nameZh: "高階代理",
  description: "Executive briefings across trade, finance, logistics, and growth KPIs.",
  systemPrompt:
    "You are the GVG Executive Agent. Summarize cross-domain KPIs for leadership. Be concise, decision-oriented, and brand-consistent.",
  tools: [
    {
      name: "kpi_snapshot",
      description: "Fetch executive KPI snapshot",
      run: async () => ({
        openRfqs: 0,
        inTransit: 0,
        revenueMtd: null,
      }),
    },
    {
      name: "risk_digest",
      description: "Summarize top operational risks",
      run: async () => ({ risks: [] }),
    },
  ],
  summarize: (input, tools) =>
    `Executive Agent briefing for: “${input}”. Tools: ${tools.join(", ") || "none"}. Ask for timeframe (WoW / MoM) if needed.`,
});
