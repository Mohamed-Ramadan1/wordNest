import { ObjectId } from "mongoose";

/**
 * Interface for logging events related to support tickets.
 */
export interface ISupportTicketsLogger {
  /**
   * Log a successful ticket creation event.
   * @param ip - The IP address of the user who created the ticket.
   * @param userId - The ID of the user who created the ticket.
   * @param ticketId - The ID of the created ticket.
   */
  logTicketCreation(
    ip: string | undefined,
    userId: ObjectId,
    ticketId: ObjectId
  ): void;

  /**
   * Log a failed ticket creation event.
   * @param ip - The IP address of the user attempting to create the ticket.
   * @param userId - The ID of the user attempting to create the ticket.
   * @param error - The error that caused the ticket creation failure.
   */
  logTicketCreationFail(
    ip: string | undefined,
    userId: ObjectId,
    error: Error
  ): void;

  /**
   * Log a successful ticket reply event.
   * @param ip - The IP address of the responder.
   * @param responderId - The ID of the user who replied to the ticket.
   * @param ticketId - The ID of the ticket being replied to.
   * @param reply - The content of the response.
   */
  logSuccessReplayTicket(
    ip: string | undefined,
    responderId: ObjectId,
    ticketId: ObjectId,
    reply: string
  ): void;

  /**
   * Log a failed ticket reply event.
   * @param ip - The IP address of the responder.
   * @param responderId - The ID of the user attempting to reply to the ticket.
   * @param ticketId - The ID of the ticket being replied to.
   * @param error - The error that caused the failure.
   */
  logFailReplayTicket(
    ip: string | undefined,
    responderId: ObjectId,
    ticketId: ObjectId,
    error: Error
  ): void;

  /**
   * Log a successful ticket deletion event.
   * @param ip - The IP address of the user deleting the ticket.
   * @param userDeletedTicketId - The ID of the user deleting the ticket.
   * @param ticketId - The ID of the ticket being deleted.
   */
  logSupportTicketDeletionSuccess(
    ip: string | undefined,
    userDeletedTicketId: ObjectId,
    ticketId: ObjectId
  ): void;

  /**
   * Log a failed ticket deletion event.
   * @param ip - The IP address of the user attempting to delete the ticket.
   * @param userDeletedTicketId - The ID of the user attempting to delete the ticket.
   * @param ticketId - The ID of the ticket being deleted.
   * @param error - The error that caused the deletion failure.
   */
  logSupportTicketDeletionFail(
    ip: string | undefined,
    userDeletedTicketId: ObjectId,
    ticketId: ObjectId,
    error: Error
  ): void;

  /**
   * Log a successful ticket priority change event.
   * @param ip - The IP address of the user changing the ticket priority.
   * @param userChangedTicketId - The ID of the user changing the ticket priority.
   * @param ticketId - The ID of the ticket whose priority is being changed.
   * @param newPriority - The new priority level for the ticket.
   */
  logSupportTicketPriorityChangeSuccess(
    ip: string | undefined,
    userChangedTicketId: ObjectId,
    ticketId: ObjectId,
    newPriority: string
  ): void;

  /**
   * Log a successful ticket closure event.
   * @param ip - The IP address of the user closing the ticket.
   * @param userAdmin - The ID of the admin closing the ticket.
   * @param ticketId - The ID of the ticket being closed.
   */
  logSuccessCloseTicket(
    ip: string | undefined,
    userAdmin: ObjectId,
    ticketId: ObjectId
  ): void;

  /**
   * Log a failed ticket closure event.
   * @param ip - The IP address of the user attempting to close the ticket.
   * @param userAdmin - The ID of the admin attempting to close the ticket.
   * @param ticketId - The ID of the ticket being closed.
   * @param error - The error that caused the closure failure.
   */
  logFailCloseTicket(
    ip: string | undefined,
    userAdmin: ObjectId,
    ticketId: ObjectId,
    error: Error
  ): void;

  /**
   * Log a successful ticket reopening event.
   * @param ip - The IP address of the user reopening the ticket.
   * @param userAdmin - The ID of the admin reopening the ticket.
   * @param ticketId - The ID of the ticket being reopened.
   */
  logSuccessReopenTicket(
    ip: string | undefined,
    userAdmin: ObjectId,
    ticketId: ObjectId
  ): void;

  /**
   * Log a failed ticket reopening event.
   * @param ip - The IP address of the user attempting to reopen the ticket.
   * @param userAdmin - The ID of the admin attempting to reopen the ticket.
   * @param ticketId - The ID of the ticket being reopened.
   * @param error - The error that caused the reopening failure.
   */
  logFailReopenTicket(
    ip: string | undefined,
    userAdmin: ObjectId,
    ticketId: ObjectId,
    error: Error
  ): void;

  /**
   * Log a successful admin response to a ticket.
   * @param ip - The IP address of the admin responding to the ticket.
   * @param adminResponder - The ID of the admin responding to the ticket.
   * @param ticketId - The ID of the ticket being responded to.
   * @param response - The content of the admin's response.
   */
  logSuccessAdminResponseTicket(
    ip: string | undefined,
    adminResponder: ObjectId,
    ticketId: ObjectId,
    response: string
  ): void;

  /**
   * Log a failed admin response to a ticket.
   * @param ip - The IP address of the admin attempting to respond to the ticket.
   * @param adminResponder - The ID of the admin attempting to respond to the ticket.
   * @param ticketId - The ID of the ticket being responded to.
   * @param error - The error that caused the failure.
   */
  logFailAdminResponseTicket(
    ip: string | undefined,
    adminResponder: ObjectId,
    ticketId: ObjectId,
    error: Error
  ): void;
}
