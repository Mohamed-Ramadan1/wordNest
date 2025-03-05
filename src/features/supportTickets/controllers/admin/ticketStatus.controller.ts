import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared imports
import { ApiResponse } from "@shared/index";

// interfaces imports
import { TicketCloseBody } from "../../interfaces/SupportTicketAdminBody.interface";

//interfaces imports
import { ITicketStatusService } from "../../interfaces/index";

// shard imports
import { TYPES } from "@shared/types/containerTypes";
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
