import { ObjectId } from "mongoose";
import { InteractionType } from "./interaction.interface";

export interface InteractionData {
  type: InteractionType;
  user: ObjectId;
  blogPost: ObjectId;
  interactedAt?: Date;
}

export interface CreateInteractionRequestBody {
  interactionType: InteractionType;
  blogPostId: ObjectId;
  newInteractionData: InteractionData;
}

export interface InteractionsRequestParams {
  interactionId: ObjectId;
}
