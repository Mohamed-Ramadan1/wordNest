import { Request, Response } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared imports
import { ApiResponse } from "@shared/index";

// interfaces imports
import { TicketCloseBody } from "../../interfaces/SupportTicketAdminBody.interface";

// services imports
import { TicketStatusService } from "@features/supportTickets/services/admin/ticketStatus.service";

export class TicketStatusController {
  /**
   * Marks a ticket as closed.
   * Indicates that the ticket has been resolved or is no longer active.
   */
  public closeTicket = catchAsync(
    async (req: Request<{}, {}, TicketCloseBody>, res: Response) => {
      // Marks the ticket as closed
      const { ticket, ticketOwner } = req.body;
      const { user, ip } = req;
      await TicketStatusService.closeTicket(ticketOwner, user, ticket, ip);

      const response: ApiResponse<null> = {
        status: "success",
        message: "Ticket closed successfully",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Reopens a ticket.
   * Changes the status of the ticket back to open for further action.
   */
  public reopenTicket = catchAsync(async (req: Request, res: Response) => {
    // Reopens the ticket
    await TicketStatusService.reopenTicket();

    const response: ApiResponse<null> = {
      status: "success",
      message: "Ticket reopened successfully.",
    };

    sendResponse(200, res, response);
  });
}
