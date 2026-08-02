import type { UserRole } from "./roles";

export type { UserRole } from "./roles";

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

export interface Brand {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: ProductCategory;
  description: string;
  productCount: number;
}

export interface Product {
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
  imageGradient: string;
}

export interface Rfq {
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
}

export interface Quote {
  id: string;
  rfqId: string;
  supplierName: string;
  unitPrice: number;
  currency: string;
  leadTimeDays: number;
  validUntil: string;
  status: QuoteStatus;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerName: string;
  supplierName: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  createdAt: string;
  eta?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  capacityUnits: number;
  utilizationPct: number;
}

export interface LogisticsShipment {
  id: string;
  trackingNumber: string;
  mode: "ocean" | "air" | "rail" | "truck";
  origin: string;
  destination: string;
  status: "booked" | "in_transit" | "customs_hold" | "delivered";
  etd: string;
  eta: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface PlatformModule {
  id: string;
  name: string;
  href: string;
  description: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
}
