// packages imports
import { Request } from "express";
import { inject, injectable } from "inversify";
import { Model, ObjectId, Query } from "mongoose";
import { ParsedQs } from "qs";

import {
  ISupportTicket,
  SupportTicketPriority,
  SupportTicketStatus,
  TicketResponseData,
  TicketBody,
  ISupportTicketManagementRepository,
} from "../interfaces";

import { APIFeaturesInterface, TYPES } from "@shared/index";

@injectable()
export class SupportTicketManagementRepository
  implements ISupportTicketManagementRepository
{
  constructor(
    @inject(TYPES.SupportTicketModel)
    private readonly supportTicketModel: Model<ISupportTicket>,
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<ISupportTicket[], ISupportTicket>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<ISupportTicket>
  ) {}

  public async getSupportTickets(req: Request): Promise<ISupportTicket[]> {
    try {
      const features = this.apiFeatures(
        this.supportTicketModel.find(),
        req.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const supportTickets: ISupportTicket[] = await features.execute();
      return supportTickets;
    } catch (err: any) {
      throw new Error(`Failed to get support tickets: ${err.message}`);
    }
  }

  public async getSupportTicketById(
    ticketId: ObjectId
  ): Promise<ISupportTicket> {
    try {
      const ticket: ISupportTicket | null =
        await this.supportTicketModel.findById(ticketId);
      if (!ticket) {
        throw new Error("Ticket not found with given id.");
      }
      return ticket;
    } catch (err: any) {
      throw new Error(`Failed to get ticket by ID: ${err.message}`);
    }
  }

  public async createSupportTicket(
    ticketInformation: TicketBody
  ): Promise<ISupportTicket> {
    try {
      const newTicket: ISupportTicket = await this.supportTicketModel.create({
        ...ticketInformation,
        attachments: ticketInformation.attachment,
      });
      if (!newTicket) {
        throw new Error("Failed to create supportTicket.");
      }
      return newTicket;
    } catch (err: any) {
      throw new Error(`Failed to create ticket: ${err.message}`);
    }
  }

  public async updateSupportTicket(
    ticket: ISupportTicket,
    updateObject: {
      category?: string;
      status?: string;
      priority?: string;
    }
  ): Promise<void> {
    try {
      const updateFields = Object.fromEntries(
        Object.entries(updateObject).filter(([_, value]) => value !== undefined)
      );
      ticket.set(updateFields);
      await ticket.save();
    } catch (err: any) {
      throw new Error(`Failed to update ticket: ${err.message}`);
    }
  }

  public async deleteSupportTicket(ticket: ISupportTicket): Promise<void> {
    try {
      await this.supportTicketModel.deleteOne({
        _id: ticket._id,
      });
    } catch (err: any) {
      throw new Error(`Failed to delete ticket: ${err.message}`);
    }
  }

  public async updateTicketPriority(
    ticket: ISupportTicket,
    newPriority: SupportTicketPriority
  ): Promise<void> {
    try {
      ticket.priority = newPriority;
      await ticket.save();
    } catch (err: any) {
      throw new Error(`Failed to update ticket priority: ${err.message}`);
    }
  }

  public async saveAdminTicketResponse(
    ticket: ISupportTicket,
    ticketResponseObject: TicketResponseData
  ): Promise<void> {
    try {
      ticket.adminResponses.push(ticketResponseObject);
      ticket.status = SupportTicketStatus.IN_PROGRESS;
      await ticket.save();
    } catch (err: any) {
      throw new Error(`Failed to save admin ticket response: ${err.message}`);
    }
  }

  public async updateTicketStatusToClosed(
    ticket: ISupportTicket,
    adminUserId: ObjectId
  ): Promise<void> {
    try {
      ticket.status = SupportTicketStatus.CLOSED;
      ticket.resolvedAt = new Date();
      ticket.resolvedBy = adminUserId;
      ticket.closedAt = new Date();
      await ticket.save();
    } catch (err: any) {
      throw new Error(
        `Failed to update ticket status to closed: ${err.message}`
      );
    }
  }

  public async updateTicketStatusToReopened(
    ticket: ISupportTicket,
    adminUserId: ObjectId
  ): Promise<void> {
    try {
      ticket.status = SupportTicketStatus.OPEN;
      ticket.reopenedAt = new Date();
      ticket.reopenedBy = adminUserId;
      await ticket.save();
    } catch (err: any) {}
  }
}
