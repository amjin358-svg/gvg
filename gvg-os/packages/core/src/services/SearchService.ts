/**
 * @gvg/core/services/SearchService
 *
 * Lightweight in-memory search index for catalog / docs preview.
 */

export type SearchDocument = {
  id: string;
  title: string;
  body?: string;
  type?: string;
  tags?: string[];
  href?: string;
  meta?: Record<string, unknown>;
};

export type SearchHit = {
  id: string;
  score: number;
  document: SearchDocument;
};

export type SearchQuery = {
  q: string;
  type?: string;
  tags?: string[];
  limit?: number;
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fff]+/i)
    .filter(Boolean);
}

export class SearchService {
  private readonly documents = new Map<string, SearchDocument>();

  index(doc: SearchDocument): void {
    this.documents.set(doc.id, {
      ...doc,
      tags: doc.tags ? [...doc.tags] : undefined,
      meta: doc.meta ? { ...doc.meta } : undefined,
    });
  }

  indexMany(docs: SearchDocument[]): void {
    for (const doc of docs) this.index(doc);
  }

  remove(id: string): boolean {
    return this.documents.delete(id);
  }

  get(id: string): SearchDocument | undefined {
    const doc = this.documents.get(id);
    return doc ? { ...doc, tags: doc.tags ? [...doc.tags] : undefined } : undefined;
  }

  clear(): void {
    this.documents.clear();
  }

  search(query: SearchQuery): SearchHit[] {
    const terms = tokenize(query.q);
    if (terms.length === 0) return [];

    const hits: SearchHit[] = [];

    for (const doc of this.documents.values()) {
      if (query.type && doc.type !== query.type) continue;
      if (query.tags?.length) {
        const tags = new Set(doc.tags ?? []);
        if (!query.tags.every((t) => tags.has(t))) continue;
      }

      const haystack = tokenize(
        [doc.title, doc.body ?? "", ...(doc.tags ?? [])].join(" "),
      );
      let score = 0;
      for (const term of terms) {
        if (haystack.includes(term)) score += 1;
        if (tokenize(doc.title).includes(term)) score += 2;
      }
      if (score > 0) {
        hits.push({
          id: doc.id,
          score,
          document: { ...doc, tags: doc.tags ? [...doc.tags] : undefined },
        });
      }
    }

    hits.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
    return hits.slice(0, query.limit ?? 25);
  }

  count(): number {
    return this.documents.size;
  }
}

export function createSearchService(): SearchService {
  return new SearchService();
}
