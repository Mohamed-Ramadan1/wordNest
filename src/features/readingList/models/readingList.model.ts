import { Schema, Model, model } from "mongoose";
import {
  IReadingList,
  ReadingStatus,
} from "../interfaces/readingList.interface";

const readingListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  blogPost: { type: Schema.Types.ObjectId, ref: "Blog" },
  status: {
    type: String,
    enum: Object.values(ReadingStatus),
    default: ReadingStatus.UNREAD,
  },
  autoRemove: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now },
  lastInteractedAt: { type: Date },
  completedAt: { type: Date },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// indexes
readingListSchema.index({ user: 1, blogPost: 1 }, { unique: true }); // Prevent duplicate entries
readingListSchema.index({ user: 1, addedAt: -1 }); // Optimize queries fetching a user's reading list sorted by newest first
readingListSchema.index({ user: 1, status: 1 }); // Optimize queries filtering by user and status

readingListSchema.pre<IReadingList>(/^find/, function (next) {
  this.populate({ path: "blogPost" });
  next();
});

export const ReadingListModel: Model<IReadingList> = model<IReadingList>(
  "ReadingList",
  readingListSchema
);
