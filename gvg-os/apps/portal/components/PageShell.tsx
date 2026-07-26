import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingAside } from "@/components/FloatingAside";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="portal-app">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingAside />
    </div>
  );
}

export default PageShell;
