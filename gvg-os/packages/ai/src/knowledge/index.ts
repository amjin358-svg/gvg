/** @gvg/ai Knowledge Base */

export type KnowledgeDoc = {
  id: string;
  title: string;
  body: string;
  tags?: string[];
  source?: string;
  updatedAt?: string;
};

const docs = new Map<string, KnowledgeDoc>();

export function upsertDocument(doc: KnowledgeDoc): void {
  docs.set(doc.id, {
    ...doc,
    updatedAt: doc.updatedAt ?? new Date().toISOString(),
  });
}

export function getDocument(id: string): KnowledgeDoc | undefined {
  return docs.get(id);
}

export function searchKnowledge(query: string, limit = 5): KnowledgeDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return Array.from(docs.values()).slice(0, limit);

  return Array.from(docs.values())
    .map((doc) => {
      const hay = `${doc.title} ${doc.body} ${(doc.tags ?? []).join(" ")}`.toLowerCase();
      const score = hay.includes(q) ? 2 : doc.tags?.some((t) => t.toLowerCase().includes(q)) ? 1 : 0;
      return { doc, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.doc);
}

export function listKnowledge(): KnowledgeDoc[] {
  return Array.from(docs.values());
}

export function clearKnowledge(): void {
  docs.clear();
}

upsertDocument({
  id: "kb-incoterms",
  title: "Common Incoterms",
  body: "FOB, CIF, DDP, EXW are frequently used in GVG trade flows. Confirm responsibility for freight and insurance before quoting.",
  tags: ["trade", "incoterms"],
  source: "docs/architecture",
});

upsertDocument({
  id: "kb-brand",
  title: "GVG Brand",
  body: "Global Vista Group. Tagline: Connecting Markets. Creating Value. Primary #0B1F3A. Secondary #C8A35F.",
  tags: ["brand", "marketing"],
  source: "brand",
});
