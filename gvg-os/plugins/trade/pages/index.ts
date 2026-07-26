import {
  getInvoiceById,
  getShipmentById,
  listContainersByShipment,
  listInvoices,
  listShipments,
} from "../repositories";
import { getOverview } from "../services";
import { TRADE_MODULES } from "../modules";

/** Trade page loaders */

export async function TradeHomePage() {
  const overview = await getOverview();
  return {
    title: "Trade",
    modules: TRADE_MODULES,
    ...overview,
  };
}

export async function PoListPage() {
  return { title: "PO", purchaseOrders: [] as unknown[] };
}

export async function PoDetailPage(id: string) {
  return { title: "PO", poId: id, purchaseOrder: null };
}

export async function ShipmentListPage() {
  const shipments = await listShipments();
  return { title: "Shipment", shipments };
}

export async function ShipmentDetailPage(id: string) {
  const shipment = await getShipmentById(id);
  const containers = await listContainersByShipment(id);
  return {
    title: shipment?.reference ?? "Shipment",
    shipmentId: id,
    shipment,
    containers,
  };
}

export async function CustomsListPage() {
  return { title: "Customs", filings: [] as unknown[] };
}

export async function CustomsDetailPage(id: string) {
  return { title: "Customs", customsId: id, filing: null };
}

export async function InvoiceListPage() {
  const invoices = await listInvoices();
  return { title: "Invoice", invoices };
}

export async function InvoiceDetailPage(id: string) {
  const invoice = await getInvoiceById(id);
  return {
    title: invoice?.number ?? "Invoice",
    invoiceId: id,
    invoice,
  };
}

export async function PackingListListPage() {
  return { title: "Packing List", packingLists: [] as unknown[] };
}

export async function PackingListDetailPage(id: string) {
  return { title: "Packing List", packingListId: id, packingList: null };
}

export async function TrackingBoardPage() {
  return { title: "Tracking", milestones: [] as unknown[] };
}

export async function TrackingDetailPage(id: string) {
  return { title: "Tracking", trackingId: id, tracking: null };
}

export async function DocumentVaultPage() {
  return { title: "Documents", documents: [] as unknown[] };
}

export async function DocumentDetailPage(id: string) {
  return { title: "Document", documentId: id, document: null };
}

/** @deprecated */
export async function HomePage() {
  return TradeHomePage();
}
