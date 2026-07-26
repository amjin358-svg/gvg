/**
 * Warehouse module tree
 *
 * Warehouse
 * ├── Inventory
 * ├── Bin
 * ├── Barcode
 * ├── Picking
 * ├── Packing
 * ├── Receiving
 * └── Shipping
 */

export type WarehouseModuleId =
  | "inventory"
  | "bin"
  | "barcode"
  | "picking"
  | "packing"
  | "receiving"
  | "shipping";

export type WarehouseModule = {
  id: WarehouseModuleId;
  label: string;
  labelZh: string;
  href: string;
  description: string;
};

export const WAREHOUSE_MODULES: WarehouseModule[] = [
  {
    id: "inventory",
    label: "Inventory",
    labelZh: "庫存",
    href: "/warehouse/inventory",
    description: "Stock levels and SKU balances",
  },
  {
    id: "bin",
    label: "Bin",
    labelZh: "儲位",
    href: "/warehouse/bins",
    description: "Bin locations and putaway",
  },
  {
    id: "barcode",
    label: "Barcode",
    labelZh: "條碼",
    href: "/warehouse/barcodes",
    description: "Barcode labels and scanning",
  },
  {
    id: "picking",
    label: "Picking",
    labelZh: "揀貨",
    href: "/warehouse/picking",
    description: "Pick waves and pick lists",
  },
  {
    id: "packing",
    label: "Packing",
    labelZh: "包裝",
    href: "/warehouse/packing",
    description: "Pack stations and cartons",
  },
  {
    id: "receiving",
    label: "Receiving",
    labelZh: "收貨",
    href: "/warehouse/receiving",
    description: "Inbound ASN and receiving",
  },
  {
    id: "shipping",
    label: "Shipping",
    labelZh: "出庫",
    href: "/warehouse/shipping",
    description: "Outbound shipping and dock",
  },
];

export function getWarehouseModule(
  id: WarehouseModuleId,
): WarehouseModule | undefined {
  return WAREHOUSE_MODULES.find((m) => m.id === id);
}

export default WAREHOUSE_MODULES;
