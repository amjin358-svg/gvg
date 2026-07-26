/** Marketplace supplier domain */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export type Supplier = {
  id: string;
  name: string;
  country: string;
  capabilities: string[];
  verified: boolean;
  createdAt?: string;
};

export const supplierRoutes: PluginRoute[] = [
  {
    path: "/marketplace/suppliers",
    page: "supplier/pages/SupplierList",
    title: "Supplier",
  },
  {
    path: "/marketplace/suppliers/[id]",
    page: "supplier/pages/SupplierDetail",
    title: "Supplier Detail",
  },
];

export const supplierNavigation = [
  { label: "Supplier", href: "/marketplace/suppliers" },
];

export const supplierPermissions = [
  "supplier.read",
  "supplier.manage",
] as const;

const suppliers: Supplier[] = [
  {
    id: "s1",
    name: "Pacific Nutraceuticals",
    country: "TW",
    capabilities: ["OEM", "ODM", "private-label"],
    verified: true,
    createdAt: "2025-01-10T00:00:00.000Z",
  },
  {
    id: "s2",
    name: "Forge Industrial Co.",
    country: "US",
    capabilities: ["hardware", "tools", "export"],
    verified: true,
    createdAt: "2025-06-01T00:00:00.000Z",
  },
  {
    id: "s3",
    name: "Harbor Ingredient Labs",
    country: "SG",
    capabilities: ["ingredients", "botanicals"],
    verified: false,
    createdAt: new Date().toISOString(),
  },
];

export async function listSuppliers(): Promise<Supplier[]> {
  return [...suppliers];
}

export async function getSupplierById(id: string): Promise<Supplier | null> {
  return suppliers.find((s) => s.id === id) ?? null;
}

export async function SupplierListPage() {
  const items = await listSuppliers();
  return { title: "Supplier", suppliers: items };
}

export async function SupplierDetailPage(id: string) {
  const supplier = await getSupplierById(id);
  return { title: supplier?.name ?? "Supplier", supplierId: id, supplier };
}
