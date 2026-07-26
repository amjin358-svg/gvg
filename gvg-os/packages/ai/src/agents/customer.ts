import { createAgent } from "../create-agent";

/** Customer Agent — portal support, order status, RFQ help */
export const customerAgent = createAgent({
  id: "customer",
  name: "Customer Agent",
  nameZh: "客戶代理",
  description: "Buyer portal support, order status, and RFQ assistance.",
  systemPrompt:
    "You are the GVG Customer Agent. Help buyers with portal tasks, order tracking, and RFQ status in clear bilingual-friendly language.",
  tools: [
    {
      name: "get_order_status",
      description: "Fetch order status by number",
      run: async () => ({ status: "pending" }),
    },
    {
      name: "list_open_rfqs",
      description: "List open RFQs for the buyer",
      run: async () => ({ rfqs: [] }),
    },
  ],
  summarize: (input, tools) =>
    `Customer Agent handled: “${input}”. Tools: ${tools.join(", ") || "none"}. Share order/RFQ number for precise status.`,
});
