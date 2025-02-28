// Interface imports
import { IInteractionsRepository } from "../interfaces/InteractionsRepository.interface";

// Models imports
import { InteractionModel } from "../models/interactions.model";

export class InteractionsRepository implements IInteractionsRepository {
  async createInteraction(data: any): Promise<any> {
    try {
      const interaction = new InteractionModel(data);
      return await interaction.save();
    } catch (error: any) {
      throw new Error(`Error creating interaction: ${error.message}`);
    }
  }

  async deleteInteraction(interactionId: string): Promise<void> {
    try {
      await InteractionModel.findByIdAndDelete(interactionId);
    } catch (error: any) {
      throw new Error(`Error deleting interaction: ${error.message}`);
    }
  }

  async updateInteraction(
    interactionId: string,
    updateData: any
  ): Promise<any> {
    try {
      return await InteractionModel.findByIdAndUpdate(
        interactionId,
        updateData,
        { new: true }
      );
    } catch (error: any) {
      throw new Error(`Error updating interaction: ${error.message}`);
    }
  }

  async getInteractionsByBlogPost(blogPostId: string): Promise<any[]> {
    try {
      return await InteractionModel.find({ blogPost: blogPostId });
    } catch (error: any) {
      throw new Error(
        `Error fetching interactions by blog post: ${error.message}`
      );
    }
  }

  async getInteractionsByUser(userId: string): Promise<any[]> {
    try {
      return await InteractionModel.find({ user: userId });
    } catch (error: any) {
      throw new Error(`Error fetching interactions by user: ${error.message}`);
    }
  }

  async getUserInteractionWithBlogPost(
    userId: string,
    blogPostId: string
  ): Promise<any | null> {
    try {
      return await InteractionModel.findOne({
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
