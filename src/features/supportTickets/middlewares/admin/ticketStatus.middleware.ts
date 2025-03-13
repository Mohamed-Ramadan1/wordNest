// express imports
import { NextFunction, Request, Response } from "express";

// shard imports
import { catchAsync, AppError, TYPES } from "@shared/index";

// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
// users feature interfaces imports
import { IUser } from "@features/users";

// interfaces imports
import {
  TicketParams,
  TicketCloseBody,
  SupportTicketStatus,
  ITicketStatusMiddleware,
  ISupportTicketManagementRepository,
} from "../../interfaces/index";

@injectable()
export class TicketStatusMiddleware implements ITicketStatusMiddleware {
  constructor(
    @inject(TYPES.SupportTicketManagementRepository)
    private readonly supportTicketManagementRepository: ISupportTicketManagementRepository,
    @inject(TYPES.USER_MODEL) private readonly userModel: Model<IUser>
  ) {}
  // validate close support ticket
  public validateCloseTicket = catchAsync(
    async (
      req: Request<TicketParams, {}, TicketCloseBody>,
      res: Response,
      next: NextFunction
    ) => {
      // check if ticket exists
      const ticket =
        await this.supportTicketManagementRepository.getSupportTicketById(
          req.params.ticketId
        );

      // check if ticket is already closed
      if (ticket.status === SupportTicketStatus.CLOSED) {
        return next(
          new AppError(`This support ticket has already been closed`, 400)
        );
      }

      // check if the user own the ticket is exist
      const ticketOwner: IUser | null = await this.userModel.findById(
        ticket.user
      );
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
      const ticket =
        await this.supportTicketManagementRepository.getSupportTicketById(
          req.params.ticketId
        ); // req.params.ticketId

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
      const ticketOwner: IUser | null = await this.userModel.findById(
        ticket.user
      );

      if (!ticketOwner) {
        return next(new AppError(`ticket owner no longer exists`, 404));
      }

      req.body.ticket = ticket;
      req.body.ticketOwner = ticketOwner;
      next();
    }
  );
}
