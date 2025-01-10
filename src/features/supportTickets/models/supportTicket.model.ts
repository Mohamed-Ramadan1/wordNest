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
    filename: {
      type: String,
      required: [true, "Attachment file must have  name "],
    },
    path: { type: String, required: true },
    mimeType: {
      type: String,
      validate: {
        validator: (v: string) => /^(image|application\/pdf)/.test(v),
        message: "Attachment must be an image or PDF",
      },
      required: [true, "Attachment file type must to be known"],
    },
    size: {
      type: Number,
      required: [true, "attachment file size must to be known with max 1MB"],
      max: 1000000,
    }, // 1MB
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Attachment must known the uploader of it."],
    },
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
    attachments: [attachmentSchema],
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
      required: [true, "resolved ticket must have a resolver"],
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
