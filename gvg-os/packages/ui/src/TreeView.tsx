"use client";

import { useState, type ReactNode } from "react";
import { cn } from "./cn";

export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: ReactNode;
};

export type TreeViewProps = {
  nodes: TreeNode[];
  selectedId?: string;
  onSelect?: (node: TreeNode) => void;
  className?: string;
};

function NodeRow({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  selectedId?: string;
  onSelect?: (node: TreeNode) => void;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = !!node.children?.length;

  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-[var(--gv-surface,#F8FAFC)]",
          selectedId === node.id && "bg-[var(--gv-surface,#F8FAFC)] font-semibold",
        )}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        {hasChildren ? (
          <button type="button" className="w-5 text-xs" onClick={() => setOpen(!open)} aria-label="Toggle">
            {open ? "▾" : "▸"}
          </button>
        ) : (
          <span className="w-5" />
        )}
        <button type="button" className="flex flex-1 items-center gap-2 text-left" onClick={() => onSelect?.(node)}>
          {node.icon}
          <span>{node.label}</span>
        </button>
      </div>
      {hasChildren && open ? (
        <ul>
          {node.children!.map((child) => (
            <NodeRow key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function TreeView({ nodes, selectedId, onSelect, className }: TreeViewProps) {
  return (
    <ul className={cn("text-[var(--gv-text,#0F172A)]", className)}>
      {nodes.map((node) => (
        <NodeRow key={node.id} node={node} depth={0} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </ul>
  );
}
