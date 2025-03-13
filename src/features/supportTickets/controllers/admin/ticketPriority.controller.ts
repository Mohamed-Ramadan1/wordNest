import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Shared imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

import { TicketPriorityChangeBody } from "@features/supportTickets/interfaces/supportTicketAdminBody.interface";
import { ITicketPriorityService } from "../../interfaces/index";

@injectable()
export class TicketPriorityController {
  private ticketPriorityService: ITicketPriorityService;
  constructor(
    @inject(TYPES.TicketPriorityService)
    ticketPriorityService: ITicketPriorityService
  ) {
    this.ticketPriorityService = ticketPriorityService;
  }
  /**
   * Changes the priority of a ticket.
   * Sends or skips notifications based on the priority level.
   * Only an admin can perform this operation based on their judgment.
   */
  public changePriority = catchAsync(
    async (req: Request<{}, {}, TicketPriorityChangeBody>, res: Response) => {
      const { ticketToUpdate, newPriority } = req.body;
      const { user, ip } = req;

      await this.ticketPriorityService.changePriority(
        ip,
        ticketToUpdate,
        user,
        newPriority
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: `Priority updated to ${newPriority}`,
      };

      sendResponse(200, res, response);
    }
  );
}
