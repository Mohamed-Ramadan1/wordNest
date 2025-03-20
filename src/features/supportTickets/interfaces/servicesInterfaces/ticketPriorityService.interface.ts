import { ISupportTicket, SupportTicketPriority } from "../index";
import { IUser } from "@features/users";

/**
 * Interface for the TicketPriorityService.
 * This service handles support ticket priority management.
 */
export interface ITicketPriorityService {
  /**
   * Changes the priority of a support ticket.
   *
   * @param ipAddress - The IP address of the request origin.
   * @param ticket - The support ticket whose priority is being changed.
   * @param userAdmin - The admin user performing the operation.
   * @param newPriority - The new priority level for the ticket.
   *
   * @throws {AppError} Throws an error if the priority change fails.
   */
  changePriority(
    ipAddress: string | undefined,
    ticket: ISupportTicket,
    userAdmin: IUser,
    newPriority: SupportTicketPriority
  ): Promise<void>;
}
