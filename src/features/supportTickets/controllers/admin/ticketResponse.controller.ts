import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Shared imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import {
  ITicketResponseService,
  TicketAdminResponseBody,
} from "../../interfaces/index";

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
