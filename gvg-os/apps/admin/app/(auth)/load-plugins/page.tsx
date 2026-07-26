"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  hasPluginsLoaded,
  hasWorkspace,
  isAuthenticated,
  readSession,
  setPluginsLoaded,
} from "@gvg/auth";
import {
  ensurePluginsBooted,
  type PluginLoadProgress,
} from "../../../lib/plugin-boot";
import type { BootStage } from "@gvg/kernel/plugin/host";

const STEPS = [
  "Boot",
  "Load Plugins",
  "Generate Menu",
  "Generate Routes",
  "Generate Dashboard",
  "Inject Permission",
  "Ready",
] as const;

const STAGE_MAP: Record<(typeof STEPS)[number], BootStage> = {
  Boot: "boot",
  "Load Plugins": "load_plugins",
  "Generate Menu": "generate_menu",
  "Generate Routes": "generate_routes",
  "Generate Dashboard": "generate_dashboard",
  "Inject Permission": "inject_permission",
  Ready: "ready",
};

function normalizeStage(stage: BootStage | "idle"): BootStage | "idle" {
  if (
    stage === "application_boot" ||
    stage === "start"
  ) {
    return "boot";
  }
  if (
    stage === "scan" ||
    stage === "load_manifest" ||
    stage === "validate" ||
    stage === "register" ||
    stage === "boot_plugin"
  ) {
    return "load_plugins";
  }
  return stage;
}

export default function LoadPluginsPage() {
  const router = useRouter();
  const [progress, setProgress] = useState<PluginLoadProgress>({
    stage: "idle",
    message: "Preparing…",
    booted: [],
    failed: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = readSession();
    if (!isAuthenticated(session)) {
      router.replace("/login");
      return;
    }
    if (!hasWorkspace(session)) {
      router.replace("/select-workspace");
      return;
    }
    if (hasPluginsLoaded(session)) {
      router.replace("/dashboard");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const { report } = await ensurePluginsBooted({
          onProgress(next) {
            if (!cancelled) {
              setProgress({
                ...next,
                stage: normalizeStage(next.stage),
              });
            }
          },
        });

        if (cancelled) return;

        if (report.stage === "error" && report.booted.length === 0) {
          setError("No plugins could be loaded.");
          return;
        }

        const current = readSession();
        if (!current) {
          router.replace("/login");
          return;
        }

        setPluginsLoaded(current, true);
        router.replace("/dashboard");
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const uiStage = normalizeStage(progress.stage);
  const currentOrder = STEPS.findIndex((s) => STAGE_MAP[s] === uiStage);

  return (
    <div style={{ width: "100%", maxWidth: 480, color: "#fff" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#C8A35F",
            fontWeight: 700,
          }}
        >
          GLOBAL VISTA GROUP
        </div>
        <h1 style={{ margin: "12px 0 8px", fontSize: 28, fontWeight: 650 }}>
          Load Plugins
        </h1>
        <p style={{ margin: 0, opacity: 0.7, fontSize: 14 }}>
          {progress.message}
        </p>
      </div>

      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: 10,
        }}
      >
        {STEPS.map((step, order) => {
          const mapped = STAGE_MAP[step];
          const active = uiStage === mapped;
          const done =
            uiStage === "ready" ||
            (currentOrder > order && uiStage !== "error" && currentOrder !== -1);
          return (
            <li
              key={step}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: active
                  ? "rgba(200,163,95,0.16)"
                  : "rgba(255,255,255,0.05)",
                color: done || active ? "#fff" : "rgba(255,255,255,0.55)",
                fontSize: 14,
                fontWeight: active ? 650 : 500,
              }}
            >
              {step}
            </li>
          );
        })}
      </ol>

      {progress.booted.length > 0 ? (
        <p style={{ marginTop: 20, fontSize: 13, opacity: 0.7 }}>
          Booted: {progress.booted.join(", ")}
        </p>
      ) : null}

      {error ? (
        <p style={{ marginTop: 16, color: "#FCA5A5", fontSize: 14 }}>{error}</p>
      ) : null}
    </div>
  );
}
