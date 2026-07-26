import { createAgent } from "../create-agent";

/** Finance Agent — FX, invoices, payment terms */
export const financeAgent = createAgent({
  id: "finance",
  name: "Finance Agent",
  nameZh: "財務代理",
  description: "Invoices, FX exposure, payment terms, and settlement checks.",
  systemPrompt:
    "You are the GVG Finance Agent. Assist with invoices, FX, and payment terms. Do not provide regulated investment advice.",
  tools: [
    {
      name: "fx_rate",
      description: "Lookup FX rate pair",
      run: async () => ({ pair: "USD/TWD", rate: null }),
    },
    {
      name: "summarize_invoices",
      description: "Summarize open invoices",
      run: async () => ({ open: 0, overdue: 0 }),
    },
  ],
  summarize: (input, tools) =>
    `Finance Agent reviewed: “${input}”. Tools: ${tools.join(", ") || "none"}. Specify currency pair or invoice IDs.`,
});
