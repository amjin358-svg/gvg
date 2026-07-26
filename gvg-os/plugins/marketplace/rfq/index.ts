/** Marketplace RFQ domain */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export type MarketplaceRfq = {
  id: string;
  title: string;
  status: "draft" | "open" | "quoted" | "closed";
  productSku?: string;
  quantity?: number;
  createdAt: string;
};

export const rfqRoutes: PluginRoute[] = [
  {
    path: "/marketplace/rfq",
    page: "rfq/pages/RfqList",
    title: "RFQ",
  },
  {
    path: "/marketplace/rfq/[id]",
    page: "rfq/pages/RfqDetail",
    title: "RFQ Detail",
  },
  {
    path: "/marketplace/rfq/new",
    page: "rfq/pages/RfqCreate",
    title: "New RFQ",
    auth: true,
  },
];

export const rfqNavigation = [{ label: "RFQ", href: "/marketplace/rfq" }];

export const rfqPermissions = ["rfq.create", "rfq.read"] as const;

const rfqs: MarketplaceRfq[] = [
  {
    id: "rfq-1001",
    title: "Omega-3 1000mg — 20k units",
    status: "open",
    productSku: "GVG-OMEGA-1000",
    quantity: 20000,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rfq-1002",
    title: "Hex bit private label — 5k kits",
    status: "draft",
    productSku: "GVG-HEX-BIT",
    quantity: 5000,
    createdAt: new Date().toISOString(),
  },
];

export async function listRfqs(): Promise<MarketplaceRfq[]> {
  return [...rfqs];
}

export async function getRfqById(id: string): Promise<MarketplaceRfq | null> {
  return rfqs.find((r) => r.id === id) ?? null;
}

export async function createRfq(
  input: Omit<MarketplaceRfq, "id" | "createdAt" | "status"> & {
    status?: MarketplaceRfq["status"];
  },
): Promise<MarketplaceRfq> {
  const rfq: MarketplaceRfq = {
    id: `rfq-${crypto.randomUUID().slice(0, 8)}`,
    title: input.title,
    status: input.status ?? "draft",
    productSku: input.productSku,
    quantity: input.quantity,
    createdAt: new Date().toISOString(),
  };
  rfqs.unshift(rfq);
  return rfq;
}

export async function RfqListPage() {
  const items = await listRfqs();
  return { title: "RFQ", rfqs: items };
}

export async function RfqDetailPage(id: string) {
  const rfq = await getRfqById(id);
  return { title: rfq?.title ?? "RFQ", rfqId: id, rfq };
}

export async function RfqCreatePage() {
  return { title: "New RFQ" };
}
