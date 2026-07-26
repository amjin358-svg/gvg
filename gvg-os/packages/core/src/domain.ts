export type ProductCategory =
  | "health-supplements"
  | "packaged-foods"
  | "household-goods"
  | "hardware-tools"
  | "home-improvement"
  | "furniture"
  | "branded-apparel"
  | "oem-odm";

export type TradeService =
  | "international-trading"
  | "import-export"
  | "oem-odm"
  | "global-procurement"
  | "us-purchasing"
  | "logistics"
  | "customs-documentation"
  | "ai-procurement";

export type OrderStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "in_transit"
  | "customs"
  | "delivered"
  | "cancelled";

export type RfqStatus = "open" | "quoted" | "negotiating" | "awarded" | "closed";

export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";

export type Brand = {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  slug: ProductCategory;
  description: string;
  productCount: number;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  categorySlug: ProductCategory;
  brandId: string;
  brandName: string;
  moq: number;
  unitPrice: number;
  currency: string;
  originCountry: string;
  leadTimeDays: number;
  inStock: boolean;
  tags: string[];
};

export type Rfq = {
  id: string;
  title: string;
  categorySlug: ProductCategory;
  quantity: number;
  targetPrice?: number;
  currency: string;
  destination: string;
  status: RfqStatus;
  createdAt: string;
  buyerName: string;
};

export type Quote = {
  id: string;
  rfqId: string;
  supplierName: string;
  unitPrice: number;
  currency: string;
  leadTimeDays: number;
  validUntil: string;
  status: QuoteStatus;
};

export type Order = {
  id: string;
  orderNumber: string;
  buyerName: string;
  supplierName: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  createdAt: string;
  eta?: string;
};

export type Warehouse = {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  capacityUnits: number;
  utilizationPct: number;
};

export type LogisticsShipment = {
  id: string;
  trackingNumber: string;
  mode: "ocean" | "air" | "rail" | "truck";
  origin: string;
  destination: string;
  status: "booked" | "in_transit" | "customs_hold" | "delivered";
  etd: string;
  eta: string;
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type PlatformModule = {
  id: string;
  name: string;
  href: string;
  description: string;
};
