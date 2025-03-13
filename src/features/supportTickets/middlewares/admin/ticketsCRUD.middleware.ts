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
  TicketUPdateBody,
  TicketBody,
  TicketDeletionBody,
  SupportTicketPriority,
  ITicketCRUDMiddleware,
  ISupportTicketManagementRepository,
} from "../../interfaces/index";

@injectable()
export class TicketCRUDMiddleware implements ITicketCRUDMiddleware {
  constructor(
    @inject(TYPES.SupportTicketManagementRepository)
    private supportTicketManagementRepository: ISupportTicketManagementRepository,
    @inject(TYPES.USER_MODEL) private userModel: Model<IUser>
  ) {}
  // validate create support ticket
  public validateCreateTicket = catchAsync(
    async (
      req: Request<{}, {}, TicketBody>,
      res: Response,
      next: NextFunction
    ) => {
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
      const ticketOwner: IUser | null = await this.userModel.findOne({
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
      const ticketToDeleted =
        await this.supportTicketManagementRepository.getSupportTicketById(
          req.params.ticketId
        );

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
      const ticketToBeUpdated =
        await this.supportTicketManagementRepository.getSupportTicketById(
          req.params.ticketId
        );

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
