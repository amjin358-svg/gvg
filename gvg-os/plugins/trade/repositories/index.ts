/** Trade repositories — shipments, containers, invoices */

export type TradeShipment = {
  id: string;
  reference: string;
  mode: "ocean" | "air" | "multimodal";
  status: "draft" | "booked" | "in-transit" | "arrived" | "closed";
  origin: string;
  destination: string;
  etd?: string;
  eta?: string;
};

export type TradeContainer = {
  id: string;
  number: string;
  type: "20GP" | "40GP" | "40HC" | "45HC";
  shipmentId: string;
  seal?: string;
  status: "empty" | "loaded" | "gated-in" | "on-vessel" | "discharged";
};

export type TradeInvoice = {
  id: string;
  number: string;
  shipmentId?: string;
  currency: string;
  amount: number;
  status: "draft" | "issued" | "paid" | "void";
  issuedAt: string;
};

const shipments: TradeShipment[] = [
  {
    id: "sh-1001",
    reference: "GVG-SHP-2401",
    mode: "ocean",
    status: "in-transit",
    origin: "TW KHH",
    destination: "US LAX",
    etd: "2026-07-01",
    eta: "2026-07-28",
  },
  {
    id: "sh-1002",
    reference: "GVG-SHP-2402",
    mode: "air",
    status: "booked",
    origin: "TW TPE",
    destination: "US ORD",
    etd: "2026-07-20",
    eta: "2026-07-22",
  },
  {
    id: "sh-1003",
    reference: "GVG-SHP-2403",
    mode: "ocean",
    status: "arrived",
    origin: "CN SHA",
    destination: "US LGB",
    etd: "2026-06-10",
    eta: "2026-07-05",
  },
];

const containers: TradeContainer[] = [
  {
    id: "ct-1",
    number: "GVGU1234567",
    type: "40HC",
    shipmentId: "sh-1001",
    seal: "SL-8891",
    status: "on-vessel",
  },
  {
    id: "ct-2",
    number: "GVGU7654321",
    type: "40HC",
    shipmentId: "sh-1001",
    seal: "SL-8892",
    status: "on-vessel",
  },
  {
    id: "ct-3",
    number: "GVGU5551212",
    type: "20GP",
    shipmentId: "sh-1003",
    status: "discharged",
  },
];

const invoices: TradeInvoice[] = [
  {
    id: "inv-1",
    number: "INV-2026-014",
    shipmentId: "sh-1001",
    currency: "USD",
    amount: 42800,
    status: "issued",
    issuedAt: "2026-07-02T00:00:00.000Z",
  },
  {
    id: "inv-2",
    number: "INV-2026-015",
    shipmentId: "sh-1002",
    currency: "USD",
    amount: 6120,
    status: "draft",
    issuedAt: "2026-07-18T00:00:00.000Z",
  },
];

export async function listShipments(): Promise<TradeShipment[]> {
  return [...shipments];
}

export async function getShipmentById(
  id: string,
): Promise<TradeShipment | null> {
  return shipments.find((s) => s.id === id) ?? null;
}

export async function listContainers(): Promise<TradeContainer[]> {
  return [...containers];
}

export async function listContainersByShipment(
  shipmentId: string,
): Promise<TradeContainer[]> {
  return containers.filter((c) => c.shipmentId === shipmentId);
}

export async function listInvoices(): Promise<TradeInvoice[]> {
  return [...invoices];
}

export async function getInvoiceById(id: string): Promise<TradeInvoice | null> {
  return invoices.find((i) => i.id === id) ?? null;
}

/** @deprecated use domain list helpers */
export async function listRecords() {
  return (await listShipments()).map((s) => ({
    id: s.id,
    name: s.reference,
  }));
}
