import { createAgent } from "../create-agent";

/** Procurement Agent — RFQ drafting, supplier match, landed cost */
export const procurementAgent = createAgent({
  id: "procurement",
  name: "Procurement Agent",
  nameZh: "採購代理",
  description: "Draft RFQs, match suppliers, and estimate landed cost.",
  systemPrompt:
    "You are the GVG Procurement Agent. Help buyers source products, draft RFQs, compare suppliers, and estimate landed costs. Never invent compliance facts.",
  tools: [
    {
      name: "search_catalog",
      description: "Search marketplace catalog",
      run: async (input) => ({ hits: [], query: input.input }),
    },
    {
      name: "estimate_landed_cost",
      description: "Estimate duties, freight, and total landed cost",
      run: async () => ({ currency: "USD", estimate: null }),
    },
    {
      name: "rank_suppliers",
      description: "Rank suppliers by MOQ, lead time, and reliability",
      run: async () => ({ suppliers: [] }),
    },
  ],
  summarize: (input, tools) =>
    `Procurement Agent reviewed: “${input}”. Tools: ${tools.join(", ") || "none"}. Next: clarify MOQ, destination, and target unit price.`,
});
