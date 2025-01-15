import { Request, Response } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared imports
import { ApiResponse } from "@shared/index";
import { TicketPriorityChangeBody } from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";
import { TicketPriorityService } from "@features/supportTickets/services/admin/ticketPriority.service";

export class TicketPriorityController {
  /**
   * Changes the priority of a ticket.
   * Sends or skips notifications based on the priority level.
   * Only an admin can perform this operation based on their judgment.
   */
  public changePriority = catchAsync(
    async (req: Request<{}, {}, TicketPriorityChangeBody>, res: Response) => {
      const { ticketToUpdate, newPriority } = req.body;
      const { user, ip } = req;

      await TicketPriorityService.changePriority(
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
