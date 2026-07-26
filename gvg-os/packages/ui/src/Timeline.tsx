import type { ReactNode } from "react";
import { cn } from "./cn";

export type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  time?: string;
  tone?: "default" | "success" | "warning" | "danger";
  icon?: ReactNode;
};

const toneDot = {
  default: "bg-[var(--gv-primary,#0B1F3A)]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
} as const;

export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-6 border-l border-[var(--gv-border,#E2E8F0)] pl-6", className)}>
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span
            className={cn(
              "absolute -left-[1.625rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-white",
              toneDot[item.tone ?? "default"],
            )}
          />
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-[var(--gv-text,#0F172A)]">{item.title}</p>
              {item.description ? (
                <p className="mt-1 text-sm text-[var(--gv-text-secondary,#475569)]">{item.description}</p>
              ) : null}
            </div>
            {item.time ? <time className="text-xs text-[var(--gv-text-secondary,#475569)]">{item.time}</time> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
