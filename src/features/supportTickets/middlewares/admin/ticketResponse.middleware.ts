// express imports
import { NextFunction, Request, Response } from "express";

// shard imports
import { catchAsync, AppError, TYPES } from "@shared/index";

// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

// users feature interfaces imports
import { IUser } from "@features/users";

// helpers imports
import { validateSupportTicketAttachments } from "../../helpers/index";

// interfaces imports
import {
  TicketParams,
  TicketAdminResponseBody,
  ITicketResponseMiddleware,
  ISupportTicketManagementRepository,
} from "../../interfaces/index";

import SupportTicket from "@features/supportTickets/models/supportTicket.model";

@injectable()
export class TicketResponseMiddleware implements ITicketResponseMiddleware {
  constructor(
    @inject(TYPES.SupportTicketManagementRepository)
    private supportTicketManagementRepository: ISupportTicketManagementRepository,
    @inject(TYPES.USER_MODEL) private userModel: Model<IUser>
  ) {}
  public validateRespondToTicket = catchAsync(
    async (
      req: Request<TicketParams, {}, TicketAdminResponseBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { message } = req.body;
      if (!message) {
        return next(new AppError("Message is required.", 400));
      }

      const ticket =
        await this.supportTicketManagementRepository.getSupportTicketById(
          req.params.ticketId
        );

      const ticketOwner: IUser | null = await this.userModel.findById(
        ticket.user
      );

      if (!ticketOwner) {
        return next(new AppError("User who own the ticket not exist.", 404));
      }

      req.body.ticketOwner = ticketOwner;

      const ticketResponseObject = req.body.ticketResponseObject || {};

      if (req.file && req.file.fieldname === "attachment") {
        const attachment = validateSupportTicketAttachments(req.file, req.user);
        req.body.attachment = attachment;
        ticketResponseObject.attachment = attachment;
      }
      req.body.ticket = ticket;
      ticketResponseObject.message = message;
      ticketResponseObject.responderId = req.user._id;
      ticketResponseObject.respondedAt = new Date();
      ticketResponseObject.escalationLevel = req.body.escalationLevel
        ? req.body.escalationLevel
        : 1;
      ticketResponseObject.internalNotes = req.body.internalNotes
        ? req.body.internalNotes
        : undefined;

      req.body.ticketResponseObject = ticketResponseObject;
      next();
    }
  );
}
