// packages imports
import { inject, injectable } from "inversify";
import { Model, ObjectId } from "mongoose";

// shard imports
import { TYPES } from "@shared/index";

// Interface imports
import { IBlog } from "@features/blogs/interfaces";
import {
  IInteraction,
  IInteractionsRepository,
  InteractionData,
} from "../interfaces/index";

@injectable()
export class InteractionsRepository implements IInteractionsRepository {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.InteractionsModel)
    private readonly interactionModel: Model<IInteraction>
  ) {}
  async createInteraction(data: InteractionData): Promise<void> {
    try {
      await this.interactionModel.create(data);
    } catch (error: any) {
      throw new Error(`Error creating interaction: ${error.message}`);
    }
  }

  async deleteInteraction(interactionId: ObjectId): Promise<void> {
    try {
      await this.interactionModel.findByIdAndDelete(interactionId);
    } catch (error: any) {
      throw new Error(`Error deleting interaction: ${error.message}`);
    }
  }

  async updateInteraction(
    interactionId: ObjectId,
    updateData: any
  ): Promise<any> {
    try {
      return await this.interactionModel.findByIdAndUpdate(
        interactionId,
        updateData,
        { new: true }
      );
    } catch (error: any) {
      throw new Error(`Error updating interaction: ${error.message}`);
    }
  }

  async getInteractionsByBlogPost(blogPostId: ObjectId): Promise<any[]> {
    try {
      return await this.interactionModel.find({ blogPost: blogPostId });
    } catch (error: any) {
      throw new Error(
        `Error fetching interactions by blog post: ${error.message}`
      );
    }
  }

  async getInteractionsByUser(userId: ObjectId): Promise<any[]> {
    try {
      return await this.interactionModel.find({ user: userId });
    } catch (error: any) {
      throw new Error(`Error fetching interactions by user: ${error.message}`);
    }
  }

  async getUserInteractionWithBlogPost(
    userId: ObjectId,
    blogPostId: ObjectId
  ): Promise<any | null> {
    try {
      return await this.interactionModel.findOne({
        user: userId,
        blogPost: blogPostId,
      });
    } catch (error: any) {
      throw new Error(
        `Error fetching user interaction with blog post: ${error.message}`
      );
    }
  }
}
