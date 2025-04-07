import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Shared imports
import { catchAsync, IResponseUtils, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import { TicketCloseBody, ITicketStatusService } from "../../interfaces/index";

@injectable()
export class TicketStatusController {
  constructor(
    @inject(TYPES.TicketStatusService)
    private readonly ticketStatusService: ITicketStatusService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

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
      this.responseUtils.sendResponse(200, res, response);
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

      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
