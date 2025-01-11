import { catchAsync } from "@utils/catchAsync";
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";
import { NextFunction, Request, Response } from "express";
import SupportTicket from "@features/supportTickets/models/supportTicket.model";
import { IUser } from "@features/users";
import {
  SupportTicketBody,
  SupportTicketParams,
} from "@features/supportTickets/interfaces/supportTicketBody.interface";
export class SupportTicketsMiddleware {
  static async validateCreateSupportTicket(
    req: Request<{}, {}, SupportTicketBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}
