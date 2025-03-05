import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared imports
import { ApiResponse } from "@shared/index";

import { TicketAdminResponseBody } from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";

import { ITicketResponseService } from "../../interfaces/index";

// shard imports
import { TYPES } from "@shared/types/containerTypes";
@injectable()
export class TicketResponseController {
  private ticketResponseService: ITicketResponseService;
  constructor(
    @inject(TYPES.TicketResponseService)
    ticketResponseService: ITicketResponseService
  ) {
    this.ticketResponseService = ticketResponseService;
  }
  /**
   * Allows an admin to respond to a ticket.
   * Admins can provide a reply to address user concerns or issues in a ticket.
   */
  public respondToTicket = catchAsync(
    async (req: Request<{}, {}, TicketAdminResponseBody>, res: Response) => {
      const { ticketOwner, ticket, ticketResponseObject } = req.body;
      const { ip, user } = req;
      // Admin responds to a specific ticket
      await this.ticketResponseService.respondToTicket(
        ticket,
        ticketOwner,
        ip,
        user,
        ticketResponseObject
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Ticket response sent successfully.",
      };
      sendResponse(200, res, response);
    }
  );
}
