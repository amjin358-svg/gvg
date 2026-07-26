/**
 * Trade module tree
 *
 * Trade
 * ├── PO
 * ├── Shipment
 * ├── Customs
 * ├── Invoice
 * ├── Packing List
 * ├── Tracking
 * └── Documents
 */

export type TradeModuleId =
  | "po"
  | "shipment"
  | "customs"
  | "invoice"
  | "packing-list"
  | "tracking"
  | "documents";

export type TradeModule = {
  id: TradeModuleId;
  label: string;
  labelZh: string;
  href: string;
  description: string;
};

export const TRADE_MODULES: TradeModule[] = [
  {
    id: "po",
    label: "PO",
    labelZh: "採購單",
    href: "/trade/po",
    description: "Purchase orders and confirmations",
  },
  {
    id: "shipment",
    label: "Shipment",
    labelZh: "出貨",
    href: "/trade/shipments",
    description: "Ocean, air, and multimodal shipments",
  },
  {
    id: "customs",
    label: "Customs",
    labelZh: "報關",
    href: "/trade/customs",
    description: "Customs filings and clearance",
  },
  {
    id: "invoice",
    label: "Invoice",
    labelZh: "發票",
    href: "/trade/invoices",
    description: "Commercial invoices and billing",
  },
  {
    id: "packing-list",
    label: "Packing List",
    labelZh: "裝箱單",
    href: "/trade/packing-lists",
    description: "Packing lists and carton details",
  },
  {
    id: "tracking",
    label: "Tracking",
    labelZh: "追蹤",
    href: "/trade/tracking",
    description: "Live shipment tracking milestones",
  },
  {
    id: "documents",
    label: "Documents",
    labelZh: "文件",
    href: "/trade/documents",
    description: "Trade document vault",
  },
];

export function getTradeModule(id: TradeModuleId): TradeModule | undefined {
  return TRADE_MODULES.find((m) => m.id === id);
}

export default TRADE_MODULES;
