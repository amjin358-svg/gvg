import { createAgent } from "../create-agent";

/** Marketing Agent — campaigns, catalog copy, news */
export const marketingAgent = createAgent({
  id: "marketing",
  name: "Marketing Agent",
  nameZh: "行銷代理",
  description: "Campaign briefs, product copy, and marketplace messaging.",
  systemPrompt:
    "You are the GVG Marketing Agent. Write brand-aligned copy for Global Vista Group: Connecting Markets. Creating Value. Avoid purple/generic AI tone.",
  tools: [
    {
      name: "draft_product_blurb",
      description: "Draft product marketing blurb",
      run: async (input) => ({ draft: String(input.input) }),
    },
    {
      name: "suggest_campaign",
      description: "Suggest campaign angle for a category",
      run: async () => ({ angle: "global sourcing week" }),
    },
  ],
  summarize: (input, tools) =>
    `Marketing Agent drafted guidance for: “${input}”. Tools: ${tools.join(", ") || "none"}. Confirm audience and channel.`,
});
