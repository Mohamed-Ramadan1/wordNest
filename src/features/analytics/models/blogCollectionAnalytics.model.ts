import mongoose, { Schema } from "mongoose";
import { IBlogsCollectionAnalytics } from "../interfaces";

const BlogsCollectionAnalyticsSchema = new Schema<IBlogsCollectionAnalytics>({
  totalBlogs: { type: Number, required: true, default: 0 },
  totalViews: { type: Number, required: true, default: 0 },
  totalShares: { type: Number, required: true, default: 0 },
  totalComments: { type: Number, required: true, default: 0 },
  totalInteractions: { type: Number, required: true, default: 0 },

  averageViewsPerBlog: { type: Number, default: 0 },
  averageSharesPerBlog: { type: Number, default: 0 },
  averageCommentsPerBlog: { type: Number, default: 0 },
  averageInteractionsPerBlog: { type: Number, default: 0 },

  blogsPublishedToday: { type: Number, default: 0 },
  blogsPublishedThisMonth: { type: Number, default: 0 },
  blogsArchived: { type: Number, default: 0 },
  blogsUnderReview: { type: Number, default: 0 },
  blogsPrivate: { type: Number, default: 0 },

  mostPopularTags: { type: [String], default: [] },
  mostPopularCategories: { type: [String], default: [] },

  lastCalculatedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to update `updatedAt` timestamp
BlogsCollectionAnalyticsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const BlogsCollectionAnalyticsModel =
  mongoose.model<IBlogsCollectionAnalytics>(
    "BlogsCollectionAnalytics",
    BlogsCollectionAnalyticsSchema
  );
