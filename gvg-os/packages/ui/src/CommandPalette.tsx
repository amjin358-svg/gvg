"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "./cn";

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group?: string;
  onSelect: () => void;
};

export type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  className?: string;
};

export function CommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = "Search commands…",
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.hint?.toLowerCase().includes(q));
  }, [items, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1080] flex items-start justify-center bg-black/40 p-4 pt-[12vh]">
      <div
        className={cn(
          "w-full max-w-xl overflow-hidden rounded-[var(--gv-radius,14px)] bg-white shadow-[var(--gv-shadow-xl,0_30px_60px_rgba(0,0,0,.2))]",
          className,
        )}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-14 w-full border-b border-[var(--gv-border,#E2E8F0)] px-4 text-base outline-none"
        />
        <ul className="max-h-80 overflow-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-[var(--gv-text-secondary,#475569)]">No results</li>
          ) : (
            filtered.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-[var(--gv-surface,#F8FAFC)]"
                  onClick={() => {
                    item.onSelect();
                    onOpenChange(false);
                    setQuery("");
                  }}
                >
                  <span className="font-medium text-[var(--gv-text,#0F172A)]">{item.label}</span>
                  {item.hint ? (
                    <span className="text-xs text-[var(--gv-text-secondary,#475569)]">{item.hint}</span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
