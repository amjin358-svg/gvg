import { Badge } from "@/components/atoms/Badge";
import type { OrderStatus, QuoteStatus, RfqStatus } from "@/types";

type Status = OrderStatus | RfqStatus | QuoteStatus | string;

const STATUS_TONE: Record<
  string,
  "neutral" | "success" | "warning" | "info" | "accent"
> = {
  open: "info",
  quoted: "accent",
  negotiating: "warning",
  awarded: "success",
  closed: "neutral",
  draft: "neutral",
  sent: "info",
  accepted: "success",
  rejected: "warning",
  expired: "neutral",
  pending: "warning",
  confirmed: "info",
  in_transit: "accent",
  customs: "warning",
  customs_hold: "warning",
  delivered: "success",
  cancelled: "neutral",
  booked: "info",
  in_progress: "accent",
  negotiation: "warning",
  on_track: "success",
  blocked: "warning",
};

function labelize(status: string): string {
  return status.replaceAll("_", " ");
}

export function StatusBadge({ status }: { status: Status }) {
  const key = String(status);
  return <Badge tone={STATUS_TONE[key] ?? "neutral"}>{labelize(key)}</Badge>;
}
