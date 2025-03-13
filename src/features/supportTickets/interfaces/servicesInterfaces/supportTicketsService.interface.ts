import { IUser } from "@features/users";
import {
  ISupportTicket,
  SupportTicketBody,
  SupportTicketBodyReplay,
} from "../index";

import { ObjectId } from "mongoose";
/**
 * Interface for the SupportTicketService class.
 * Provides methods to manage user support tickets.
 */
export interface ISupportTicketService {
  /**
   * Creates a new support ticket.
   * @param ticketInfo - Information about the support ticket.
   * @param user - The user creating the ticket.
   * @param ipAddress - The IP address from which the request originated.
   * @throws {AppError} - Throws an error if ticket creation fails.
   */
  createSupportTicket(
    ticketInfo: SupportTicketBody,
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void>;

  /**
   * Retrieves all support tickets for a specific user.
   * @param user - The user whose support tickets are being retrieved.
   * @returns {Promise<ISupportTicket[]>} - List of support tickets.
   * @throws {AppError} - Throws an error if retrieval fails.
   */
  getAllUserSupportTickets(user: IUser): Promise<ISupportTicket[]>;

  /**
   * Retrieves a specific support ticket by ID.
   * @param user - The user requesting the ticket.
   * @param ticketId - The ID of the support ticket.
   * @returns {Promise<ISupportTicket>} - The requested support ticket.
   * @throws {AppError} - Throws an error if the ticket is not found or retrieval fails.
   */
  getSupportTicketById(
    user: IUser,
    ticketId: ObjectId
  ): Promise<ISupportTicket>;

  /**
   * Allows a user to reply to a support ticket.
   * @param user - The user responding to the ticket.
   * @param supportTicket - The support ticket being updated.
   * @param responseInfo - The response details, including message and optional attachments.
   * @param ipAddress - The IP address from which the request originated.
   * @throws {AppError} - Throws an error if the reply fails.
   */
  replaySupportTicket(
    user: IUser,
    supportTicket: ISupportTicket,
    responseInfo: SupportTicketBodyReplay,
    ipAddress: string | undefined
  ): Promise<void>;
}
