// Packages imports
import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import Redis from "ioredis";
// model imports

// utils imports
import { APIFeatures, AppError } from "@utils/index";

import { IUser } from "@features/users";

export class InteractionsAdminManagementService {
  /**
   * Retrieves all interactions for a specific blog post.
   */
  public async getInteractionsForBlogPost() {
    // Implement logic
  }

  /**
   * Retrieves a specific interaction on a blog post.
   */
  public async getInteractionOnBlogPost() {
    // Implement logic
  }

  /**
   * Deletes a specific interaction on a blog post.
   */
  public async deleteInteractionOnBlogPost() {
    // Implement logic
  }
}
