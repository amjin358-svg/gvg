/**
 * Marketplace plugin menu entry
 */

export type MarketplaceMenuItem = {
  id: string;
  title: string;
  icon: string;
};

export default [
  {
    id: "marketplace",
    title: "Marketplace",
    icon: "shopping-cart",
  },
] satisfies MarketplaceMenuItem[];
