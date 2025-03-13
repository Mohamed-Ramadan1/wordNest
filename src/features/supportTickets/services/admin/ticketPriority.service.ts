// packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import {
  ISupportTicket,
  SupportTicketPriority,
} from "@features/supportTickets/interfaces/supportTicket.interface";

// shard imports
import { handleServiceError, TYPES } from "@shared/index";

// logger imports
import { ISupportTicketsLogger } from "@logging/interfaces";

import { IUser } from "@features/users";

// interfaces imports
import { ITicketPriorityService } from "../../interfaces/index";

@injectable()
export class TicketPriorityService implements ITicketPriorityService {
  constructor(
    @inject(TYPES.SupportTicketsLogger)
    private readonly supportTicketsLogger: ISupportTicketsLogger
  ) {}
  /**
   * Changes the priority of a ticket.
   * Sends or skips notifications based on the priority level.
   * Only an admin can perform this operation based on their judgment.
   */
  async changePriority(
    ipAddress: string | undefined,
    ticket: ISupportTicket,
    userAdmin: IUser,
    newPriority: SupportTicketPriority
  ) {
    try {
      ticket.priority = newPriority;
      await ticket.save();
      this.supportTicketsLogger.logSupportTicketPriorityChangeSuccess(
        ipAddress,
        userAdmin._id,
        ticket._id,
        newPriority
      );
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
