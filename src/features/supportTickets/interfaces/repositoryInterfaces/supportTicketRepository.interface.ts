import { Request } from "express";
import { ObjectId } from "mongoose";
import {
  ISupportTicket,
  SupportTicketBody,
  SupportTicketBodyReplay,
} from "../index";

/**
 * Interface representing the structure and behavior of the SupportTicketRepository.
 * This defines methods for creating, retrieving, and updating support tickets.
 *
 * @interface ISupportTicketRepository
 */
export interface ISupportTicketRepository {
  /**
   * Creates a new support ticket for a given user.
   *
   * @async
   * @method createSupportTicket
   * @param {SupportTicketBody} ticketInfo - The details of the support ticket to be created.
   * @param {ObjectId} userId - The ID of the user creating the support ticket.
   * @returns {Promise<ISupportTicket>} A promise that resolves to the newly created support ticket.
   * @throws {Error} If the support ticket creation fails.
   * @example
   * const ticket = await supportTicketRepository.createSupportTicket(
   *   { title: "Issue", message: "Problem with login" },
   *   userId
   * );
   */
  createSupportTicket(
    ticketInfo: SupportTicketBody,
    userId: ObjectId
  ): Promise<ISupportTicket>;

  /**
   * Retrieves all support tickets associated with a specific user, with optional filtering,
   * sorting, and pagination based on the request query.
   *
   * @async
   * @method getUserSupportTickets
   * @param {ObjectId} userId - The ID of the user whose support tickets are to be retrieved.
   * @param {Request} req - The Express request object containing query parameters for filtering, sorting, etc.
   * @returns {Promise<ISupportTicket[]>} A promise that resolves to an array of the user's support tickets.
   * @throws {Error} If fetching the support tickets fails.
   * @example
   * const tickets = await supportTicketRepository.getUserSupportTickets(userId, req);
   */
  getUserSupportTickets(
    userId: ObjectId,
    req: Request
  ): Promise<ISupportTicket[]>;

  /**
   * Retrieves a single support ticket by its ID.
   *
   * @async
   * @method getUserSupportTicket
   * @param {ObjectId} ticketId - The ID of the support ticket to retrieve.
   * @returns {Promise<ISupportTicket>} A promise that resolves to the requested support ticket.
   * @throws {Error} If the support ticket is not found or retrieval fails.
   * @example
   * const ticket = await supportTicketRepository.getUserSupportTicket(ticketId);
   */
  getUserSupportTicket(
    ticketId: ObjectId,
    userId: ObjectId
  ): Promise<ISupportTicket>;

  /**
   * Adds a reply to an existing support ticket and saves the updated ticket.
   *
   * @async
   * @method saveSupportTicketReplay
   * @param {ISupportTicket} ticket - The support ticket to which the reply will be added.
   * @param {SupportTicketBodyReplay} responseInfo - The details of the reply (message, attachment, etc.).
   * @param {ObjectId} userId - The ID of the user responding to the ticket.
   * @returns {Promise<ISupportTicket>} A promise that resolves to the updated support ticket.
   * @throws {Error} If saving the reply fails.
   * @example
   * const updatedTicket = await supportTicketRepository.saveSupportTicketReplay(
   *   ticket,
   *   { message: "Issue resolved", attachment: null },
   *   userId
   * );
   */
  saveSupportTicketReplay(
    ticket: ISupportTicket,
    responseInfo: SupportTicketBodyReplay,
    userId: ObjectId
  ): Promise<ISupportTicket>;
}
