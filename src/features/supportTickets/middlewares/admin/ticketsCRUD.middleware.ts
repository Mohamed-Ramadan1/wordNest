import { catchAsync } from "@utils/index";
import { Request, Response, NextFunction } from "express";
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";
import { TicketBody } from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";
import {
  SupportTicketCategory,
  SupportTicketPriority,
} from "@features/supportTickets/interfaces/supportTicket.interface";
import { validateSupportTicketAttachments } from "@features/supportTickets/helpers";

import { AppError } from "@utils/index";
import User from "@features/users/models/user.model";
import { IUser } from "@features/users";

export class TicketCRUDMiddleware {
  // validate create support ticket
  static validateCreateTicket = catchAsync(
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
      const ticketOwner: IUser | null = await User.findOne({
        email: userEmail,
      });
      if (!ticketOwner) {
        return next(
          new AppError("User you tray to create ticket for not exist.", 404)
        );
      }
      // validate attachments if provided
      if (req.file) {
        console.log(
          "-----------------------------------------------------------------------------------------------------------------------------"
        );
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
}
