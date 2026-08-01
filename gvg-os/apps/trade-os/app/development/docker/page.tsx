import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { DOCKER_COMMANDS } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "Docker",
};

export default function DockerPage() {
  return (
    <DevShell
      title="Docker"
      titleZh="Docker"
      description="可選容器化部署。檔案：docker/Dockerfile · docker/docker-compose.yml。需 next.config standalone output。"
    >
      <section className="border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Commands
        </h2>
        <ul className="mt-5 space-y-4">
          {DOCKER_COMMANDS.map((item) => (
            <li key={item.label} className="border-t border-[var(--color-line)] pt-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                {item.label}
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md bg-[var(--color-navy)] px-4 py-3 font-mono text-xs text-white">
                {item.cmd}
              </pre>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Notes
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
          <li>· 從 repo root 執行 compose（`-f docker/docker-compose.yml`）</li>
          <li>· 生產映像使用 Next standalone 輸出</li>
          <li>· Secrets 以環境變數注入，勿寫入映像層</li>
          <li>· 見 `docker/README.md`</li>
        </ul>
      </section>
    </DevShell>
  );
}
