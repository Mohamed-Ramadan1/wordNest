// packages imports
import { Request } from "express";
import { inject, injectable } from "inversify";
import { Model, ObjectId, Query } from "mongoose";
import { ParsedQs } from "qs";

import {
  ISupportTicket,
  SupportTicketBodyReplay,
  SupportTicketBody,
  ISupportTicketRepository,
} from "../interfaces";

import { APIFeaturesInterface, TYPES } from "@shared/index";
@injectable()
export class SupportTicketRepository implements ISupportTicketRepository {
  constructor(
    @inject(TYPES.SupportTicketModel)
    private readonly supportTicketModel: Model<ISupportTicket>,
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<ISupportTicket[], ISupportTicket>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<ISupportTicket>
  ) {}

  public async createSupportTicket(
    ticketInfo: SupportTicketBody,
    userId: ObjectId
  ): Promise<ISupportTicket> {
    try {
      const newSupportTicket: ISupportTicket | null =
        await this.supportTicketModel.create({
          ...ticketInfo,
          user: userId,
        });
      if (!newSupportTicket) {
        throw new Error("Failed to create support ticket.");
      }
      return newSupportTicket;
    } catch (err: any) {
      throw new Error(`Failed to create support ticket: ${err.message}`);
    }
  }

  public async getUserSupportTickets(
    userId: ObjectId,
    req: Request
  ): Promise<ISupportTicket[]> {
    try {
      const features = this.apiFeatures(
        this.supportTicketModel.find({
          user: userId,
        }),
        req.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const supportTickets: ISupportTicket[] = await features.execute();
      return supportTickets;
    } catch (err: any) {
      throw new Error(`Failed to get user support tickets: ${err.message}`);
    }
  }

  public async getUserSupportTicket(
    ticketId: ObjectId,
    userId: ObjectId
  ): Promise<ISupportTicket> {
    try {
      const supportTicket: ISupportTicket | null =
        await this.supportTicketModel.findOne({ _id: ticketId, user: userId });
      if (!supportTicket) {
        throw new Error("Support ticket not found with given id.");
      }
      return supportTicket;
    } catch (err: any) {
      throw new Error(`Failed to get user support ticket: ${err.message}`);
    }
  }

  public async saveSupportTicketReplay(
    ticket: ISupportTicket,
    responseInfo: SupportTicketBodyReplay,
    userId: ObjectId
  ): Promise<ISupportTicket> {
    try {
      // Update the support ticket with the new response.
      ticket.userResponses.push({
        message: responseInfo.message,
        responderId: userId,
        respondedAt: new Date(),
        attachment: responseInfo.attachment,
      });
      const updatedTicket: ISupportTicket = await ticket.save();
      return updatedTicket;
    } catch (err: any) {
      throw new Error(`Failed to save support ticket replay: ${err.message}`);
    }
  }
}
