"use client";

import { FormEvent, useState } from "react";
import { MarketplaceShell } from "../../../../components/MarketplaceShell";
import { searchProducts } from "@gvg/plugin-marketplace";
import type { Product } from "@gvg/core";

export default function AiSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      const next = await searchProducts(query);
      setResults(next);
    } finally {
      setPending(false);
    }
  }

  return (
    <MarketplaceShell title="AI Search" titleZh="AI 搜尋">
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", gap: 10, maxWidth: 560, marginBottom: 24 }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products with AI…"
          style={{
            flex: 1,
            height: 44,
            borderRadius: 10,
            border: "1px solid #E2E8F0",
            padding: "0 14px",
            fontSize: 14,
            background: "#fff",
          }}
        />
        <button
          type="submit"
          disabled={pending}
          style={{
            height: 44,
            padding: "0 18px",
            borderRadius: 10,
            border: "none",
            background: "#0B1F3A",
            color: "#fff",
            fontWeight: 600,
            cursor: pending ? "wait" : "pointer",
          }}
        >
          {pending ? "Searching…" : "Search"}
        </button>
      </form>

      {results.length === 0 ? (
        <p style={{ color: "#64748B" }}>
          Enter a query to search the marketplace catalog.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {results.map((p) => (
            <li
              key={p.id}
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                background: "#fff",
                border: "1px solid #E2E8F0",
                marginBottom: 10,
              }}
            >
              <a
                href={`/marketplace/products/${p.slug}`}
                style={{
                  color: "#0B1F3A",
                  fontWeight: 650,
                  textDecoration: "none",
                }}
              >
                {p.name}
              </a>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
                {p.sku}
              </div>
            </li>
          ))}
        </ul>
      )}
    </MarketplaceShell>
  );
}
