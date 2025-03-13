// express imports
import { NextFunction, Request, Response } from "express";

// shard imports
import { catchAsync, AppError, TYPES } from "@shared/index";

// packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import {
  TicketParams,
  TicketPriorityChangeBody,
  SupportTicketPriority,
  ITicketPriorityMiddleware,
  ISupportTicketManagementRepository,
} from "../../interfaces/index";

@injectable()
export class TicketPriorityMiddleware implements ITicketPriorityMiddleware {
  constructor(
    @inject(TYPES.SupportTicketManagementRepository)
    private readonly supportTicketManagementRepository: ISupportTicketManagementRepository
  ) {}
  public validatePriorityChange = catchAsync(
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

      const ticket =
        await this.supportTicketManagementRepository.getSupportTicketById(
          req.params.ticketId
        );

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
