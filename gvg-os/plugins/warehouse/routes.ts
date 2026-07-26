/** Warehouse plugin routes */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const routes: PluginRoute[] = [
  {
    path: "/warehouse",
    page: "pages/WarehouseHome",
    title: "Warehouse",
  },
  {
    path: "/warehouse/inventory",
    page: "pages/InventoryList",
    title: "Inventory",
    auth: true,
  },
  {
    path: "/warehouse/inventory/[sku]",
    page: "pages/InventoryDetail",
    title: "Inventory Detail",
    auth: true,
  },
  {
    path: "/warehouse/bins",
    page: "pages/BinList",
    title: "Bin",
    auth: true,
  },
  {
    path: "/warehouse/bins/[id]",
    page: "pages/BinDetail",
    title: "Bin Detail",
    auth: true,
  },
  {
    path: "/warehouse/barcodes",
    page: "pages/BarcodeList",
    title: "Barcode",
    auth: true,
  },
  {
    path: "/warehouse/barcodes/[code]",
    page: "pages/BarcodeDetail",
    title: "Barcode Detail",
    auth: true,
  },
  {
    path: "/warehouse/picking",
    page: "pages/PickingBoard",
    title: "Picking",
    auth: true,
  },
  {
    path: "/warehouse/picking/[id]",
    page: "pages/PickingDetail",
    title: "Picking Detail",
    auth: true,
  },
  {
    path: "/warehouse/packing",
    page: "pages/PackingBoard",
    title: "Packing",
    auth: true,
  },
  {
    path: "/warehouse/packing/[id]",
    page: "pages/PackingDetail",
    title: "Packing Detail",
    auth: true,
  },
  {
    path: "/warehouse/receiving",
    page: "pages/ReceivingBoard",
    title: "Receiving",
    auth: true,
  },
  {
    path: "/warehouse/receiving/[id]",
    page: "pages/ReceivingDetail",
    title: "Receiving Detail",
    auth: true,
  },
  {
    path: "/warehouse/shipping",
    page: "pages/ShippingBoard",
    title: "Shipping",
    auth: true,
  },
  {
    path: "/warehouse/shipping/[id]",
    page: "pages/ShippingDetail",
    title: "Shipping Detail",
    auth: true,
  },
];

export default routes;
