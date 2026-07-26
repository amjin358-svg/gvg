/** @gvg/ai Prompt Manager */

export type PromptTemplate = {
  id: string;
  name: string;
  agentId?: string;
  version: string;
  system: string;
  user?: string;
  tags?: string[];
};

const prompts = new Map<string, PromptTemplate>();

export function registerPrompt(template: PromptTemplate): void {
  prompts.set(template.id, template);
}

export function getPrompt(id: string): PromptTemplate | undefined {
  return prompts.get(id);
}

export function listPrompts(filter?: { agentId?: string; tag?: string }): PromptTemplate[] {
  let items = Array.from(prompts.values());
  if (filter?.agentId) items = items.filter((p) => p.agentId === filter.agentId);
  if (filter?.tag) items = items.filter((p) => p.tags?.includes(filter.tag!));
  return items;
}

export function renderPrompt(
  id: string,
  vars: Record<string, string> = {},
): { system: string; user?: string } {
  const template = getPrompt(id);
  if (!template) throw new Error(`Prompt not found: ${id}`);

  const fill = (text: string) =>
    text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");

  return {
    system: fill(template.system),
    user: template.user ? fill(template.user) : undefined,
  };
}

export function clearPrompts(): void {
  prompts.clear();
}

/** Seed brand-aligned defaults */
registerPrompt({
  id: "gvg.system.base",
  name: "GVG Base System",
  version: "1.0.0",
  system:
    "You are part of Global Vista Group AI Brain. Tagline: Connecting Markets. Creating Value. Be precise, operational, and never invent compliance facts.",
  tags: ["system"],
});

registerPrompt({
  id: "gvg.procurement.rfq",
  name: "RFQ Draft",
  agentId: "procurement",
  version: "1.0.0",
  system: "Draft a clear B2B RFQ. Include MOQ, destination, Incoterm preference, and quality notes.",
  user: "Product: {{product}}\nQuantity: {{qty}}\nDestination: {{destination}}",
  tags: ["procurement", "rfq"],
});
