// packages imports
import { ObjectId } from "mongoose";
// interfaces imports
import { InteractionData } from "../index";

export interface IInteractionsRepository {
  /**
   * Creates a new interaction (like, dislike, etc.) on a blog post.
   * @param data - Interaction data including user, post, and type of interaction.
   * @returns The created interaction document.
   */
  createInteraction(data: InteractionData): Promise<void>;

  /**
   * Deletes a specific interaction by its ID.
   * @param interactionId - The ID of the interaction to delete.
   */
  deleteInteraction(interactionId: ObjectId): Promise<void>;

  /**
   * Updates a specific interaction (e.g., changing a like to a dislike).
   * @param interactionId - The ID of the interaction to update.
   * @param updateData - The new data to update the interaction with.
   * @returns The updated interaction document.
   */
  updateInteraction(interactionId: ObjectId, updateData: any): Promise<any>;

  /**
   * Retrieves all interactions for a given blog post.
   * @param blogPostId - The ID of the blog post.
   * @returns An array of interactions related to the blog post.
   */
  getInteractionsByBlogPost(blogPostId: ObjectId): Promise<any[]>;

  /**
   * Retrieves all interactions made by a specific user.
   * @param userId - The ID of the user.
   * @returns An array of interactions made by the user.
   */
  getInteractionsByUser(userId: ObjectId): Promise<any[]>;

  /**
   * Retrieves a single interaction for a user on a specific blog post.
   * This helps determine if the user has already interacted with a post.
   * @param userId - The ID of the user.
   * @param blogPostId - The ID of the blog post.
   * @returns The interaction document if it exists, otherwise null.
   */
  getUserInteractionWithBlogPost(
    userId: ObjectId,
    blogPostId: ObjectId
  ): Promise<any | null>;
}
