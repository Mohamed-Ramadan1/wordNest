import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Shared imports
import { catchAsync, IResponseUtils, ApiResponse, TYPES } from "@shared/index";

import {
  ITicketPriorityService,
  TicketPriorityChangeBody,
} from "../../interfaces/index";

@injectable()
export class TicketPriorityController {
  constructor(
    @inject(TYPES.TicketPriorityService)
    private readonly ticketPriorityService: ITicketPriorityService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
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

      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
