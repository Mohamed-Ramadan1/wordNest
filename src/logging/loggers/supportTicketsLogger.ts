import winston, { Logger } from "winston";
import { jsonFormatter } from "@logging/formatters/jsonFormatter";
import { ObjectId } from "mongoose";

const logger: Logger = winston.createLogger({
  level: "info",
  format: jsonFormatter,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/supportTickets-logs.log" }),
  ],
});
