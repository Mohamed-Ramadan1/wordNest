export interface IUsersCollectionAnalytics {
  // Total Metrics
  totalUsers: number;
  totalBlogsCreated: number; // Total blogs created by all users
  totalFollowers: number; // Sum of followers across all users
  totalFollowing: number; // Sum of users followed by all users
  totalComments?: number; // Total comments made by users (if tracked)

  // Status-Based Metrics
  totalActiveUsers: number; // Users with isActive: true
  totalVerifiedUsers: number; // Users with emailVerified: true
  totalLockedUsers: number; // Users with isAccountLocked: true
  totalBannedUsers: number; // Users with isAccountBanned: true
  totalUsersToBeDeleted: number; // Users with userAccountToBeDeleted: true
  usersByRole: { [key: string]: number }; // e.g., { User: 100, Admin: 5 }

  // Averages
  averageFollowersPerUser?: number;
  averageFollowingPerUser?: number;
  averageBlogsPerUser?: number; // Average blogs per user
  averageCommentsPerUser?: number; // Average comments per user (if tracked)

  // Temporal Metrics
  usersRegisteredToday?: number; // Users registered today (based on createdAt)
  usersRegisteredThisMonth?: number; // Users registered this month
  usersLoggedInToday?: number; // Users who logged in today (based on lastLoginAt)
  usersActiveThisMonth?: number; // Users with activity this month (login, blog, etc.)

  // Administrative Metrics
  emailVerificationRequestsToday?: number; // Email verification requests sent today
  emailVerificationRequestsThisMonth?: number; // Email verification requests this month
  passwordResetRequests?: number; // Total password reset requests
  accountDeletionRequests?: number; // Total account deletion requests
  emailChangeRequests?: number; // Total email change requests
  deactivationRequests?: number; // Total deactivation requests
  reactivationRequests?: number; // Total reactivation requests

  // Engagement Insights
  mostFollowedUsers?: string[]; // Array of user IDs or usernames (e.g., top 5 by followers)

  // Temporal Fields
  lastCalculatedAt?: Date; // When analytics were last updated
  createdAt?: Date; // When analytics record was created
  updatedAt?: Date; // When analytics record was last updated
}
