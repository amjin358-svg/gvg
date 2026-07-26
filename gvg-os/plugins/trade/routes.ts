/** Trade plugin routes */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const routes: PluginRoute[] = [
  {
    path: "/trade",
    page: "pages/TradeHome",
    title: "Trade",
  },
  {
    path: "/trade/po",
    page: "pages/PoList",
    title: "PO",
    auth: true,
  },
  {
    path: "/trade/po/[id]",
    page: "pages/PoDetail",
    title: "PO Detail",
    auth: true,
  },
  {
    path: "/trade/shipments",
    page: "pages/ShipmentList",
    title: "Shipment",
    auth: true,
  },
  {
    path: "/trade/shipments/[id]",
    page: "pages/ShipmentDetail",
    title: "Shipment Detail",
    auth: true,
  },
  {
    path: "/trade/customs",
    page: "pages/CustomsList",
    title: "Customs",
    auth: true,
  },
  {
    path: "/trade/customs/[id]",
    page: "pages/CustomsDetail",
    title: "Customs Detail",
    auth: true,
  },
  {
    path: "/trade/invoices",
    page: "pages/InvoiceList",
    title: "Invoice",
    auth: true,
  },
  {
    path: "/trade/invoices/[id]",
    page: "pages/InvoiceDetail",
    title: "Invoice Detail",
    auth: true,
  },
  {
    path: "/trade/packing-lists",
    page: "pages/PackingListList",
    title: "Packing List",
    auth: true,
  },
  {
    path: "/trade/packing-lists/[id]",
    page: "pages/PackingListDetail",
    title: "Packing List Detail",
    auth: true,
  },
  {
    path: "/trade/tracking",
    page: "pages/TrackingBoard",
    title: "Tracking",
    auth: true,
  },
  {
    path: "/trade/tracking/[id]",
    page: "pages/TrackingDetail",
    title: "Tracking Detail",
    auth: true,
  },
  {
    path: "/trade/documents",
    page: "pages/DocumentVault",
    title: "Documents",
    auth: true,
  },
  {
    path: "/trade/documents/[id]",
    page: "pages/DocumentDetail",
    title: "Document Detail",
    auth: true,
  },
];

export default routes;
