// mongoose imports
import { Schema, Model, model } from "mongoose";

// interfaces imports
import {
  IContentReporting,
  ContentReportingStatus,
  ContentReportingType,
  ResolutionType,
} from "../interfaces/index";
import path from "path";

const contentReportingSchema: Schema = new Schema<IContentReporting>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ContentReportingType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ContentReportingStatus),
      default: ContentReportingStatus.PENDING,
    },
    details: {
      type: String,
      required: true,
    },
    processedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    processedAt: {
      type: Date,
    },
    processedNotes: {
      type: String,
    },
    resolutionType: {
      type: String,
      enum: Object.values(ResolutionType),
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// populate the content when find
contentReportingSchema.pre<IContentReporting>(/^find/, function (next) {
  this.populate({
    path: "content",
    select: "-__v -createdAt -updatedAt",
  });
  next();
});

const ContentReportingModel: Model<IContentReporting> =
  model<IContentReporting>("ContentReporting", contentReportingSchema);

// Exporting the model
export default ContentReportingModel;
