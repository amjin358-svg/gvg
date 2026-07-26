import Link from "next/link";
import { PortalHeader } from "@/components/PortalHeader";
import type { PortalModule } from "@/lib/modules";

type Props = {
  module: PortalModule;
};

export function ModulePage({ module }: Props) {
  return (
    <div className="portal-shell">
      <PortalHeader current={module.href} />
      <main className="portal-main">
        <article className="portal-page">
          <h1>{module.title}</h1>
          <p className="portal-page__lead">{module.description}</p>
          <p className="portal-page__actions">
            <Link href="/">← Portal hub</Link>
          </p>
        </article>
      </main>
    </div>
  );
}

export default ModulePage;
