// express imports
import { Response, Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Shared imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import {
  SupportTicketBody,
  SupportTicketParams,
  SupportTicketBodyReplay,
  ISupportTicket,
  ISupportTicketService,
} from "../../interfaces/index";

@injectable()
export class SupportTicketController {
  private supportTicketService: ISupportTicketService;
  constructor(
    @inject(TYPES.SupportTicketService)
    supportTicketService: ISupportTicketService
  ) {
    this.supportTicketService = supportTicketService;
  }
  /**
   * Creates a new support ticket.
   * Allows the user to submit a new issue or request for assistance.
   */
  public createSupportTicket = catchAsync(
    async (req: Request<{}, {}, SupportTicketBody>, res: Response) => {
      await this.supportTicketService.createSupportTicket(
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
        await this.supportTicketService.getAllUserSupportTickets(req.user, req);

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
      const supportTicket =
        await this.supportTicketService.getSupportTicketById(
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
      req: Request<SupportTicketParams, {}, SupportTicketBodyReplay>,
      res: Response
    ) => {
      await this.supportTicketService.replaySupportTicket(
        req.user,
        req.body.supportTicket,
        req.body,
        req.ip
      );

      // creating the response object
      const response: ApiResponse<null> = {
        status: "success",
        message: "Support ticket replied successfully.",
      };

      // sending the response.
      sendResponse(200, res, response);
    }
  );
}
