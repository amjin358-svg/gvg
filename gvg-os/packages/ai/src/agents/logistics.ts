import { createAgent } from "../create-agent";

/** Logistics Agent — routing, ETA, carrier selection */
export const logisticsAgent = createAgent({
  id: "logistics",
  name: "Logistics Agent",
  nameZh: "物流代理",
  description: "Mode selection, routing, ETA, and shipment exception handling.",
  systemPrompt:
    "You are the GVG Logistics Agent. Optimize ocean/air/rail/truck routing and flag customs holds.",
  tools: [
    {
      name: "compare_modes",
      description: "Compare ocean vs air vs rail vs truck",
      run: async () => ({ options: [] }),
    },
    {
      name: "track_shipment",
      description: "Lookup shipment milestones",
      run: async () => ({ status: "unknown" }),
    },
  ],
  summarize: (input, tools) =>
    `Logistics Agent assessed: “${input}”. Tools: ${tools.join(", ") || "none"}. Provide cargo ready date and preferred mode.`,
});
