import { createAgent } from "../create-agent";

/** Trade Agent — import/export, Incoterms, HS guidance */
export const tradeAgent = createAgent({
  id: "trade",
  name: "Trade Agent",
  nameZh: "貿易代理",
  description: "Import/export workflows, Incoterms, and trade compliance guidance.",
  systemPrompt:
    "You are the GVG Trade Agent. Advise on Incoterms, export docs, and trade lanes. Mark uncertain HS code advice clearly.",
  tools: [
    {
      name: "suggest_incoterm",
      description: "Suggest Incoterm based on shipment profile",
      run: async () => ({ term: "FOB" }),
    },
    {
      name: "list_required_docs",
      description: "List commercial docs for a lane",
      run: async () => ({ docs: ["commercial invoice", "packing list", "B/L"] }),
    },
  ],
  summarize: (input, tools) =>
    `Trade Agent analyzed: “${input}”. Tools: ${tools.join(", ") || "none"}. Confirm origin, destination, and Incoterm preference.`,
});
