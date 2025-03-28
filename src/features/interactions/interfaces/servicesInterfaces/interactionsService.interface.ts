import { InteractionData, IInteraction, InteractionType } from "../index";
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";
export interface IInteractionsService {
  /**
   * Handles interaction with a blog post, such as liking or disliking.
   */
  interactWithBlogPost(interactionInfo: InteractionData): Promise<void>;

  /**
   * Deletes the user's interaction with a blog post.
   */
  deleteMyInteractionWithBlogPost(
    interactionId: ObjectId,
    userId: ObjectId
  ): Promise<void>;

  /**
   * Updates the user's interaction with a blog post.
   */
  updateMyInteractionWithBlogPost(
    interaction: IInteraction,
    interactionType: InteractionType
  ): Promise<void>;

  /**
   * Retrieves all interactions for a specific blog post.
   */
  getAllInteractionsWithBlogPost(
    blogPostId: ObjectId,
    reqQuery: ParsedQs
  ): Promise<IInteraction[]>;
}
