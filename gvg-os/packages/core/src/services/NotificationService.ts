/**
 * @gvg/core/services/NotificationService
 *
 * Instance façade over @gvg/core/notification (+ optional mail fan-out).
 */

import {
  clearNotifications,
  listNotifications,
  markNotificationRead,
  sendNotification,
  type Notification,
  type NotificationChannel,
  type NotificationStatus,
} from "../notification";
import type { MailService } from "./MailService";

export class NotificationService {
  constructor(private readonly mail?: MailService) {}

  send(
    input: Omit<Notification, "id" | "status" | "createdAt"> & { id?: string },
  ): Notification {
    const notification = sendNotification(input);
    if (notification.channel === "email" && this.mail) {
      void this.mail.send({
        to: String(notification.metadata?.email ?? notification.userId),
        subject: notification.title,
        text: notification.body,
        meta: { notificationId: notification.id },
      });
    }
    return notification;
  }

  list(filter?: {
    userId?: string;
    status?: NotificationStatus;
    channel?: NotificationChannel;
    limit?: number;
  }): Notification[] {
    return listNotifications(filter);
  }

  markRead(id: string): Notification | null {
    return markNotificationRead(id);
  }

  clear(): void {
    clearNotifications();
  }

  notifyInApp(
    userId: string,
    title: string,
    body: string,
    extras: Partial<
      Pick<Notification, "severity" | "tenantId" | "workspaceId" | "href" | "metadata">
    > = {},
  ): Notification {
    return this.send({
      userId,
      title,
      body,
      channel: "in_app",
      severity: extras.severity ?? "info",
      ...extras,
    });
  }
}

export function createNotificationService(mail?: MailService): NotificationService {
  return new NotificationService(mail);
}
