/** @gvg/core/errors — typed application errors */

export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION"
  | "RATE_LIMIT"
  | "INTERNAL"
  | (string & {});

export class GvgError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly details?: unknown;

  constructor(code: ErrorCode, message: string, status = 500, details?: unknown) {
    super(message);
    this.name = "GvgError";
    this.code = code;
    this.status = status;
    this.details = details;
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
    };
  }
}

export function badRequest(message: string, details?: unknown) {
  return new GvgError("BAD_REQUEST", message, 400, details);
}

export function unauthorized(message = "Unauthorized") {
  return new GvgError("UNAUTHORIZED", message, 401);
}

export function forbidden(message = "Forbidden") {
  return new GvgError("FORBIDDEN", message, 403);
}

export function notFound(message = "Not found") {
  return new GvgError("NOT_FOUND", message, 404);
}

export function conflict(message: string, details?: unknown) {
  return new GvgError("CONFLICT", message, 409, details);
}

export function validationError(message: string, details?: unknown) {
  return new GvgError("VALIDATION", message, 422, details);
}

export function internalError(message = "Internal server error", details?: unknown) {
  return new GvgError("INTERNAL", message, 500, details);
}

export function isGvgError(value: unknown): value is GvgError {
  return value instanceof GvgError;
}
