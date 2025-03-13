// express imports
import { NextFunction, Request, Response } from "express";

// shard imports
import { catchAsync, AppError, TYPES, validateDto } from "@shared/index";

// packages imports
import { inject, injectable } from "inversify";

// users feature interfaces imports
import { IUser, UserModel } from "@features/users";

// interfaces imports
import {
  TicketParams,
  ISupportTicket,
  TicketCloseBody,
  SupportTicketStatus,
  ITicketStatusMiddleware,
} from "../../interfaces/index";

import SupportTicket from "@features/supportTickets/models/supportTicket.model";

@injectable()
export class TicketStatusMiddleware implements ITicketStatusMiddleware {
  // validate close support ticket
  public validateCloseTicket = catchAsync(
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

  public validateReopenTicket = catchAsync(
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
