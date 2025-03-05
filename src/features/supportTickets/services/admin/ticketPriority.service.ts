// interfaces imports
import {
  ISupportTicket,
  SupportTicketPriority,
} from "@features/supportTickets/interfaces/supportTicket.interface";

// utils imports
import { AppError } from "@utils/index";

// logger imports
import { supportTicketsLogger } from "@logging/index";

import { IUser } from "@features/users_feature";

// interfaces imports
import { ITicketPriorityService } from "../../interfaces/index";

export class TicketPriorityService implements ITicketPriorityService {
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
      supportTicketsLogger.logSupportTicketPriorityChangeSuccess(
        ipAddress,
        userAdmin._id,
        ticket._id,
        newPriority
      );
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }
}
