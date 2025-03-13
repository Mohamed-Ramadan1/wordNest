// express imports
import { NextFunction, Request, Response } from "express";

// shard imports
import { catchAsync, AppError, TYPES, validateDto } from "@shared/index";

// packages imports
import { inject, injectable } from "inversify";

// users feature interfaces imports
import { IUser, UserModel } from "@features/users";

// helpers imports
import { validateSupportTicketAttachments } from "../../helpers/index";

// interfaces imports
import {
  TicketParams,
  ISupportTicket,
  TicketUPdateBody,
  TicketBody,
  TicketDeletionBody,
  SupportTicketPriority,
  ITicketCRUDMiddleware,
} from "../../interfaces/index";

import SupportTicket from "@features/supportTickets/models/supportTicket.model";

@injectable()
export class TicketCRUDMiddleware implements ITicketCRUDMiddleware {
  // validate create support ticket
  public validateCreateTicket = catchAsync(
    async (
      req: Request<{}, {}, TicketBody>,
      res: Response,
      next: NextFunction
    ) => {
      console.log(req.file);

      const { subject, description, category, userEmail } = req.body;

      // validate required fields
      if (!subject || !description || !category || !userEmail) {
        return next(
          new AppError(
            "Subject, description, category, and ticket owner email are required",
            400
          )
        );
      }

      // validate user existence
      const ticketOwner: IUser | null = await UserModel.findOne({
        email: userEmail,
      });
      if (!ticketOwner) {
        return next(
          new AppError("User you tray to create ticket for not exist.", 404)
        );
      }
      // validate attachments if provided
      if (req.file) {
        const attachment = validateSupportTicketAttachments(
          req.file,
          ticketOwner
        );
        req.body.attachment = attachment;
      }
      req.body.user = ticketOwner;
      if (!req.body.priority) {
        req.body.priority = SupportTicketPriority.LOW;
      }
      next();
    }
  );

  // validate delete support ticket
  public validateDeleteTicket = catchAsync(
    async (
      req: Request<TicketParams, {}, TicketDeletionBody>,
      res: Response,
      next: NextFunction
    ) => {
      const ticketToDeleted: ISupportTicket | null =
        await SupportTicket.findById(req.params.ticketId);
      if (!ticketToDeleted) {
        return next(
          new AppError(
            `No support ticket found with this id:${req.params.ticketId} `,
            404
          )
        );
      }

      req.body.ticketToBeDeleted = ticketToDeleted;
      next();
    }
  );

  // validate update support ticket
  public validateUpdateTicket = catchAsync(
    async (
      req: Request<TicketParams, {}, TicketUPdateBody>,
      res: Response,
      next: NextFunction
    ) => {
      const ticketToBeUpdated: ISupportTicket | null =
        await SupportTicket.findById(req.params.ticketId);
      if (!ticketToBeUpdated) {
        return next(
          new AppError(
            `No support ticket found with this id:${req.params.ticketId} `,
            404
          )
        );
      }
      req.body.updateTicketObject = {};
      if (req.body.category) {
        req.body.updateTicketObject.category = req.body.category;
      }
      if (req.body.status) {
        req.body.updateTicketObject.status = req.body.status;
      }
      if (req.body.priority) {
        req.body.updateTicketObject.priority = req.body.priority;
      }
      req.body.ticketToUpdate = ticketToBeUpdated;

      next();
    }
  );
}
