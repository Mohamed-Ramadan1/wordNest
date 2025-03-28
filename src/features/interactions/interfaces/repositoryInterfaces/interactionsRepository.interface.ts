// packages imports
import { ObjectId } from "mongoose";
// interfaces imports
import { IInteraction, InteractionData, InteractionType } from "../index";

import { ParsedQs } from "qs";

export interface IInteractionsRepository {
  /**
   * Retrieves a specific interaction by its ID.
   * @param interactionId - The ID of the interaction to retrieve.
   * @param userId - The ID of the user making the request.
   * @returns The interaction document if found, otherwise null.
   */
  getInteractionByIdAndUser(
    interactionId: ObjectId,
    userId: ObjectId
  ): Promise<IInteraction>;
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
  deleteInteraction(interactionId: ObjectId, userId: ObjectId): Promise<void>;

  /**
   * Updates a specific interaction (e.g., changing a like to a dislike).
   * @param interaction - The ID of the interaction to update.
   * @param interactionType - The new data to update the interaction with.
   * @returns void
   */
  updateInteractionType(
    interaction: IInteraction,
    interactionType: InteractionType
  ): Promise<void>;

  /**
   * Retrieves all interactions for a given blog post.
   * @param blogPostId - The ID of the blog post.
   * @returns An array of interactions related to the blog post.
   */
  getInteractionsByBlogPost(
    blogPostId: ObjectId,
    reqQuery: ParsedQs
  ): Promise<IInteraction[]>;

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
