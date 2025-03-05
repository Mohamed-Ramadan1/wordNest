import { IUser } from "@features/users_feature";
import { ISupportTicket } from "./supportTicket.interface";
/**
 * Interface for the TicketStatusService class.
 * Provides methods to manage the status of support tickets.
 */
export interface ITicketStatusService {
  /**
   * Marks a support ticket as closed.
   * @param ticketOwner - The owner of the support ticket.
   * @param userAdmin - The admin user processing the closure.
   * @param ticket - The support ticket to be closed.
   * @param ipAddress - The IP address from which the request originated.
   * @throws {AppError} - Throws an error if closing the ticket fails.
   */
  closeTicket(
    ticketOwner: IUser,
    userAdmin: IUser,
    ticket: ISupportTicket,
    ipAddress: string | undefined
  ): Promise<void>;

  /**
   * Reopens a support ticket.
   * @param ticketOwner - The owner of the support ticket.
   * @param userAdmin - The admin user reopening the ticket.
   * @param ticket - The support ticket to be reopened.
   * @param ipAddress - The IP address from which the request originated.
   * @throws {AppError} - Throws an error if reopening the ticket fails.
   */
  reopenTicket(
    ticketOwner: IUser,
    userAdmin: IUser,
    ticket: ISupportTicket,
    ipAddress: string | undefined
  ): Promise<void>;
}
