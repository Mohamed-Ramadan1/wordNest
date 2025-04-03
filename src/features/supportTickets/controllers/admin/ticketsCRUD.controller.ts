import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Shared imports
import { catchAsync, IResponseUtils, ApiResponse, TYPES } from "@shared/index";

// interface imports
import {
  TicketDeletionBody,
  TicketParams,
  TicketUPdateBody,
  ITicketsCRUDService,
  ISupportTicket,
} from "../../interfaces/index";

@injectable()
export class TicketsCRUDController {
  constructor(
    @inject(TYPES.TicketsCRUDService)
    private readonly ticketsCRUDService: ITicketsCRUDService,
    @inject(TYPES.ResponseUtils)
    private readonly responseUtils: IResponseUtils
  ) {}
  /**
   * Retrieves all tickets.
   * Fetches a list of all tickets in the system, optionally filtered by user or status.
   */
  public getAllTickets = catchAsync(async (req: Request, res: Response) => {
    // Retrieves all tickets
    const tickets = await this.ticketsCRUDService.getAllTickets(req);

    const response: ApiResponse<ISupportTicket[]> = {
      status: "success",
      message: "Tickets retrieved successfully  ",
      results: tickets.length,
      data: {
        supportTickets: tickets,
      },
    };
    this.responseUtils.sendResponse(200, res, response);
  });

  /**
   * Retrieves a specific ticket by ID.
   * Ensures the ticket belongs to the current user or has the appropriate permissions.
   */
  public getTicket = catchAsync(
    async (req: Request<TicketParams>, res: Response) => {
      // Retrieves a specific ticket by ID
      const ticketId = req.params.ticketId;
      const ticket = await this.ticketsCRUDService.getTicketById(ticketId);
      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        message: "Ticket retrieved successfully",
        data: { supportTicket: ticket },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Creates a new ticket.
   * Allows the user to submit a new ticket for an issue or request.
   */

  public createTicket = catchAsync(
    async (req: Request<TicketParams>, res: Response) => {
      // Creates a new ticket

      await this.ticketsCRUDService.createTicket(req.body, req.ip);

      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        message:
          "Ticket created successfully.use will receive an email with more information.",
      };
      this.responseUtils.sendResponse(201, res, response);
    }
  );

  /**
   * Updates a specific ticket by ID.
   * Allows modifications to the ticket details if the user has permissions.
   */

  public updateTicket = catchAsync(
    async (req: Request<{}, {}, TicketUPdateBody>, res: Response) => {
      const { ticketToUpdate, updateTicketObject } = req.body;
      // Updates a specific ticket
      await this.ticketsCRUDService.updateTicket(
        ticketToUpdate,
        updateTicketObject
      );

      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        message: "Ticket updated successfully",
      };

      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Deletes a specific ticket by ID.
   * Removes the ticket from the system if the user has permissions.
   */

  public deleteTicket = catchAsync(
    async (req: Request<{}, {}, TicketDeletionBody>, res: Response) => {
      await this.ticketsCRUDService.deleteTicket(
        req.body.ticketToBeDeleted,
        req.user,
        req.ip
      );

      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        message: "Ticket deleted successfully",
      };

      this.responseUtils.sendResponse(204, res, response);
    }
  );
}
