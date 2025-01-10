// express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shard imports
import { ApiResponse } from "@shared/index";

export class SupportTicketController {
  /**
   * Creates a new support ticket.
   * Allows the user to submit a new issue or request for assistance.
   */
  public createSupportTicket = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Retrieves all support tickets for the current user.
   * Fetches a list of all open or closed tickets submitted by the user.
   */
  public getAllUserSupportTickets = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Retrieves a specific support ticket by ID.
   * Ensures that the ticket belongs to the current user before displaying it.
   */
  public getSupportTicketById = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Allows the user to reply to a support ticket.
   * Enables the user to add a response or update an existing ticket.
   */
  public replaySupportTicket = catchAsync(
    async (req: Request, res: Response) => {}
  );
}
