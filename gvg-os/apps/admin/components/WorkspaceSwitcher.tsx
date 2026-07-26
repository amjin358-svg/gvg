"use client";

import { useMemo, useState } from "react";
import { WORKSPACE_STORAGE_KEY } from "@gvg/auth";
import {
  WORKSPACE_OPTIONS,
  getCurrentWorkspaceId,
  selectWorkspace,
  type Workspace,
} from "@gvg/core/workspace";

function readStoredId(): string {
  if (typeof window === "undefined") return WORKSPACE_OPTIONS[0].id;
  return (
    window.localStorage.getItem(WORKSPACE_STORAGE_KEY) ??
    getCurrentWorkspaceId() ??
    WORKSPACE_OPTIONS[0].id
  );
}

export function WorkspaceSwitcher({
  options = WORKSPACE_OPTIONS,
  onChange,
}: {
  options?: Workspace[];
  onChange?: (workspace: Workspace) => void;
}) {
  const initial = useMemo(() => readStoredId(), []);
  const [activeId, setActiveId] = useState(initial);

  const active = options.find((w) => w.id === activeId) ?? options[0];

  return (
    <label style={{ display: "block", padding: "4px 12px 16px" }}>
      <span
        style={{
          display: "block",
          fontSize: 11,
          letterSpacing: "0.16em",
          color: "rgba(200,163,95,0.9)",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        SELECT WORKSPACE
      </span>
      <select
        value={active.id}
        onChange={(e) => {
          const next = selectWorkspace(e.target.value);
          setActiveId(next.id);
          window.localStorage.setItem(WORKSPACE_STORAGE_KEY, next.id);
          onChange?.(next);
        }}
        aria-label="Select Workspace"
        style={{
          width: "100%",
          height: 40,
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.08)",
          color: "#fff",
          padding: "0 12px",
          fontSize: 13,
          fontWeight: 600,
          outline: "none",
        }}
      >
        {options.map((workspace) => (
          <option
            key={workspace.id}
            value={workspace.id}
            style={{ color: "#0F172A" }}
          >
            {workspace.name}
          </option>
        ))}
      </select>
      {active.region ? (
        <span
          style={{ display: "block", marginTop: 6, fontSize: 11, opacity: 0.55 }}
        >
          {active.region}
          {active.kind === "admin" ? " · Admin" : ""}
        </span>
      ) : null}
    </label>
  );
}
