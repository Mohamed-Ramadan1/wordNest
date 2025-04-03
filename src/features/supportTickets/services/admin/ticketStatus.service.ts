// packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

// shard imports
import { IErrorUtils, TYPES } from "@shared/index";

// logger imports
import { ISupportTicketsLogger } from "@logging/interfaces";

// queues imports
import { SupportTicketQueueJobs, supportTicketQueue } from "@jobs/index";
import { IUser } from "@features/users";

// interfaces imports
import {
  ITicketStatusService,
  ISupportTicketManagementRepository,
} from "../../interfaces/index";

@injectable()
export class TicketStatusService implements ITicketStatusService {
  constructor(
    @inject(TYPES.SupportTicketsLogger)
    private readonly supportTicketsLogger: ISupportTicketsLogger,
    @inject(TYPES.SupportTicketManagementRepository)
    private readonly ticketManagementRepository: ISupportTicketManagementRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
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
      await this.ticketManagementRepository.updateTicketStatusToClosed(
        ticket,
        userAdmin._id
      );
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
      this.errorUtils.handleServiceError(err);
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
      await this.ticketManagementRepository.updateTicketStatusToReopened(
        ticket,
        userAdmin._id
      );
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
      this.errorUtils.handleServiceError(err);
    }
  }
}
