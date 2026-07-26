"use client";

import { useState, useTransition } from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { products } from "@/frontend/data/mock/catalog";
import { formatCurrency } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "Find OEM apparel suppliers under $12/unit",
  "Estimate landed cost for Omega-3 to Los Angeles",
  "Draft an RFQ for ceramic canisters to Tokyo",
];

function buildAssistantReply(prompt: string): string {
  const lower = prompt.toLowerCase();

  const scored = products
    .map((product) => {
      let score = 0;
      const categoryLabel = product.categorySlug.replaceAll("-", " ");
      if (lower.includes(categoryLabel)) score += 5;
      if (lower.includes("apparel") && product.categorySlug === "branded-apparel") score += 5;
      if (lower.includes("supplement") && product.categorySlug === "health-supplements") score += 5;
      if (lower.includes("ceramic") && product.slug.includes("ceramic")) score += 4;
      if (lower.includes("omega") && product.slug.includes("omega")) score += 4;
      if (lower.includes("oem") && product.tags.some((tag) => tag.toLowerCase().includes("oem") || tag.toLowerCase().includes("odm"))) {
        score += 2;
      }
      if (product.tags.some((tag) => lower.includes(tag.toLowerCase()))) score += 1;
      const firstName = product.name.toLowerCase().split(" ")[0] ?? "";
      if (firstName.length > 3 && lower.includes(firstName)) score += 2;

      const priceMatch = lower.match(/under\s*\$?\s*(\d+(?:\.\d+)?)/);
      if (priceMatch) {
        const max = Number(priceMatch[1]);
        if (product.unitPrice <= max) score += 3;
        else score -= 2;
      }

      return { product, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const match = scored[0]?.product;

  if (lower.includes("landed") || lower.includes("cost")) {
    const product = match ?? products[0];
    const freight = product.unitPrice * 0.12;
    const duty = product.unitPrice * 0.05;
    const landed = product.unitPrice + freight + duty;
    return `Estimated landed cost for ${product.name}: unit ${formatCurrency(product.unitPrice)} + freight ~${formatCurrency(freight)} + duty ~${formatCurrency(duty)} ≈ ${formatCurrency(landed)}/unit (demo model). Lead time ${product.leadTimeDays} days from ${product.originCountry}.`;
  }

  if (lower.includes("rfq") || lower.includes("draft")) {
    const product = match ?? products[2];
    return `Draft RFQ ready:\n• Title: ${product.name} program\n• Suggested MOQ: ${product.moq.toLocaleString()}\n• Target unit: ${formatCurrency(product.unitPrice * 0.95)}\n• Origin preference: ${product.originCountry}\n• Notes: Request packing list + HS recommendation.\nOpen /rfq to publish.`;
  }

  if (match) {
    return `Matched ${match.brandName} — ${match.name} (${match.sku}). ${formatCurrency(match.unitPrice)}/unit, MOQ ${match.moq.toLocaleString()}, ${match.leadTimeDays}-day lead, tags: ${match.tags.join(", ")}. I can draft an RFQ or estimate landed cost next.`;
  }

  return `I can help with supplier matching, RFQ drafts, HS hints, and landed-cost estimates across ${products.length} demo SKUs. Try asking about OEM apparel, Omega-3, or ceramic canisters.`;
}

export function AiAssistantPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      content:
        "I'm the GVG AI Procurement Assistant. Ask me to match suppliers, draft RFQs, or estimate landed cost.",
    },
  ]);
  const [isPending, startTransition] = useTransition();

  function send(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    startTransition(() => {
      const reply: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: buildAssistantReply(trimmed),
      };
      setMessages((prev) => [...prev, reply]);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
          Suggested prompts
        </p>
        <ul className="mt-4 space-y-3">
          {STARTERS.map((starter) => (
            <li key={starter}>
              <button
                type="button"
                className="w-full border-b border-[var(--color-line)] pb-3 text-left text-sm text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-strong)]"
                onClick={() => send(starter)}
              >
                {starter}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex min-h-[28rem] flex-col border border-[var(--color-line)] bg-white">
        <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-3">
          <Bot className="h-4 w-4 text-[var(--color-accent)]" aria-hidden />
          <p className="text-sm font-semibold">Procurement Assistant</p>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "assistant"
                  ? "max-w-[90%] whitespace-pre-wrap bg-[var(--color-mist)] px-3 py-2 text-sm text-[var(--color-ink)]"
                  : "ml-auto max-w-[90%] whitespace-pre-wrap bg-[var(--color-ink)] px-3 py-2 text-sm text-white"
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <form
          className="flex gap-2 border-t border-[var(--color-line)] p-3"
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <label className="sr-only" htmlFor="ai-prompt">
            Ask the procurement assistant
          </label>
          <input
            id="ai-prompt"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about suppliers, RFQs, or landed cost…"
            className="h-11 flex-1 border border-[var(--color-line)] bg-[var(--color-surface)] px-3 text-sm outline-none focus:border-[var(--color-accent)]"
          />
          <Button type="submit" disabled={isPending || !input.trim()} aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
