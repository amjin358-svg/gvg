import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
};

const colsClass = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-12",
} as const;

const gapClass = {
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-8",
} as const;

export function Grid({ cols = 3, gap = "md", className, ...props }: GridProps) {
  return <div className={cn("grid", colsClass[cols], gapClass[gap], className)} {...props} />;
}
