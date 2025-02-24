// Packages imports
import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import Redis from "ioredis";
// model imports

// utils imports
import { APIFeatures, AppError } from "@utils/index";

import { IUser } from "@features/users";

export class InteractionsService {
  /**
   * Handles interaction with a blog post, such as liking or disliking.
   */
  public async interactWithBlogPost() {
    // Implement logic
  }

  /**
   * Deletes the user's interaction with a blog post.
   */
  public async deleteMyInteractionWithBlogPost() {
    // Implement logic
  }

  /**
   * Updates the user's interaction with a blog post.
   */
  public async updateMyInteractionWithBlogPost() {
    // Implement logic
  }

  /**
   * Retrieves all interactions for a specific blog post.
   */
  public async getAllInteractionsWithBlogPost() {
    // Implement logic
  }
}
