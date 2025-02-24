//express imports
import { Response, Request } from "express";

// interface imports

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

export class InteractionsAdminManagementController {
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
