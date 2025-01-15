import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@utils/appError";
import {
  SupportTicketBody,
  SupportTicketBodyReplay,
  SupportTicketParams,
} from "@features/supportTickets/interfaces/supportTicketBody.interface";

import { validateSupportTicketAttachments } from "@features/supportTickets/helpers";
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";
import SupportTicket from "@features/supportTickets/models/supportTicket.model";
export class SupportTicketsMiddleware {
  static validateCreateSupportTicket = catchAsync(
    async (
      req: Request<{}, {}, SupportTicketBody>,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { subject, description, category } = req.body;

      // check if the required fields are present
      if (!subject || !description || !category) {
        // CREATE THE MESSAGE ERROR
        return next(
          new AppError("Subject, description and category are required", 400)
        );
      }

      if (req.file) {
        const attachment = validateSupportTicketAttachments(req.file, req.user);
        req.body.attachments = attachment;
      }

      next();
    }
  );

  static validateReplaySupportTicket = catchAsync(
    async (
      req: Request<SupportTicketParams, {}, SupportTicketBodyReplay>,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { message } = req.body;

      // check if the required fields are present
      if (!message) {
        // CREATE THE MESSAGE ERROR
        return next(new AppError("Message is required", 400));
      }

      const userSupportTicket: ISupportTicket | null =
        await SupportTicket.findOne({
          _id: req.params.ticketId,
          user: req.user._id,
        });

      if (!userSupportTicket) {
        return next(
          new AppError(
            "Support ticket not found with given id and related to this user.",
            404
          )
        );
      }

      if (req.file) {
        const attachment = validateSupportTicketAttachments(req.file, req.user);
        req.body.attachment = attachment;
      }
      req.body.responderId = req.user._id;
      req.body.respondedAt = new Date();
      req.body.supportTicket = userSupportTicket;
      next();
    }
  );
}
