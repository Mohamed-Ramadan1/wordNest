import mongoose, { Schema } from "mongoose";
import { IContentReportingCollectionAnalytics } from "../interfaces";

const ContentReportingCollectionAnalyticsSchema =
  new Schema<IContentReportingCollectionAnalytics>({
    totalReports: { type: Number, required: true, default: 0 },
    totalArchivedReports: { type: Number, required: true, default: 0 },
    totalProcessedReports: { type: Number, required: true, default: 0 },

    reportsByStatus: { type: Map, of: Number, default: {} },
    reportsByType: { type: Map, of: Number, default: {} },
    reportsByResolutionType: { type: Map, of: Number, default: {} },

    reportsCreatedToday: { type: Number, default: 0 },
    reportsCreatedThisMonth: { type: Number, default: 0 },
    reportsProcessedToday: { type: Number, default: 0 },
    reportsProcessedThisMonth: { type: Number, default: 0 },
    reportsArchivedToday: { type: Number, default: 0 },
    reportsArchivedThisMonth: { type: Number, default: 0 },

    averageProcessingTimeHours: { type: Number, default: 0 },
    averageReportsPerBlog: { type: Number, default: 0 },
    averageReportsPerUser: { type: Number, default: 0 },

    mostReportedBlogs: { type: [String], default: [] },
    mostActiveReportingUsers: { type: [String], default: [] },
    mostActiveProcessingAdmins: { type: [String], default: [] },

    reportsWithProcessingNotes: { type: Number, default: 0 },

    mostCommonReportTypes: { type: [String], default: [] },
    mostCommonResolutionTypes: { type: [String], default: [] },

    lastCalculatedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

// Pre-save middleware to update updatedAt
ContentReportingCollectionAnalyticsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const ContentReportingCollectionAnalyticsModel =
  mongoose.model<IContentReportingCollectionAnalytics>(
    "ContentReportingCollectionAnalytics",
    ContentReportingCollectionAnalyticsSchema
  );

