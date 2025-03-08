import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { ISupportTicketsLogger } from "@logging/interfaces";

export class SupportTicketsLogger implements ISupportTicketsLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("supportTickets");
  }

  // log successful ticket creation .
  public logTicketCreation = (
    ip: string | undefined,
    userId: ObjectId,
    ticketId: ObjectId
  ) => {
    this.logger.info("Ticket created", {
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
  public logTicketCreationFail = (
    ip: string | undefined,
    userId: ObjectId,
    error: Error
  ) => {
    this.logger.error("Ticket creation failed", {
      ip: ip ? ip : "Unknown IP",
      userId,
      timestamp: new Date().toISOString(),
      service: "supportTicketsService",
      event: "create_ticket",
      message: error.message,
    });
  };

  // log success replay ticket
  public logSuccessReplayTicket = (
    ip: string | undefined,
    responderId: ObjectId,
    ticketId: ObjectId,
    reply: string
  ) => {
    this.logger.info("Ticket response replayed ", {
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
  public logFailReplayTicket = (
    ip: string | undefined,
    responderId: ObjectId,
    ticketId: ObjectId,
    error: Error
  ) => {
    this.logger.error("Ticket response replay failed ", {
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
  public logSupportTicketDeletionSuccess = (
    ip: string | undefined,
    userDeletedTicketId: ObjectId,

    ticketId: ObjectId
  ) => {
    this.logger.info("Support ticket deleted ", {
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
  public logSupportTicketDeletionFail = (
    ip: string | undefined,
    userDeletedTicketId: ObjectId,
    ticketId: ObjectId,
    error: Error
  ) => {
    this.logger.error("Support ticket deletion failed ", {
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
  public logSupportTicketPriorityChangeSuccess = (
    ip: string | undefined,
    userChangedTicketId: ObjectId,
    ticketId: ObjectId,
    newPriority: string
  ) => {
    this.logger.info("Support ticket priority changed ", {
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
  public logSuccessCloseTicket = (
    ip: string | undefined,
    userAdmin: ObjectId,
    ticketId: ObjectId
  ) => {
    this.logger.info("Ticket closed successfully", {
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
  public logFailCloseTicket = (
    ip: string | undefined,
    userAdmin: ObjectId,
    ticketId: ObjectId,
    error: Error
  ) => {
    this.logger.error("Ticket close failed", {
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
  public logSuccessReopenTicket = (
    ip: string | undefined,
    userAdmin: ObjectId,
    ticketId: ObjectId
  ) => {
    this.logger.info("Ticket reopened successfully", {
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
  public logFailReopenTicket = (
    ip: string | undefined,
    userAdmin: ObjectId,
    ticketId: ObjectId,
    error: Error
  ) => {
    this.logger.error("Ticket reopen failed", {
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
  public logSuccessAdminResponseTicket = (
    ip: string | undefined,
    adminResponder: ObjectId,
    ticketId: ObjectId,
    response: string
  ) => {
    this.logger.info("Ticket responsed successfully", {
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
  public logFailAdminResponseTicket = (
    ip: string | undefined,
    adminResponder: ObjectId,
    ticketId: ObjectId,
    error: Error
  ) => {
    this.logger.error("Ticket response failed", {
      ip: ip ? ip : "Unknown IP",
      adminResponder,
      ticketId,
      timestamp: new Date().toISOString(),
      service: "ticketResponseService",
      event: "response_ticket",
      message: error.message,
    });
  };
}
