import { Schema, Model, model } from "mongoose";
import {
  ISupportTicket,
  SupportTicketCategory,
  SupportTicketPriority,
  SupportTicketStatus,
  Response,
  Attachment,
} from "../interfaces/supportTicket.interface";

const attachmentSchema: Schema = new Schema<Attachment>(
  {
    imageLink: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const responseSchema: Schema = new Schema<Response>(
  {
    responderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "response must have a responder"],
    },
    message: {
      type: String,
      required: [true, "response must have a message"],
      trim: true,
    },
    respondedAt: {
      type: Date,
      default: Date.now,
    },
    attachments: [attachmentSchema],
  },
  { _id: false }
);

const supportTicketSchema: Schema<ISupportTicket> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "support ticket must belong to a user"],
    },
    subject: {
      type: String,
      required: [true, "support ticket must have a subject"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "support ticket must have a description"],
      trim: true,
    },
    attachments: attachmentSchema,
    category: {
      type: String,
      enum: Object.values(SupportTicketCategory),
      required: [true, "support ticket must have a category"],
    },
    status: {
      type: String,
      enum: Object.values(SupportTicketStatus),
      default: SupportTicketStatus.OPEN,
    },
    priority: {
      type: String,
      enum: Object.values(SupportTicketPriority),
      default: SupportTicketPriority.LOW,
      required: [true, "support ticket must have a priority"],
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
    closedAt: {
      type: Date,
      default: null,
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    responses: [responseSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
supportTicketSchema.index({ user: 1 });
supportTicketSchema.index({ status: 1, priority: 1 });

// Create the model
const SupportTicket: Model<ISupportTicket> = model(
  "SupportTicket",
  supportTicketSchema
);

export default SupportTicket;
