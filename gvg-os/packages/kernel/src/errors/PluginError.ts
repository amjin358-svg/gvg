/** @gvg/kernel/errors/PluginError */

import { BaseError } from "./BaseError";

export class PluginError extends BaseError {
  readonly pluginId?: string;
  readonly stage?: string;

  constructor(
    message: string,
    options: {
      pluginId?: string;
      stage?: string;
      details?: Record<string, unknown>;
      cause?: unknown;
    } = {},
  ) {
    super(message, {
      code: "PLUGIN",
      status: 500,
      details: {
        pluginId: options.pluginId,
        stage: options.stage,
        ...options.details,
      },
      cause: options.cause,
    });
    this.name = "PluginError";
    this.pluginId = options.pluginId;
    this.stage = options.stage;
  }
}

export function isPluginError(error: unknown): error is PluginError {
  return error instanceof PluginError;
}
