import Link from "next/link";
import { PORTAL_MODULES } from "@/lib/modules";

const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

type Props = {
  current?: string;
};

export function PortalHeader({ current }: Props) {
  return (
    <header className="portal-header">
      <Link className="portal-header__brand" href="/">
        GVG Portal
      </Link>

      <nav className="portal-header__nav" aria-label="Portal modules">
        {PORTAL_MODULES.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            aria-current={current === mod.href ? "page" : undefined}
          >
            {mod.label}
          </Link>
        ))}
      </nav>

      <a className="portal-header__back" href={websiteUrl}>
        ← Cinematic site
      </a>
    </header>
  );
}

export default PortalHeader;
