// packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import {
  ISupportTicket,
  SupportTicketStatus,
} from "@features/supportTickets/interfaces/supportTicket.interface";

// shard imports
import { handleServiceError, TYPES } from "@shared/index";

// logger imports
import { ISupportTicketsLogger } from "@logging/interfaces";

// queues imports
import { SupportTicketQueueJobs, supportTicketQueue } from "@jobs/index";
import { IUser } from "@features/users";

// interfaces imports
import { ITicketStatusService } from "../../interfaces/index";

@injectable()
export class TicketStatusService implements ITicketStatusService {
  private supportTicketsLogger: ISupportTicketsLogger;
  constructor(
    @inject(TYPES.SupportTicketsLogger)
    supportTicketsLogger: ISupportTicketsLogger
  ) {
    this.supportTicketsLogger = supportTicketsLogger;
  }
  /**
   * Marks a ticket as closed.
   * Indicates that the ticket has been resolved or is no longer active.
   */
  async closeTicket(
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
      this.supportTicketsLogger.logSuccessCloseTicket(
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
      this.supportTicketsLogger.logFailCloseTicket(
        ipAddress,
        userAdmin._id,
        ticket._id,
        err.message
      );
      handleServiceError(err);
    }
  }

  /**
   * Reopens a ticket.
   * Changes the status of the ticket back to open for further action.
   */
  async reopenTicket(
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
      this.supportTicketsLogger.logSuccessReopenTicket(
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
      this.supportTicketsLogger.logFailReopenTicket(
        ipAddress,
        userAdmin._id,
        ticket._id,
        err.message
      );
      handleServiceError(err);
    }
  }
}
