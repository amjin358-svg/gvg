/** Marketplace procurement domain */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export type ProcurementQueueItem = {
  id: string;
  title: string;
  stage: "intake" | "sourcing" | "negotiation" | "awarded";
  owner: string;
  updatedAt: string;
};

export const procurementRoutes: PluginRoute[] = [
  {
    path: "/marketplace/procurement",
    page: "procurement/pages/ProcurementDesk",
    title: "Procurement",
    auth: true,
  },
  {
    path: "/marketplace/procurement/[id]",
    page: "procurement/pages/ProcurementDetail",
    title: "Procurement Detail",
    auth: true,
  },
];

export const procurementNavigation = [
  { label: "Procurement", href: "/marketplace/procurement" },
];

export const procurementPermissions = [
  "procurement.read",
  "procurement.write",
] as const;

const queues: ProcurementQueueItem[] = [
  {
    id: "proc-1",
    title: "Q3 Health supplements replenishment",
    stage: "sourcing",
    owner: "purchasing",
    updatedAt: new Date().toISOString(),
  },
];

export async function listProcurementQueues(): Promise<ProcurementQueueItem[]> {
  return [...queues];
}

export async function getProcurementById(
  id: string,
): Promise<ProcurementQueueItem | null> {
  return queues.find((q) => q.id === id) ?? null;
}

export async function ProcurementDeskPage() {
  const items = await listProcurementQueues();
  return { title: "Procurement", queues: items };
}

export async function ProcurementDetailPage(id: string) {
  const item = await getProcurementById(id);
  return { title: item?.title ?? "Procurement", procurementId: id, item };
}
