/**
 * @gvg/core/services/MailService
 *
 * Outbound email (in-memory provider for local / demo).
 */

export type MailAddress = string | { name?: string; email: string };

export type MailMessage = {
  id: string;
  to: MailAddress[];
  cc?: MailAddress[];
  bcc?: MailAddress[];
  from: MailAddress;
  subject: string;
  text?: string;
  html?: string;
  status: "queued" | "sent" | "failed";
  error?: string;
  createdAt: string;
  sentAt?: string;
  meta?: Record<string, unknown>;
};

export type SendMailInput = {
  to: MailAddress | MailAddress[];
  cc?: MailAddress | MailAddress[];
  bcc?: MailAddress | MailAddress[];
  from?: MailAddress;
  subject: string;
  text?: string;
  html?: string;
  meta?: Record<string, unknown>;
};

export interface MailTransport {
  send(message: MailMessage): Promise<MailMessage>;
}

function normalizeAddresses(
  value: MailAddress | MailAddress[] | undefined,
): MailAddress[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function formatAddress(addr: MailAddress): string {
  if (typeof addr === "string") return addr;
  return addr.name ? `${addr.name} <${addr.email}>` : addr.email;
}

export class MemoryMailTransport implements MailTransport {
  async send(message: MailMessage): Promise<MailMessage> {
    return {
      ...message,
      status: "sent",
      sentAt: new Date().toISOString(),
    };
  }
}

export class MailService {
  private readonly outbox: MailMessage[] = [];

  constructor(
    private readonly transport: MailTransport = new MemoryMailTransport(),
    private readonly defaultFrom: MailAddress = "noreply@globalvistagroup.com",
  ) {}

  async send(input: SendMailInput): Promise<MailMessage> {
    const draft: MailMessage = {
      id: crypto.randomUUID(),
      to: normalizeAddresses(input.to),
      cc: normalizeAddresses(input.cc),
      bcc: normalizeAddresses(input.bcc),
      from: input.from ?? this.defaultFrom,
      subject: input.subject,
      text: input.text,
      html: input.html,
      status: "queued",
      createdAt: new Date().toISOString(),
      meta: input.meta ? { ...input.meta } : undefined,
    };

    try {
      const sent = await this.transport.send(draft);
      this.outbox.unshift(sent);
      return sent;
    } catch (error) {
      const failed: MailMessage = {
        ...draft,
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
      };
      this.outbox.unshift(failed);
      return failed;
    }
  }

  list(limit = 50): MailMessage[] {
    return this.outbox.slice(0, limit);
  }

  clear(): void {
    this.outbox.length = 0;
  }

  static formatAddress = formatAddress;
}

export function createMailService(
  transport?: MailTransport,
  defaultFrom?: MailAddress,
): MailService {
  return new MailService(transport, defaultFrom);
}
