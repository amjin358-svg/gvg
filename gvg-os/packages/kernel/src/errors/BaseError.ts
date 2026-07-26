/** @gvg/kernel/errors/BaseError */

export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION"
  | "INTERNAL"
  | "PLUGIN"
  | (string & {});

export class BaseError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    options: {
      code?: ErrorCode;
      status?: number;
      details?: Record<string, unknown>;
      cause?: unknown;
    } = {},
  ) {
    super(message, options.cause ? { cause: options.cause } : undefined);
    this.name = "BaseError";
    this.code = options.code ?? "INTERNAL";
    this.status = options.status ?? 500;
    this.details = options.details;
  }
}

export function isBaseError(error: unknown): error is BaseError {
  return error instanceof BaseError;
}
