import winston, { Logger } from "winston";
import path from "path";
import { jsonFormatter } from "@logging/formatters/jsonFormatter";

export const createLogger = (moduleName: string, logLevel = "info"): Logger => {
  const { combine, timestamp, printf, errors, json, colorize } = winston.format;

  // Custom log format
  const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${moduleName}] ${level}: ${stack || message}`;
  });

  const isProduction = process.env.NODE_ENV === "production";
  const logDir = process.env.LOG_DIR || "logs";
  return winston.createLogger({
    level: logLevel,
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      // isProduction ? jsonFormatter : colorize(),
      // isProduction ? json() : customFormat
      jsonFormatter
    ),
    defaultMeta: { module: moduleName },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(logDir, `${moduleName}.log`),
        maxsize: 10 * 1024 * 1024, // 5MB
        maxFiles: 5,
      }),
    ],
    exceptionHandlers: [
      new winston.transports.File({
        filename: path.join(logDir, "exceptions.log"),
      }),
    ],
    rejectionHandlers: [
      new winston.transports.File({
        filename: path.join(logDir, "rejections.log"),
      }),
    ],
  });
};
