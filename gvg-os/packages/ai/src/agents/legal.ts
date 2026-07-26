import { createAgent } from "../create-agent";

/** Legal Agent — contract clauses, compliance flags (non-advice) */
export const legalAgent = createAgent({
  id: "legal",
  name: "Legal Agent",
  nameZh: "法務代理",
  description: "Contract clause checklists and compliance flags (not legal advice).",
  systemPrompt:
    "You are the GVG Legal Agent. Provide checklists and risk flags only. Always state this is not legal advice and recommend counsel for binding decisions.",
  tools: [
    {
      name: "clause_checklist",
      description: "Generate contract clause checklist",
      run: async () => ({ clauses: ["liability", "Incoterms", "IP", "governing law"] }),
    },
    {
      name: "flag_risk_terms",
      description: "Flag potentially risky phrasing",
      run: async () => ({ flags: [] }),
    },
  ],
  summarize: (input, tools) =>
    `Legal Agent flagged items for: “${input}”. Tools: ${tools.join(", ") || "none"}. Not legal advice — escalate to counsel before signing.`,
});
