import mongoose, { Schema } from "mongoose";
import { IUsersCollectionAnalytics } from "../interfaces";

const UsersCollectionAnalyticsSchema = new Schema<IUsersCollectionAnalytics>({
  totalUsers: { type: Number, required: true, default: 0 },
  totalBlogsCreated: { type: Number, required: true, default: 0 },
  totalFollowers: { type: Number, required: true, default: 0 },
  totalFollowing: { type: Number, required: true, default: 0 },
  totalComments: { type: Number, default: 0 },

  totalActiveUsers: { type: Number, required: true, default: 0 },
  totalVerifiedUsers: { type: Number, required: true, default: 0 },
  totalLockedUsers: { type: Number, required: true, default: 0 },
  totalBannedUsers: { type: Number, required: true, default: 0 },
  totalUsersToBeDeleted: { type: Number, required: true, default: 0 },
  usersByRole: { type: Map, of: Number, default: {} },

  averageFollowersPerUser: { type: Number, default: 0 },
  averageFollowingPerUser: { type: Number, default: 0 },
  averageBlogsPerUser: { type: Number, default: 0 },
  averageCommentsPerUser: { type: Number, default: 0 },

  usersRegisteredToday: { type: Number, default: 0 },
  usersRegisteredThisMonth: { type: Number, default: 0 },
  usersLoggedInToday: { type: Number, default: 0 },
  usersActiveThisMonth: { type: Number, default: 0 },

  emailVerificationRequestsToday: { type: Number, default: 0 },
  emailVerificationRequestsThisMonth: { type: Number, default: 0 },
  passwordResetRequests: { type: Number, default: 0 },
  accountDeletionRequests: { type: Number, default: 0 },
  emailChangeRequests: { type: Number, default: 0 },
  deactivationRequests: { type: Number, default: 0 },
  reactivationRequests: { type: Number, default: 0 },

  mostFollowedUsers: { type: [String], default: [] },

  lastCalculatedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to update updatedAt
UsersCollectionAnalyticsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const UsersCollectionAnalyticsModel =
  mongoose.model<IUsersCollectionAnalytics>(
    "UsersCollectionAnalytics",
    UsersCollectionAnalyticsSchema
  );
