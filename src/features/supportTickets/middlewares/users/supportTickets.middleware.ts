import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@utils/appError";
import { SupportTicketBody } from "@features/supportTickets/interfaces/supportTicketBody.interface";

import { validateSupportTicketAttachments } from "@features/supportTickets/helpers";

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
}
