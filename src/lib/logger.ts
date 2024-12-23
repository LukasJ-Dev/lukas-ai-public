import winston from "winston";

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
});

export { logger };

import { v4 as uuidv4 } from "uuid";
import AppError from "./app_error";

export class ServerActionLogger {
  private serverActionUuid: string;
  private action: string;

  constructor(action: string) {
    this.serverActionUuid = uuidv4();
    this.action = action;
  }

  log(message: string, data: object) {
    logger.info(message, {
      ...data,
      action: this.action,
      serverActionUuid: this.serverActionUuid,
    });
  }

  logError(error: AppError) {
    if (error.statusCode === 500) {
      logger.error(error.message, {
        errorMessage: error.message,
        errorStack: error.stack,
        errorName: error.name,
        cause: error.cause,
        action: this.action,
        serverActionUuid: this.serverActionUuid,
      });
    } else {
      logger.info(error.message, {
        errorMessage: error.message,
        errorStatusCode: error.statusCode,
        action: this.action,
        serverActionUuid: this.serverActionUuid,
      });
    }
  }
}
