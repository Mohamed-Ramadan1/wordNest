import { Schema, Model, model } from "mongoose";
import {
  ISupportTicket,
  SupportTicketCategory,
  SupportTicketPriority,
  SupportTicketStatus,
  UserResponse,
  AdminResponse,
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

const userResponseSchema: Schema = new Schema<UserResponse>(
  {
    responderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user response must belong to a user"],
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
    attachment: attachmentSchema,
    isFollowUp: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const adminResponseSchema: Schema = new Schema<AdminResponse>(
  {
    responderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "admin response must belong to an admin"],
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
    attachment: attachmentSchema,
    internalNotes: {
      type: String,
      trim: true,
    },
    escalationLevel: {
      type: Number,
      default: 1,
    },
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
    reopenedAt: {
      type: Date,
      default: null,
    },
    reopenedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    userResponses: [userResponseSchema],
    adminResponses: [adminResponseSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
supportTicketSchema.index({ user: 1 });
supportTicketSchema.index({ status: 1 });
supportTicketSchema.index({ priority: 1 });

// Create the model
const SupportTicket: Model<ISupportTicket> = model(
  "SupportTicket",
  supportTicketSchema
);

export default SupportTicket;
