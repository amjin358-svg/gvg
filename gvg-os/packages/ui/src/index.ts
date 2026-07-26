/**
 * @gvg/ui — Shared UI component library
 */

export { Button, buttonVariants } from "./Button";
export type { ButtonProps } from "./Button";

export { Card } from "./Card";
export type { CardProps } from "./Card";

export { Modal } from "./Modal";
export type { ModalProps } from "./Modal";

export { Table, THead, TBody, TR, TH, TD, SimpleTable } from "./Table";
export type { SimpleColumn } from "./Table";

export { Grid } from "./Grid";
export type { GridProps } from "./Grid";

export { Form, Field, Label, Input, Textarea, Select, FormError } from "./Form";

export { BarChart, Sparkline } from "./Charts";
export type { ChartDatum, BarChartProps, SparklineProps } from "./Charts";

export { Timeline } from "./Timeline";
export type { TimelineItem } from "./Timeline";

export { CommandPalette } from "./CommandPalette";
export type { CommandItem, CommandPaletteProps } from "./CommandPalette";

export { DataGrid } from "./DataGrid";
export type { DataGridColumn, DataGridProps } from "./DataGrid";

export { TreeView } from "./TreeView";
export type { TreeNode, TreeViewProps } from "./TreeView";

export { Dock } from "./Dock";
export type { DockItem, DockProps } from "./Dock";

export { GlassPanel } from "./GlassPanel";
export type { GlassPanelProps } from "./GlassPanel";

export { cn } from "./cn";

export const name = "@gvg/ui";
export const version = "0.1.0";
