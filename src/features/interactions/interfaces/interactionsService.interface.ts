import { InteractionData } from "../interfaces/interactionsRequest.interface";

export interface IInteractionsService {
  /**
   * Handles interaction with a blog post, such as liking or disliking.
   */
  interactWithBlogPost(interactionData: InteractionData): Promise<void>;

  /**
   * Deletes the user's interaction with a blog post.
   */
  deleteMyInteractionWithBlogPost(): Promise<void>;

  /**
   * Updates the user's interaction with a blog post.
   */
  updateMyInteractionWithBlogPost(): Promise<void>;

  /**
   * Retrieves all interactions for a specific blog post.
   */
  getAllInteractionsWithBlogPost(): Promise<void>;
}
