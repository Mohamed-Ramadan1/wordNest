import { Schema, model } from "mongoose";
import {
  IInteraction,
  InteractionType,
} from "../interfaces/interaction.interface";

// Define interaction schema
const interactionSchema = new Schema<IInteraction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(InteractionType),
      required: true,
    },
    interactedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// indexes
interactionSchema.index({ user: 1, blogPost: 1 }, { unique: true });
interactionSchema.index({ blogPost: 1 });

// pre find populated
interactionSchema.pre<IInteraction>(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});
// Create interaction model
export const InteractionModel = model<IInteraction>(
  "Interaction",
  interactionSchema
);
