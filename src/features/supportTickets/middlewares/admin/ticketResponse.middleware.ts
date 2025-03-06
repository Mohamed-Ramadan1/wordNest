import { catchAsync } from "@shared/utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/utils/appError";
import {
  TicketAdminResponseBody,
  TicketParams,
} from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";
import { IUser, UserModel } from "@features/users";
import { validateSupportTicketAttachments } from "@features/supportTickets/helpers";
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";
import SupportTicket from "@features/supportTickets/models/supportTicket.model";

export class TicketResponseMiddleware {
  static validateRespondToTicket = catchAsync(
    async (
      req: Request<TicketParams, {}, TicketAdminResponseBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { message } = req.body;
      if (!message) {
        return next(new AppError("Message is required.", 400));
      }

      const ticket: ISupportTicket | null = await SupportTicket.findById(
        req.params.ticketId
      );

      if (!ticket) {
        return next(
          new AppError("Ticket you tray to response for not found .", 404)
        );
      }

      const ticketOwner: IUser | null = await UserModel.findById(ticket.user);

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
