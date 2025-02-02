import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";

// Configure Winston logger
const supportTicketsLogger: Logger = createLogger("supportTickets");

// log successful ticket creation .
export const logTicketCreation = (
  ip: string | undefined,
  userId: ObjectId,
  ticketId: ObjectId
) => {
  supportTicketsLogger.info("Ticket created", {
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
  supportTicketsLogger.error("Ticket creation failed", {
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
  supportTicketsLogger.info("Ticket response replayed ", {
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
  supportTicketsLogger.error("Ticket response replay failed ", {
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
  supportTicketsLogger.info("Support ticket deleted ", {
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
  supportTicketsLogger.error("Support ticket deletion failed ", {
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
  supportTicketsLogger.info("Support ticket priority changed ", {
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
  supportTicketsLogger.info("Ticket closed successfully", {
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
  supportTicketsLogger.error("Ticket close failed", {
    ip: ip ? ip : "Unknown IP",
    userAdmin,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "ticketStatusService",
    event: "close_ticket",
    message: error.message,
  });
};

// log success reopen ticket event
export const logSuccessReopenTicket = (
  ip: string | undefined,
  userAdmin: ObjectId,
  ticketId: ObjectId
) => {
  supportTicketsLogger.info("Ticket reopened successfully", {
    ip: ip ? ip : "Unknown IP",
    userAdmin,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "ticketStatusService",
    event: "reopen_ticket",
    message: "Ticket reopened successfully",
  });
};

// log fail reopen ticket event
export const logFailReopenTicket = (
  ip: string | undefined,
  userAdmin: ObjectId,
  ticketId: ObjectId,
  error: Error
) => {
  supportTicketsLogger.error("Ticket reopen failed", {
    ip: ip ? ip : "Unknown IP",
    userAdmin,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "ticketStatusService",
    event: "reopen_ticket",
    message: error.message,
  });
};

// log success response ticket event
export const logSuccessAdminResponseTicket = (
  ip: string | undefined,
  adminResponder: ObjectId,
  ticketId: ObjectId,
  response: string
) => {
  supportTicketsLogger.info("Ticket responsed successfully", {
    ip: ip ? ip : "Unknown IP",
    adminResponder,
    ticketId,
    response,
    timestamp: new Date().toISOString(),
    service: "ticketResponseService",
    event: "response_ticket",
    message: "Ticket responsed successfully",
  });
};

// log fail response ticket event
export const logFailAdminResponseTicket = (
  ip: string | undefined,
  adminResponder: ObjectId,
  ticketId: ObjectId,
  error: Error
) => {
  supportTicketsLogger.error("Ticket response failed", {
    ip: ip ? ip : "Unknown IP",
    adminResponder,
    ticketId,
    timestamp: new Date().toISOString(),
    service: "ticketResponseService",
    event: "response_ticket",
    message: error.message,
  });
};
