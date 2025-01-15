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

// log success replay ticket
export const logSuccessReplayTicket = (
  ip: string | undefined,
  responderId: ObjectId,
  ticketId: ObjectId,
  reply: string
) => {
  logger.info("Ticket response replayed ", {
    ip: ip ? ip : "Unknown IP",
    responderId,
    ticketId,
    reply,
    timestamp: new Date().toISOString(),
    service: "supportTicketsService",
    event: "replay_response_ticket",
    message: "Ticket response replayed successfully",
  });
};

// log fail replay ticket
export const logFailReplayTicket = (
  ip: string | undefined,
  responderId: ObjectId,
  ticketId: ObjectId,
  error: Error
) => {
  logger.error("Ticket response replay failed ", {
    ip: ip ? ip : "Unknown IP",
    responderId,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "supportTicketsService",
    event: "replay_response_ticket",
    message: error.message,
  });
};

// support ticket deletion success log
export const logSupportTicketDeletionSuccess = (
  ip: string | undefined,
  userDeletedTicketId: ObjectId,

  ticketId: ObjectId
) => {
  logger.info("Support ticket deleted ", {
    ip: ip ? ip : "Unknown IP",
    userDeletedTicketId,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "supportTicketsService",
    event: "delete_ticket",
    message: "Support ticket deleted successfully",
  });
};

// support ticket deletion fail log
export const logSupportTicketDeletionFail = (
  ip: string | undefined,
  userDeletedTicketId: ObjectId,
  ticketId: ObjectId,
  error: Error
) => {
  logger.error("Support ticket deletion failed ", {
    ip: ip ? ip : "Unknown IP",
    userDeletedTicketId,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "ticketCRUDService",
    event: "delete_ticket",
    message: error.message,
  });
};

// support ticket priority change success log
export const logSupportTicketPriorityChangeSuccess = (
  ip: string | undefined,
  userChangedTicketId: ObjectId,
  ticketId: ObjectId,
  newPriority: string
) => {
  logger.info("Support ticket priority changed ", {
    ip: ip ? ip : "Unknown IP",
    userChangedTicketId,
    ticketId,
    newPriority,
    timestamp: new Date().toISOString(),
    service: "ticketPriorityService",
    event: "change_priority_ticket",
    message: "Support ticket priority changed successfully",
  });
};

// log success close ticket event
export const logSuccessCloseTicket = (
  ip: string | undefined,
  userAdmin: ObjectId,
  ticketId: ObjectId
) => {
  logger.info("Ticket closed successfully", {
    ip: ip ? ip : "Unknown IP",
    userAdmin,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "ticketStatusService",
    event: "close_ticket",
    message: "Ticket closed successfully",
  });
};

// log fail close ticket event
export const logFailCloseTicket = (
  ip: string | undefined,
  userAdmin: ObjectId,
  ticketId: ObjectId,
  error: Error
) => {
  logger.error("Ticket close failed", {
    ip: ip ? ip : "Unknown IP",
    userAdmin,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "ticketStatusService",
    event: "close_ticket",
    message: error.message,
  });
};
