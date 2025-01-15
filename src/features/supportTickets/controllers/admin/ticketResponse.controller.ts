import { Request, Response } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared imports
import { ApiResponse } from "@shared/index";
import { TicketResponseService } from "@features/supportTickets/services/admin/ticketResponse.service";
import { TicketAdminResponseBody } from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";

export class TicketResponseController {
  /**
   * Allows an admin to respond to a ticket.
   * Admins can provide a reply to address user concerns or issues in a ticket.
   */
  public respondToTicket = catchAsync(
    async (req: Request<{}, {}, TicketAdminResponseBody>, res: Response) => {
      const { ticketOwner, ticket, ticketResponseObject } = req.body;
      const { ip, user } = req;
      // Admin responds to a specific ticket
      await TicketResponseService.respondToTicket(
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
