import { Request, Response } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared imports
import { ApiResponse } from "@shared/index";

export class TicketStatusController {
  /**
   * Marks a ticket as closed.
   * Indicates that the ticket has been resolved or is no longer active.
   */
  public closeTicket = catchAsync(async (req: Request, res: Response) => {
    // Marks the ticket as closed
  });

  /**
   * Reopens a ticket.
   * Changes the status of the ticket back to open for further action.
   */
  public reopenTicket = catchAsync(async (req: Request, res: Response) => {
    // Reopens the ticket
  });
}
