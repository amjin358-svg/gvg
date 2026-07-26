/** @gvg/core/notification — in-app / channel notifications */

export type NotificationChannel = "in_app" | "email" | "sms" | "webhook";

export type NotificationSeverity = "info" | "success" | "warning" | "error";

export type NotificationStatus = "pending" | "sent" | "read" | "failed";

export type Notification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  severity: NotificationSeverity;
  status: NotificationStatus;
  tenantId?: string;
  workspaceId?: string;
  href?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  readAt?: string;
};

const notifications: Notification[] = [];

export function createNotification(
  input: Omit<Notification, "id" | "status" | "createdAt"> & {
    id?: string;
    status?: NotificationStatus;
    createdAt?: string;
  },
): Notification {
  return {
    id: input.id ?? crypto.randomUUID(),
    userId: input.userId,
    title: input.title,
    body: input.body,
    channel: input.channel,
    severity: input.severity,
    status: input.status ?? "pending",
    tenantId: input.tenantId,
    workspaceId: input.workspaceId,
    href: input.href,
    metadata: input.metadata,
    createdAt: input.createdAt ?? new Date().toISOString(),
    readAt: input.readAt,
  };
}

export function sendNotification(
  input: Omit<Notification, "id" | "status" | "createdAt"> & {
    id?: string;
  },
): Notification {
  const notification = createNotification({
    ...input,
    status: input.channel === "in_app" ? "sent" : "pending",
  });
  notifications.push(notification);
  return notification;
}

export function listNotifications(filter?: {
  userId?: string;
  status?: NotificationStatus;
  channel?: NotificationChannel;
  limit?: number;
}): Notification[] {
  let out = [...notifications];
  if (filter?.userId) out = out.filter((n) => n.userId === filter.userId);
  if (filter?.status) out = out.filter((n) => n.status === filter.status);
  if (filter?.channel) out = out.filter((n) => n.channel === filter.channel);
  out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (filter?.limit) out = out.slice(0, filter.limit);
  return out;
}

export function markNotificationRead(id: string): Notification | null {
  const notification = notifications.find((n) => n.id === id);
  if (!notification) return null;
  notification.status = "read";
  notification.readAt = new Date().toISOString();
  return notification;
}

export function clearNotifications(): void {
  notifications.length = 0;
}

export class NotificationService {
  static send = sendNotification;
  static list = listNotifications;
  static markRead = markNotificationRead;
  static clear = clearNotifications;
}
