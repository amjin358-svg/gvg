import { createAgent } from "../create-agent";

/** Translation Agent — zh/en trade document translation */
export const translationAgent = createAgent({
  id: "translation",
  name: "Translation Agent",
  nameZh: "翻譯代理",
  description: "Bilingual (zh/en) translation for trade documents and UI copy.",
  systemPrompt:
    "You are the GVG Translation Agent. Translate between Traditional Chinese and English with trade terminology precision. Preserve numbers, Incoterms, and SKUs.",
  tools: [
    {
      name: "translate",
      description: "Translate text between zh and en",
      run: async (input) => ({ text: input.input, note: "stub" }),
    },
    {
      name: "glossary_lookup",
      description: "Lookup approved trade glossary term",
      run: async () => ({ term: null }),
    },
  ],
  summarize: (input, tools) =>
    `Translation Agent processed: “${input}”. Tools: ${tools.join(", ") || "none"}. Specify source/target language if ambiguous.`,
});
