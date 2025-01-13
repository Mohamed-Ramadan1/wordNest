// express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shard imports
import { ApiResponse } from "@shared/index";

// interfaces imports
import {
  SupportTicketBody,
  SupportTicketParams,
} from "../../interfaces/supportTicketBody.interface";

// services imports
import { SupportTicketService } from "../../services/users/supportTickets.service";

// interfaces imports
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

export class SupportTicketController {
  /**
   * Creates a new support ticket.
   * Allows the user to submit a new issue or request for assistance.
   */
  public createSupportTicket = catchAsync(
    async (req: Request<{}, {}, SupportTicketBody>, res: Response) => {
      await SupportTicketService.createSupportTicket(
        req.body,
        req.user,
        req.ip
      );

      // creating the response object
      const response: ApiResponse<null> = {
        status: "success",
        message: "Support ticket created successfully.",
      };

      // sending the response.
      sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves all support tickets for the current user.
   * Fetches a list of all open or closed tickets submitted by the user.
   */
  public getAllUserSupportTickets = catchAsync(
    async (req: Request<{}, {}, SupportTicketBody>, res: Response) => {
      const supportTickets =
        await SupportTicketService.getAllUserSupportTickets(req.user);

      // creating the response object
      const response: ApiResponse<ISupportTicket[]> = {
        status: "success",
        results: supportTickets.length,
        data: { userSUpportTickets: supportTickets },
      };

      // sending the response.
      sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves a specific support ticket by ID.
   * Ensures that the ticket belongs to the current user before displaying it.
   */
  public getSupportTicketById = catchAsync(
    async (
      req: Request<SupportTicketParams, {}, SupportTicketBody>,
      res: Response
    ) => {
      const supportTicket = await SupportTicketService.getSupportTicketById(
        req.user,
        req.params.ticketId
      );

      // creating the response object
      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        data: { userTIcket: supportTicket },
      };

      // sending the response.
      sendResponse(200, res, response);
    }
  );

  /**
   * Allows the user to reply to a support ticket.
   * Enables the user to add a response or update an existing ticket.
   */
  public replaySupportTicket = catchAsync(
    async (
      req: Request<SupportTicketParams, {}, SupportTicketBody>,
      res: Response
    ) => {}
  );
}
