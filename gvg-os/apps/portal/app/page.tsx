import Link from "next/link";
import { PortalHeader } from "@/components/PortalHeader";
import { PORTAL_MODULES } from "@/lib/modules";

export default function PortalHomePage() {
  return (
    <div className="portal-shell">
      <PortalHeader />
      <main className="portal-main">
        <section className="portal-hero">
          <h1>GVG Portal</h1>
          <p>
            Functional modules live here — separate from the cinematic
            Interactive Movie site.
          </p>
        </section>

        <div className="portal-grid">
          {PORTAL_MODULES.map((mod) => (
            <Link key={mod.href} className="portal-tile" href={mod.href}>
              <h2>{mod.title}</h2>
              <p>{mod.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
