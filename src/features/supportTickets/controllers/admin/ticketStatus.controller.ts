import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Shared imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import { TicketCloseBody } from "../../interfaces/supportTicketAdminBody.interface";

//interfaces imports
import { ITicketStatusService } from "../../interfaces/index";

@injectable()
export class TicketStatusController {
  private ticketStatusService: ITicketStatusService;
  constructor(
    @inject(TYPES.TicketStatusService)
    ticketStatusService: ITicketStatusService
  ) {
    this.ticketStatusService = ticketStatusService;
  }

  /**
   * Marks a ticket as closed.
   * Indicates that the ticket has been resolved or is no longer active.
   */
  public closeTicket = catchAsync(
    async (req: Request<{}, {}, TicketCloseBody>, res: Response) => {
      // Marks the ticket as closed
      const { ticket, ticketOwner } = req.body;
      const { user, ip } = req;
      await this.ticketStatusService.closeTicket(ticketOwner, user, ticket, ip);

      const response: ApiResponse<null> = {
        status: "success",
        message: "Ticket closed successfully.",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Reopens a ticket.
   * Changes the status of the ticket back to open for further action.
   */
  public reopenTicket = catchAsync(
    async (req: Request<{}, {}, TicketCloseBody>, res: Response) => {
      // Reopens the ticket
      const { ticket, ticketOwner } = req.body;
      const { user, ip } = req;
      await this.ticketStatusService.reopenTicket(
        ticketOwner,
        user,
        ticket,
        ip
      );

      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Ticket reopened successfully.we send an confirmation email to the user with the new update.",
      };

      sendResponse(200, res, response);
    }
  );
}
