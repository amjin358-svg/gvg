import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  blur?: "sm" | "md" | "lg";
};

const blurClass = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-xl",
} as const;

export function GlassPanel({ blur = "md", className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--gv-radius,14px)] border border-white/25 bg-white/10 text-white shadow-[var(--gv-shadow-md)]",
        blurClass[blur],
        className,
      )}
      {...props}
    />
  );
}
