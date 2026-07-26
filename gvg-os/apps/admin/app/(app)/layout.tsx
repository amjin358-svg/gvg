"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  logout,
  readSession,
  resolveAuthPath,
  setSessionWorkspace,
  type AuthSession,
} from "@gvg/auth";
import { getEnabledWorkspaceNav } from "@gvg/core/navigation";
import { getWorkspace } from "@gvg/core/workspace";
import { WorkspaceSwitcher } from "../../components/WorkspaceSwitcher";

export default function AppShellLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = readSession();
    const gate = resolveAuthPath(current);
    // Only allow app shell when fully ready (auth + workspace + plugins)
    if (gate === "/login" || gate === "/select-workspace" || gate === "/load-plugins") {
      router.replace(gate);
      return;
    }
    setSession(current);
    setReady(true);
  }, [router, pathname]);

  if (!ready || !session) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "#64748B",
        }}
      >
        Loading workspace…
      </div>
    );
  }

  const workspace = session.workspaceId
    ? getWorkspace(session.workspaceId)
    : null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 240,
          background: "#0B1F3A",
          color: "#fff",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ padding: "8px 12px 8px" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "#C8A35F",
            }}
          >
            GVG
          </div>
          <div style={{ fontWeight: 600, marginTop: 4 }}>
            {workspace?.name ?? "Workspace"}
          </div>
          <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>
            Connecting Markets. Creating Value.
          </div>
        </div>

        <WorkspaceSwitcher
          onChange={(next) => {
            const updated = setSessionWorkspace(session, next.id);
            setSession(updated);
            router.replace("/load-plugins");
          }}
        />

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            flex: 1,
          }}
        >
          {getEnabledWorkspaceNav().map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <a
                key={item.id}
                href={item.href}
                title={item.icon ? `${item.label} (${item.icon})` : item.label}
                style={{
                  color: active ? "#fff" : "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontSize: 14,
                  background: active
                    ? "rgba(200,163,95,0.18)"
                    : "transparent",
                }}
              >
                <span style={{ display: "block", fontWeight: 600 }}>
                  {item.label}
                </span>
                <span
                  style={{ display: "block", fontSize: 11, opacity: 0.55 }}
                >
                  {item.labelZh}
                </span>
              </a>
            );
          })}
        </nav>

        <div style={{ padding: "8px 12px" }}>
          <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 8 }}>
            {session.user.email}
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            style={{
              width: "100%",
              height: 36,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "transparent",
              color: "rgba(255,255,255,0.85)",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: 32 }}>{children}</main>
    </div>
  );
}
