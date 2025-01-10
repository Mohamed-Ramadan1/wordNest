import { catchAsync } from "@utils/catchAsync";
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";
import { NextFunction, Request, Response } from "express";
import SupportTicket from "@features/supportTickets/models/supportTicket.model";
import { IUser } from "@features/users";

export class SupportTicketsMiddleware {}
