// interfaces imports
import {
  ISupportTicket,
  SupportTicketStatus,
} from "@features/supportTickets/interfaces/supportTicket.interface";

// utils imports
import { AppError } from "@utils/index";

// logger imports
import { supportTicketsLogger } from "@logging/index";

// queues imports
import { SupportTicketQueueJobs, supportTicketQueue } from "@jobs/index";
import { IUser } from "@features/users";

export class TicketStatusService {
  /**
   * Marks a ticket as closed.
   * Indicates that the ticket has been resolved or is no longer active.
   */
  static async closeTicket(
    ticketOwner: IUser,
    userAdmin: IUser,
    ticket: ISupportTicket,
    ipAddress: string | undefined
  ) {
    try {
      ticket.status = SupportTicketStatus.CLOSED;
      ticket.resolvedAt = new Date();
      ticket.resolvedBy = userAdmin._id;
      ticket.closedAt = new Date();
      await ticket.save();
      // log close event
      supportTicketsLogger.logSuccessCloseTicket(
        ipAddress,
        userAdmin._id,
        ticket._id
      );
      // send notification to ticket owner
      supportTicketQueue.add(SupportTicketQueueJobs.SendTicketClosedEmail, {
        user: ticketOwner,
        supportTicket: ticket,
      });
    } catch (err: any) {
      // log failed close event
      supportTicketsLogger.logFailCloseTicket(
        ipAddress,
        userAdmin._id,
        ticket._id,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Reopens a ticket.
   * Changes the status of the ticket back to open for further action.
   */
  static async reopenTicket(
    ticketOwner: IUser,
    userAdmin: IUser,
    ticket: ISupportTicket,
    ipAddress: string | undefined
  ) {
    try {
      ticket.status = SupportTicketStatus.OPEN;
      ticket.reopenedAt = new Date();
      ticket.reopenedBy = userAdmin._id;
      await ticket.save();
      // log reopen event
      supportTicketsLogger.logSuccessReopenTicket(
        ipAddress,
        userAdmin._id,
        ticket._id
      );
      // send notification to ticket owner
      supportTicketQueue.add(SupportTicketQueueJobs.SendTicketReopenedEmail, {
        user: ticketOwner,
        supportTicket: ticket,
      });
    } catch (err: any) {
      // log failed reopen event
      supportTicketsLogger.logFailReopenTicket(
        ipAddress,
        userAdmin._id,
        ticket._id,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }
}
