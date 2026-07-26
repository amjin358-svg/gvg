import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";

/** Optional marketing chrome for sub-routes */
export function SiteShell({
  children,
  withHeader = false,
}: {
  children: ReactNode;
  withHeader?: boolean;
}) {
  return (
    <div className="home-root">
      {withHeader ? <SiteHeader /> : null}
      {children}
    </div>
  );
}
