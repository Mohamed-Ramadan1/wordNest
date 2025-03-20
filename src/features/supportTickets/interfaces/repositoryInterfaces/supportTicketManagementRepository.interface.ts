import { Request } from "express";
import { ObjectId } from "mongoose";
import {
  ISupportTicket,
  SupportTicketPriority,
  TicketResponseData,
  TicketBody,
} from "../index";

/**
 * @interface ISupportTicketManagementRepository
 * @description Interface for managing support tickets in the system.
 */
interface ISupportTicketManagementRepository {
  /**
   * @method getSupportTickets
   * @description Retrieves a list of support tickets based on query parameters.
   * @param {Request} req - The Express request object containing query parameters.
   * @returns {Promise<ISupportTicket[]>} A promise that resolves to an array of support tickets.
   * @throws {Error} If the retrieval of support tickets fails.
   */
  getSupportTickets(req: Request): Promise<ISupportTicket[]>;

  /**
   * @method getSupportTicketById
   * @description Retrieves a single support ticket by its ID.
   * @param {ObjectId} ticketId - The unique identifier of the support ticket.
   * @returns {Promise<ISupportTicket>} A promise that resolves to the support ticket.
   * @throws {Error} If the ticket is not found or retrieval fails.
   */
  getSupportTicketById(ticketId: ObjectId): Promise<ISupportTicket>;

  /**
   * @method createSupportTicket
   * @description Creates a new support ticket with the provided information.
   * @param {TicketBody} ticketInformation - The data required to create a new support ticket.
   * @returns {Promise<ISupportTicket>} A promise that resolves to the newly created support ticket.
   * @throws {Error} If the creation of the support ticket fails.
   */
  createSupportTicket(ticketInformation: TicketBody): Promise<ISupportTicket>;

  /**
   * @method updateSupportTicket
   * @description Updates an existing support ticket with the provided fields.
   * @param {ISupportTicket} ticket - The support ticket to update.
   * @param {{ category?: string; status?: string; priority?: string }} updateObject - The fields to update.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   * @throws {Error} If the update operation fails.
   */
  updateSupportTicket(
    ticket: ISupportTicket,
    updateObject: {
      category?: string;
      status?: string;
      priority?: string;
    }
  ): Promise<void>;

  /**
   * @method deleteSupportTicket
   * @description Deletes a support ticket from the system.
   * @param {ISupportTicket} ticket - The support ticket to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   * @throws {Error} If the deletion operation fails.
   */
  deleteSupportTicket(ticket: ISupportTicket): Promise<void>;

  /**
   * @method updateTicketPriority
   * @description Updates the priority of a support ticket.
   * @param {ISupportTicket} ticket - The support ticket to update.
   * @param {SupportTicketPriority} newPriority - The new priority level to set.
   * @returns {Promise<void>} A promise that resolves when the priority update is complete.
   * @throws {Error} If the priority update fails.
   */
  updateTicketPriority(
    ticket: ISupportTicket,
    newPriority: SupportTicketPriority
  ): Promise<void>;

  /**
   * @method saveAdminTicketResponse
   * @description Saves an admin response to a support ticket and updates its status to "In Progress".
   * @param {ISupportTicket} ticket - The support ticket to respond to.
   * @param {TicketResponseData} ticketResponseObject - The admin response data to save.
   * @returns {Promise<void>} A promise that resolves when the response is saved.
   * @throws {Error} If saving the admin response fails.
   */
  saveAdminTicketResponse(
    ticket: ISupportTicket,
    ticketResponseObject: TicketResponseData
  ): Promise<void>;

  /**
   * @method updateTicketStatusToClosed
   * @description Updates a support ticket's status to "Closed" and records resolution details.
   * @param {ISupportTicket} ticket - The support ticket to close.
   * @param {ObjectId} adminUserId - The ID of the admin resolving the ticket.
   * @returns {Promise<void>} A promise that resolves when the ticket is closed.
   * @throws {Error} If updating the ticket status to closed fails.
   */
  updateTicketStatusToClosed(
    ticket: ISupportTicket,
    adminUserId: ObjectId
  ): Promise<void>;

  /**
   * @method updateTicketStatusToReopened
   * @description Reopens a closed support ticket and updates its status to "Open".
   * @param {ISupportTicket} ticket - The support ticket to reopen.
   * @param {ObjectId} adminUserId - The ID of the admin reopening the ticket.
   * @returns {Promise<void>} A promise that resolves when the ticket is reopened.
   * @throws {Error} If updating the ticket status to reopened fails.
   */
  updateTicketStatusToReopened(
    ticket: ISupportTicket,
    adminUserId: ObjectId
  ): Promise<void>;
}

export { ISupportTicketManagementRepository };
