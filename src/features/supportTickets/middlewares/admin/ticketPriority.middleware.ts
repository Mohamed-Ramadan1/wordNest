import { catchAsync, AppError } from "@shared/index";
import { Request, Response, NextFunction } from "express";
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";
import {
  TicketPriorityChangeBody,
  TicketParams,
} from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";
import { SupportTicketPriority } from "@features/supportTickets/interfaces/supportTicket.interface";
import SupportTicket from "@features/supportTickets/models/supportTicket.model";

export class TicketPriorityMiddleware {
  static validatePriorityChange = catchAsync(
    async (
      req: Request<TicketParams, {}, TicketPriorityChangeBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { priority } = req.body;

      if (!priority) {
        return next(
          new AppError(
            "priority is required please provide it and be valid value ",
            400
          )
        );
      }
      if (!Object.values(SupportTicketPriority).includes(priority)) {
        return next(
          new AppError("priority is not valid please provide valid value", 400)
        );
      }

      const ticket: ISupportTicket | null = await SupportTicket.findById(
        req.params.ticketId
      );
      if (!ticket) {
        return next(
          new AppError(
            `No ticket found with this id : ${req.params.ticketId}`,
            404
          )
        );
      }
      if (ticket.priority === priority) {
        return next(
          new AppError(`Priority for this ticket is already ${priority}`, 400)
        );
      }

      req.body.ticketToUpdate = ticket;
      req.body.newPriority = priority;

      next();
    }
  );
}
