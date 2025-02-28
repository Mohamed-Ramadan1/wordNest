// Packages imports
import { ObjectId } from "mongoose";
import { injectable } from "inversify";

// model imports
import { InteractionModel } from "../models/interactions.model";
// utils imports
import { APIFeatures, AppError } from "@utils/index";

// interfaces imports
import { IInteractionsService } from "../interfaces/interactionsService.interface";
import { IInteraction } from "../interfaces/interaction.interface";
import { InteractionData } from "../interfaces/interactionsRequest.interface";

@injectable()
export class InteractionsService implements IInteractionsService {
  private handleError(error: any): never {
    
    if (error instanceof AppError) throw error;
    throw new AppError(error.message || "An unexpected error occurred", 500);
  }
  /**
   * Handles interaction with a blog post, such as liking or disliking.
   */
  public async interactWithBlogPost(): Promise<void> {
    try {
      //  const interaction = await
    } catch (err: any) {
      if (err instanceof AppError) throw err;

      throw new AppError(err.message, 500);
    }
  }

  /**
   * Deletes the user's interaction with a blog post.
   */
  public async deleteMyInteractionWithBlogPost() {
    try {
    } catch (err: any) {
      if (err instanceof AppError) throw err;

      throw new AppError(err.message, 500);
    }
  }

  /**
   * Updates the user's interaction with a blog post.
   */
  public async updateMyInteractionWithBlogPost() {
    try {
    } catch (err: any) {
      if (err instanceof AppError) throw err;

      throw new AppError(err.message, 500);
    }
  }
  /**
   * Retrieves all interactions for a specific blog post.
   */
  public async getAllInteractionsWithBlogPost() {
    try {
    } catch (err: any) {
      if (err instanceof AppError) throw err;

      throw new AppError(err.message, 500);
    }
  }
}
