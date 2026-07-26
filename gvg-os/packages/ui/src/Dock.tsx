import type { ReactNode } from "react";
import { cn } from "./cn";

export type DockItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  active?: boolean;
};

export type DockProps = {
  items: DockItem[];
  position?: "bottom" | "left";
  className?: string;
};

export function Dock({ items, position = "bottom", className }: DockProps) {
  return (
    <nav
      aria-label="Dock"
      className={cn(
        "fixed z-[1030] flex gap-1 rounded-2xl border border-white/20 bg-[var(--gv-primary,#0B1F3A)]/90 p-2 text-white shadow-[var(--gv-shadow-lg)] backdrop-blur-md",
        position === "bottom" && "bottom-6 left-1/2 -translate-x-1/2 flex-row",
        position === "left" && "left-6 top-1/2 -translate-y-1/2 flex-col",
        className,
      )}
    >
      {items.map((item) => {
        const content = (
          <>
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </>
        );
        const cls = cn(
          "flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-white/80 transition hover:bg-white/10 hover:text-white",
          item.active && "bg-white/15 text-white",
        );
        if (item.href) {
          return (
            <a key={item.id} href={item.href} className={cls} title={item.label}>
              {content}
            </a>
          );
        }
        return (
          <button key={item.id} type="button" className={cls} onClick={item.onClick} title={item.label}>
            {content}
          </button>
        );
      })}
    </nav>
  );
}
