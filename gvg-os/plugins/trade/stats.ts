/**
 * Trade dashboard stats
 *
 * Shipment · Containers · Invoices
 */

import {
  listContainers,
  listInvoices,
  listShipments,
} from "./repositories";

export type TradeStatId = "shipment" | "containers" | "invoices";

export type TradeStat = {
  id: TradeStatId;
  label: string;
  labelZh: string;
  value: number;
  href: string;
};

export async function getTradeStats(): Promise<TradeStat[]> {
  const [shipments, containers, invoices] = await Promise.all([
    listShipments(),
    listContainers(),
    listInvoices(),
  ]);

  return [
    {
      id: "shipment",
      label: "Shipment",
      labelZh: "出貨",
      value: shipments.length,
      href: "/trade/shipments",
    },
    {
      id: "containers",
      label: "Containers",
      labelZh: "貨櫃",
      value: containers.length,
      href: "/trade/shipments",
    },
    {
      id: "invoices",
      label: "Invoices",
      labelZh: "發票",
      value: invoices.length,
      href: "/trade/invoices",
    },
  ];
}

export const TRADE_STAT_WIDGETS = [
  {
    id: "trade.shipment",
    title: "Shipment",
    description: "Active and historical shipments",
    component: "widgets/ShipmentStat",
    size: "sm" as const,
    order: 10,
  },
  {
    id: "trade.containers",
    title: "Containers",
    description: "Containers across all shipments",
    component: "widgets/ContainersStat",
    size: "sm" as const,
    order: 20,
  },
  {
    id: "trade.invoices",
    title: "Invoices",
    description: "Commercial invoices",
    component: "widgets/InvoicesStat",
    size: "sm" as const,
    order: 30,
  },
];
