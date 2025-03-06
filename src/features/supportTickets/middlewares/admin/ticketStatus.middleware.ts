import { catchAsync, AppError } from "@shared/index";
import { Request, Response, NextFunction } from "express";
import {
  ISupportTicket,
  SupportTicketStatus,
} from "@features/supportTickets/interfaces/supportTicket.interface";
import {
  TicketCloseBody,
  TicketParams,
} from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";

import SupportTicket from "@features/supportTickets/models/supportTicket.model";

import { IUser, UserModel } from "@features/users";
export class TicketStatusMiddleware {
  // validate close support ticket
  static validateCloseTicket = catchAsync(
    async (
      req: Request<TicketParams, {}, TicketCloseBody>,
      res: Response,
      next: NextFunction
    ) => {
      // check if ticket exists
      const ticket: ISupportTicket | null = await SupportTicket.findById(
        req.params.ticketId
      );
      if (!ticket) {
        return next(
          new AppError(
            `No support ticket found with this id : ${req.params.ticketId}`,
            404
          )
        );
      }

      // check if ticket is already closed
      if (ticket.status === SupportTicketStatus.CLOSED) {
        return next(
          new AppError(`This support ticket has already been closed`, 400)
        );
      }

      // check if the user own the ticket is exist
      const ticketOwner: IUser | null = await UserModel.findById(ticket.user);
      if (!ticketOwner) {
        return next(new AppError(`ticket owner no longer exists`, 404));
      }

      req.body.ticket = ticket;
      req.body.ticketOwner = ticketOwner;
      next();
    }
  );

  static validateReopenTicket = catchAsync(
    async (
      req: Request<TicketParams, {}, TicketCloseBody>,
      res: Response,
      next: NextFunction
    ) => {
      // check if ticket exists
      const ticket: ISupportTicket | null = await SupportTicket.findById(
        req.params.ticketId
      );
      if (!ticket) {
        return next(
          new AppError(
            `No support ticket found with this id : ${req.params.ticketId}`,
            404
          )
        );
      }

      // check if ticket is already closed
      if (ticket.status !== SupportTicketStatus.CLOSED) {
        return next(
          new AppError(
            `This support ticket not closed only closed tickets could be re-opened`,
            400
          )
        );
      }

      // check if the user own the ticket is exist
      const ticketOwner: IUser | null = await UserModel.findById(ticket.user);
      if (!ticketOwner) {
        return next(new AppError(`ticket owner no longer exists`, 404));
      }

      req.body.ticket = ticket;
      req.body.ticketOwner = ticketOwner;
      next();
    }
  );
}
