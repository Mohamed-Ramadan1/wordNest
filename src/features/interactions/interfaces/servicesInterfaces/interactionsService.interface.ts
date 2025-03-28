import { InteractionData } from "../index";
import {ObjectId} from "mongoose";

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
  updateMyInteractionWithBlogPost(): Promise<void>;

  /**
   * Retrieves all interactions for a specific blog post.
   */
  getAllInteractionsWithBlogPost(): Promise<void>;
}
