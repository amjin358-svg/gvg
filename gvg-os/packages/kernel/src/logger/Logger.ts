/** @gvg/kernel/logger/Logger */

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown>;

export type Logger = {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
  child: (context: LogContext) => Logger;
};

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

let minLevel: LogLevel = "info";

export function setLogLevel(level: LogLevel): void {
  minLevel = level;
}

function write(level: LogLevel, message: string, context: LogContext = {}) {
  if (levelOrder[level] < levelOrder[minLevel]) return;
  const line = {
    level,
    message,
    time: new Date().toISOString(),
    ...context,
  };
  const fn =
    level === "error"
      ? console.error
      : level === "warn"
        ? console.warn
        : console.log;
  fn(JSON.stringify(line));
}

export function createLogger(base: LogContext = {}): Logger {
  const log =
    (level: LogLevel) =>
    (message: string, context?: LogContext) =>
      write(level, message, { ...base, ...context });

  return {
    debug: log("debug"),
    info: log("info"),
    warn: log("warn"),
    error: log("error"),
    child: (context) => createLogger({ ...base, ...context }),
  };
}

export const logger = createLogger({ service: "gvg-os" });

export class LoggerService {
  private readonly inner: Logger;

  constructor(base: LogContext = {}) {
    this.inner = createLogger(base);
  }

  debug(message: string, context?: LogContext) {
    this.inner.debug(message, context);
  }

  info(message: string, context?: LogContext) {
    this.inner.info(message, context);
  }

  warn(message: string, context?: LogContext) {
    this.inner.warn(message, context);
  }

  error(message: string, context?: LogContext) {
    this.inner.error(message, context);
  }

  child(context: LogContext) {
    return this.inner.child(context);
  }
}
