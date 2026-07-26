/**
 * Marketplace dashboard stats
 *
 * Total Products · Pending RFQ · New Suppliers
 */

import { listProducts } from "./product/repository";
import { listRfqs } from "./rfq";
import { listSuppliers } from "./supplier";

export type MarketplaceStatId =
  | "total-products"
  | "pending-rfq"
  | "new-suppliers";

export type MarketplaceStat = {
  id: MarketplaceStatId;
  label: string;
  labelZh: string;
  value: number;
  href: string;
};

const NEW_SUPPLIER_DAYS = 30;

export async function getMarketplaceStats(
  now = new Date(),
): Promise<MarketplaceStat[]> {
  const [products, rfqs, suppliers] = await Promise.all([
    listProducts(),
    listRfqs(),
    listSuppliers(),
  ]);

  const pendingRfq = rfqs.filter(
    (r) => r.status === "open" || r.status === "draft",
  ).length;

  const cutoff = now.getTime() - NEW_SUPPLIER_DAYS * 24 * 60 * 60 * 1000;
  const newSuppliers = suppliers.filter((s) => {
    if (s.createdAt) return new Date(s.createdAt).getTime() >= cutoff;
    return !s.verified;
  }).length;

  return [
    {
      id: "total-products",
      label: "Total Products",
      labelZh: "產品總數",
      value: products.length,
      href: "/marketplace/products",
    },
    {
      id: "pending-rfq",
      label: "Pending RFQ",
      labelZh: "待處理詢價",
      value: pendingRfq,
      href: "/marketplace/rfq",
    },
    {
      id: "new-suppliers",
      label: "New Suppliers",
      labelZh: "新供應商",
      value: newSuppliers,
      href: "/marketplace/suppliers",
    },
  ];
}

export const MARKETPLACE_STAT_WIDGETS = [
  {
    id: "marketplace.total-products",
    title: "Total Products",
    description: "Products in the marketplace catalog",
    component: "product/widgets/TotalProducts",
    size: "sm" as const,
    order: 10,
  },
  {
    id: "marketplace.pending-rfq",
    title: "Pending RFQ",
    description: "Open and draft RFQs awaiting action",
    component: "rfq/widgets/PendingRfq",
    size: "sm" as const,
    order: 20,
  },
  {
    id: "marketplace.new-suppliers",
    title: "New Suppliers",
    description: "Suppliers added in the last 30 days",
    component: "supplier/widgets/NewSuppliers",
    size: "sm" as const,
    order: 30,
  },
];
