import { cn } from "./cn";

export type ChartDatum = { label: string; value: number; color?: string };

export type BarChartProps = {
  data: ChartDatum[];
  height?: number;
  className?: string;
};

/** Lightweight CSS bar chart (no chart lib dependency). */
export function BarChart({ data, height = 160, className }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={cn("flex items-end gap-2", className)} style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex h-full flex-1 flex-col justify-end gap-2">
          <div
            className="w-full rounded-t-md"
            style={{
              height: `${(d.value / max) * 100}%`,
              background: d.color ?? "var(--gv-primary, #0B1F3A)",
            }}
            title={`${d.label}: ${d.value}`}
          />
          <span className="truncate text-center text-[10px] text-[var(--gv-text-secondary,#475569)]">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export type SparklineProps = {
  values: number[];
  className?: string;
};

export function Sparkline({ values, className }: SparklineProps) {
  const max = Math.max(...values, 1);
  const points = values
    .map((v, i) => {
      const x = values.length <= 1 ? 0 : (i / (values.length - 1)) * 100;
      const y = 100 - (v / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={cn("h-10 w-full", className)}>
      <polyline
        fill="none"
        stroke="var(--gv-secondary, #C8A35F)"
        strokeWidth="3"
        points={points}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
