import { Request, Response } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared imports
import { ApiResponse } from "@shared/index";

export class TicketPriorityController {
  /**
   * Upgrades the priority of a ticket to a high level.
   * Sends an email notification to the user when the priority is upgraded.
   * Only an admin can perform this operation based on their judgment.
   */
  public upgradePriority = catchAsync(async (req: Request, res: Response) => {
    // Upgrades ticket priority to high level
  });

  /**
   * Downgrades the priority of a ticket to a low level.
   * Does not notify the user to avoid frustration.
   * Only an admin can perform this operation based on their judgment.
   */
  public downgradePriority = catchAsync(async (req: Request, res: Response) => {
    // Downgrades ticket priority to low level
  });
}
