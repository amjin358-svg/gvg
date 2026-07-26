export type PortalModule = {
  href: string;
  label: string;
  title: string;
  description: string;
};

export const PORTAL_MODULES: PortalModule[] = [
  {
    href: "/marketplace",
    label: "Marketplace",
    title: "Marketplace",
    description: "Product discovery and sourcing hub.",
  },
  {
    href: "/ai",
    label: "AI",
    title: "AI Services",
    description: "Intelligence layer for trade decisions.",
  },
  {
    href: "/business",
    label: "Business",
    title: "Business",
    description: "Company profile and enterprise story.",
  },
  {
    href: "/investment",
    label: "Investment",
    title: "Investment",
    description: "Capital and growth narratives.",
  },
  {
    href: "/real-estate",
    label: "Real Estate",
    title: "Real Estate",
    description: "Property and development desk.",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    title: "Dashboard",
    description: "Ops dashboard entry.",
  },
];

export function getModule(href: string): PortalModule {
  const mod = PORTAL_MODULES.find((item) => item.href === href);
  if (!mod) {
    throw new Error(`Unknown portal module: ${href}`);
  }
  return mod;
}
