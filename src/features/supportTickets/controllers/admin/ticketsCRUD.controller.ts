import { Request, Response } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared imports
import { ApiResponse } from "@shared/index";

// interface imports
import {
  TicketDeletionBody,
  TicketParams,
  TicketUPdateBody,
} from "../../interfaces/SupportTicketAdminBody.interface";

// services imports
import { TicketsCRUDService } from "../../services/admin/ticketsCRUD.service";
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

export class TicketsCRUDController {
  /**
   * Retrieves all tickets.
   * Fetches a list of all tickets in the system, optionally filtered by user or status.
   */
  public getAllTickets = catchAsync(async (req: Request, res: Response) => {
    // Retrieves all tickets
    const tickets = await TicketsCRUDService.getAllTickets();

    const response: ApiResponse<ISupportTicket[]> = {
      status: "success",
      message: "Tickets retrieved successfully  ",
      results: tickets.length,
      data: {
        supportTickets: tickets,
      },
    };
    sendResponse(200, res, response);
  });

  /**
   * Retrieves a specific ticket by ID.
   * Ensures the ticket belongs to the current user or has the appropriate permissions.
   */
  public getTicket = catchAsync(
    async (req: Request<TicketParams>, res: Response) => {
      // Retrieves a specific ticket by ID
      const ticketId = req.params.ticketId;
      const ticket = await TicketsCRUDService.getTicketById(ticketId);
      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        message: "Ticket retrieved successfully",
        data: { supportTicket: ticket },
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Creates a new ticket.
   * Allows the user to submit a new ticket for an issue or request.
   */

  public createTicket = catchAsync(
    async (req: Request<TicketParams>, res: Response) => {
      // Creates a new ticket

      await TicketsCRUDService.createTicket(req.body, req.ip);

      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        message:
          "Ticket created successfully.use will receive an email with more information.",
      };
      sendResponse(201, res, response);
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
      await TicketsCRUDService.updateTicket(ticketToUpdate, updateTicketObject);

      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        message: "Ticket updated successfully",
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Deletes a specific ticket by ID.
   * Removes the ticket from the system if the user has permissions.
   */

  public deleteTicket = catchAsync(
    async (req: Request<{}, {}, TicketDeletionBody>, res: Response) => {
      await TicketsCRUDService.deleteTicket(
        req.body.ticketToBeDeleted,
        req.ip,
        req.user
      );

      const response: ApiResponse<ISupportTicket> = {
        status: "success",
        message: "Ticket deleted successfully",
      };

      sendResponse(204, res, response);
    }
  );
}
