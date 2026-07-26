import { getOverview } from "../services";
import { WAREHOUSE_MODULES } from "../modules";

/** Warehouse page loaders */

export async function WarehouseHomePage() {
  const overview = await getOverview();
  return {
    title: "Warehouse",
    modules: WAREHOUSE_MODULES,
    ...overview,
  };
}

export async function InventoryListPage() {
  return { title: "Inventory", items: [] as unknown[] };
}

export async function InventoryDetailPage(sku: string) {
  return { title: "Inventory", sku, item: null };
}

export async function BinListPage() {
  return { title: "Bin", bins: [] as unknown[] };
}

export async function BinDetailPage(id: string) {
  return { title: "Bin", binId: id, bin: null };
}

export async function BarcodeListPage() {
  return { title: "Barcode", barcodes: [] as unknown[] };
}

export async function BarcodeDetailPage(code: string) {
  return { title: "Barcode", code, barcode: null };
}

export async function PickingBoardPage() {
  return { title: "Picking", waves: [] as unknown[] };
}

export async function PickingDetailPage(id: string) {
  return { title: "Picking", pickId: id, pick: null };
}

export async function PackingBoardPage() {
  return { title: "Packing", jobs: [] as unknown[] };
}

export async function PackingDetailPage(id: string) {
  return { title: "Packing", packingId: id, packing: null };
}

export async function ReceivingBoardPage() {
  return { title: "Receiving", receipts: [] as unknown[] };
}

export async function ReceivingDetailPage(id: string) {
  return { title: "Receiving", receivingId: id, receiving: null };
}

export async function ShippingBoardPage() {
  return { title: "Shipping", shipments: [] as unknown[] };
}

export async function ShippingDetailPage(id: string) {
  return { title: "Shipping", shippingId: id, shipping: null };
}

/** @deprecated */
export async function HomePage() {
  return WarehouseHomePage();
}
