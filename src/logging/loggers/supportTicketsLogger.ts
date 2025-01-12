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

// log successful ticket creation .
export const logTicketCreation = (
  ip: string | undefined,
  userId: ObjectId,
  ticketId: ObjectId
) => {
  logger.info("Ticket created", {
    ip: ip ? ip : "Unknown IP",
    userId,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "supportTicketsService",
    event: "create_ticket",
    message: "Ticket created successfully",
  });
};

// log fail ticket creation contains many information ip , user ,ticket id and more
export const logTicketCreationFail = (
  ip: string | undefined,
  userId: ObjectId,
  error: Error
) => {
  logger.error("Ticket creation failed", {
    ip: ip ? ip : "Unknown IP",
    userId,
    timestamp: new Date().toISOString(),
    service: "supportTicketsService",
    event: "create_ticket",
    message: error.message,
  });
};
