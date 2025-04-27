// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

// shared imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import {
  IAnalyticsRepository,
  IBlogsCollectionAnalytics,
  IUsersCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
} from "../interfaces";

// other features imports
import { IUser } from "@features/users";
import { ISupportTicket } from "@features/supportTickets/interfaces";
import { IBlog } from "@features/blogs/interfaces";
import { IContentReporting } from "@features/contentReporting/interfaces";

@injectable()
export class AnalyticsRepository implements IAnalyticsRepository {
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils,
    @inject(TYPES.USER_MODEL) private readonly userModel: Model<IUser>,
    @inject(TYPES.SupportTicketModel)
    private readonly supportTicketModel: Model<ISupportTicket>,
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.ContentReportingModel)
    private readonly contentReportingModel: Model<IContentReporting>,
    @inject(TYPES.BlogCollectionAnalyticsModel)
    private readonly blogsCollectionAnalyticsModel: Model<IBlogsCollectionAnalytics>,
    @inject(TYPES.UserCollectionAnalyticsModel)
    private readonly usersCollectionAnalyticsModel: Model<IUsersCollectionAnalytics>,
    @inject(TYPES.SupportTicketCollectionAnalyticsModel)
    private readonly supportTicketsCollectionAnalyticsModel: Model<ISupportTicketsCollectionAnalytics>,
    @inject(TYPES.ContentReportingCollectionAnalyticsModel)
    private readonly contentReportingCollectionAnalyticsModel: Model<IContentReportingCollectionAnalytics>
  ) {}

  public async getBlogsAnalytics(): Promise<IBlogsCollectionAnalytics> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const aggregation = await this.blogModel.aggregate([
        {
          $facet: {
            totalBlogs: [{ $count: "count" }],
            totalViews: [{ $group: { _id: null, total: { $sum: "$views" } } }],
            totalShares: [
              { $group: { _id: null, total: { $sum: "$shares" } } },
            ],
            totalComments: [
              { $group: { _id: null, total: { $sum: "$commentsCount" } } },
            ],
            totalInteractions: [
              {
                $group: {
                  _id: null,
                  total: {
                    $sum: { $add: ["$views", "$shares", "$commentsCount"] },
                  },
                },
              },
            ],
            blogsPublishedToday: [
              { $match: { createdAt: { $gte: today } } },
              { $count: "count" },
            ],
            blogsPublishedThisMonth: [
              { $match: { createdAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            blogsArchived: [
              { $match: { isArchived: true } },
              { $count: "count" },
            ],
            blogsUnderReview: [
              { $match: { status: "UNDER_REVIEW" } },
              { $count: "count" },
            ],
            blogsPrivate: [
              { $match: { isPrivate: true } },
              { $count: "count" },
            ],
            mostPopularTags: [
              { $unwind: "$tags" },
              { $group: { _id: "$tags", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              { $group: { _id: null, tags: { $push: "$_id" } } },
            ],
            mostPopularCategories: [
              { $unwind: "$categories" },
              { $group: { _id: "$categories", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              { $group: { _id: null, categories: { $push: "$_id" } } },
            ],
          },
        },
        {
          $project: {
            totalBlogs: { $arrayElemAt: ["$totalBlogs.count", 0] },
            totalViews: { $arrayElemAt: ["$totalViews.total", 0] },
            totalShares: { $arrayElemAt: ["$totalShares.total", 0] },
            totalComments: { $arrayElemAt: ["$totalComments.total", 0] },
            totalInteractions: {
              $arrayElemAt: ["$totalInteractions.total", 0],
            },
            blogsPublishedToday: {
              $arrayElemAt: ["$blogsPublishedToday.count", 0],
            },
            blogsPublishedThisMonth: {
              $arrayElemAt: ["$blogsPublishedThisMonth.count", 0],
            },
            blogsArchived: { $arrayElemAt: ["$blogsArchived.count", 0] },
            blogsUnderReview: { $arrayElemAt: ["$blogsUnderReview.count", 0] },
            blogsPrivate: { $arrayElemAt: ["$blogsPrivate.count", 0] },
            mostPopularTags: { $arrayElemAt: ["$mostPopularTags.tags", 0] },
            mostPopularCategories: {
              $arrayElemAt: ["$mostPopularCategories.categories", 0],
            },
            averageViewsPerBlog: {
              $cond: [
                { $gt: [{ $arrayElemAt: ["$totalBlogs.count", 0] }, 0] },
                {
                  $divide: [
                    { $arrayElemAt: ["$totalViews.total", 0] },
                    { $arrayElemAt: ["$totalBlogs.count", 0] },
                  ],
                },
                0,
              ],
            },
            averageSharesPerBlog: {
              $cond: [
                { $gt: [{ $arrayElemAt: ["$totalBlogs.count", 0] }, 0] },
                {
                  $divide: [
                    { $arrayElemAt: ["$totalShares.total", 0] },
                    { $arrayElemAt: ["$totalBlogs.count", 0] },
                  ],
                },
                0,
              ],
            },
            averageCommentsPerBlog: {
              $cond: [
                { $gt: [{ $arrayElemAt: ["$totalBlogs.count", 0] }, 0] },
                {
                  $divide: [
                    { $arrayElemAt: ["$totalComments.total", 0] },
                    { $arrayElemAt: ["$totalBlogs.count", 0] },
                  ],
                },
                0,
              ],
            },
            averageInteractionsPerBlog: {
              $cond: [
                { $gt: [{ $arrayElemAt: ["$totalBlogs.count", 0] }, 0] },
                {
                  $divide: [
                    { $arrayElemAt: ["$totalInteractions.total", 0] },
                    { $arrayElemAt: ["$totalBlogs.count", 0] },
                  ],
                },
                0,
              ],
            },
          },
        },
      ]);

      const result = aggregation[0];
      const analytics: IBlogsCollectionAnalytics | any = {
        totalBlogs: result.totalBlogs || 0,
        totalViews: result.totalViews || 0,
        totalShares: result.totalShares || 0,
        totalComments: result.totalComments || 0,
        totalInteractions: result.totalInteractions || 0,
        averageViewsPerBlog: result.averageViewsPerBlog || 0,
        averageSharesPerBlog: result.averageSharesPerBlog || 0,
        averageCommentsPerBlog: result.averageCommentsPerBlog || 0,
        averageInteractionsPerBlog: result.averageInteractionsPerBlog || 0,
        blogsPublishedToday: result.blogsPublishedToday || 0,
        blogsPublishedThisMonth: result.blogsPublishedThisMonth || 0,
        blogsArchived: result.blogsArchived || 0,
        blogsUnderReview: result.blogsUnderReview || 0,
        blogsPrivate: result.blogsPrivate || 0,
        mostPopularTags: result.mostPopularTags || [],
        mostPopularCategories: result.mostPopularCategories || [],
        lastCalculatedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save the analytics to the database
      await this.blogsCollectionAnalyticsModel.create(analytics);

      return analytics;
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getBlogsAnalytics: ${err.message}`
      );
    }
  }

  public async getUsersAnalytics(): Promise<IUsersCollectionAnalytics> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const aggregation = await this.userModel.aggregate([
        {
          $facet: {
            totalUsers: [{ $count: "count" }],
            totalBlogsCreated: [
              {
                $lookup: {
                  from: "blogs",
                  localField: "_id",
                  foreignField: "author",
                  as: "blogs",
                },
              },
              { $group: { _id: null, total: { $sum: { $size: "$blogs" } } } },
            ],
            totalFollowers: [
              { $group: { _id: null, total: { $sum: "$followers" } } },
            ],
            totalFollowing: [
              { $group: { _id: null, total: { $sum: "$following" } } },
            ],
            totalActiveUsers: [
              { $match: { isActive: true } },
              { $count: "count" },
            ],
            totalVerifiedUsers: [
              { $match: { emailVerified: true } },
              { $count: "count" },
            ],
            totalLockedUsers: [
              { $match: { isAccountLocked: true } },
              { $count: "count" },
            ],
            totalBannedUsers: [
              { $match: { isAccountBanned: true } },
              { $count: "count" },
            ],
            totalUsersToBeDeleted: [
              { $match: { userAccountToBeDeleted: true } },
              { $count: "count" },
            ],
            usersByRole: [
              { $unwind: "$roles" },
              { $group: { _id: "$roles", count: { $sum: 1 } } },
            ],
            usersRegisteredToday: [
              { $match: { createdAt: { $gte: today } } },
              { $count: "count" },
            ],
            usersRegisteredThisMonth: [
              { $match: { createdAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            usersLoggedInToday: [
              { $match: { lastLoginAt: { $gte: today } } },
              { $count: "count" },
            ],
            usersActiveThisMonth: [
              { $match: { lastLoginAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            emailVerificationRequestsToday: [
              { $match: { lastVerificationEmailSentAt: { $gte: today } } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$resendVerificationTokenCount" },
                },
              },
            ],
            emailVerificationRequestsThisMonth: [
              { $match: { lastVerificationEmailSentAt: { $gte: monthStart } } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$resendVerificationTokenCount" },
                },
              },
            ],
            passwordResetRequests: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$passwordResetRequestsAttempts" },
                },
              },
            ],
            accountDeletionRequests: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$deleteAccountRequestCount" },
                },
              },
            ],
            emailChangeRequests: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$changeEmailRequestCount" },
                },
              },
            ],
            deactivationRequests: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$deactivationRequestCount" },
                },
              },
            ],
            reactivationRequests: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$reactivationRequestCount" },
                },
              },
            ],
            mostFollowedUsers: [
              { $sort: { followers: -1 } },
              { $limit: 5 },
              { $project: { email: 1 } },
              { $group: { _id: null, users: { $push: "$email" } } },
            ],
          },
        },
        {
          $project: {
            totalUsers: { $arrayElemAt: ["$totalUsers.count", 0] },
            totalBlogsCreated: {
              $arrayElemAt: ["$totalBlogsCreated.total", 0],
            },
            totalFollowers: { $arrayElemAt: ["$totalFollowers.total", 0] },
            totalFollowing: { $arrayElemAt: ["$totalFollowing.total", 0] },
            totalActiveUsers: { $arrayElemAt: ["$totalActiveUsers.count", 0] },
            totalVerifiedUsers: {
              $arrayElemAt: ["$totalVerifiedUsers.count", 0],
            },
            totalLockedUsers: { $arrayElemAt: ["$totalLockedUsers.count", 0] },
            totalBannedUsers: { $arrayElemAt: ["$totalBannedUsers.count", 0] },
            totalUsersToBeDeleted: {
              $arrayElemAt: ["$totalUsersToBeDeleted.count", 0],
            },
            usersByRole: {
              $arrayToObject: {
                $map: {
                  input: "$usersByRole",
                  as: "role",
                  in: { k: "$$role._id", v: "$$role.count" },
                },
              },
            },
            usersRegisteredToday: {
              $arrayElemAt: ["$usersRegisteredToday.count", 0],
            },
            usersRegisteredThisMonth: {
              $arrayElemAt: ["$usersRegisteredThisMonth.count", 0],
            },
            usersLoggedInToday: {
              $arrayElemAt: ["$usersLoggedInToday.count", 0],
            },
            usersActiveThisMonth: {
              $arrayElemAt: ["$usersActiveThisMonth.count", 0],
            },
            emailVerificationRequestsToday: {
              $arrayElemAt: ["$emailVerificationRequestsToday.total", 0],
            },
            emailVerificationRequestsThisMonth: {
              $arrayElemAt: ["$emailVerificationRequestsThisMonth.total", 0],
            },
            passwordResetRequests: {
              $arrayElemAt: ["$passwordResetRequests.total", 0],
            },
            accountDeletionRequests: {
              $arrayElemAt: ["$accountDeletionRequests.total", 0],
            },
            emailChangeRequests: {
              $arrayElemAt: ["$emailChangeRequests.total", 0],
            },
            deactivationRequests: {
              $arrayElemAt: ["$deactivationRequests.total", 0],
            },
            reactivationRequests: {
              $arrayElemAt: ["$reactivationRequests.total", 0],
            },
            mostFollowedUsers: {
              $arrayElemAt: ["$mostFollowedUsers.users", 0],
            },
            averageFollowersPerUser: {
              $cond: [
                { $gt: [{ $arrayElemAt: ["$totalUsers.count", 0] }, 0] },
                {
                  $divide: [
                    { $arrayElemAt: ["$totalFollowers.total", 0] },
                    { $arrayElemAt: ["$totalUsers.count", 0] },
                  ],
                },
                0,
              ],
            },
            averageFollowingPerUser: {
              $cond: [
                { $gt: [{ $arrayElemAt: ["$totalUsers.count", 0] }, 0] },
                {
                  $divide: [
                    { $arrayElemAt: ["$totalFollowing.total", 0] },
                    { $arrayElemAt: ["$totalUsers.count", 0] },
                  ],
                },
                0,
              ],
            },
            averageBlogsPerUser: {
              $cond: [
                { $gt: [{ $arrayElemAt: ["$totalUsers.count", 0] }, 0] },
                {
                  $divide: [
                    { $arrayElemAt: ["$totalBlogsCreated.total", 0] },
                    { $arrayElemAt: ["$totalUsers.count", 0] },
                  ],
                },
                0,
              ],
            },
          },
        },
      ]);

      const result = aggregation[0];
      const analytics: IUsersCollectionAnalytics = {
        totalUsers: result.totalUsers || 0,
        totalBlogsCreated: result.totalBlogsCreated || 0,
        totalFollowers: result.totalFollowers || 0,
        totalFollowing: result.totalFollowing || 0,
        totalActiveUsers: result.totalActiveUsers || 0,
        totalVerifiedUsers: result.totalVerifiedUsers || 0,
        totalLockedUsers: result.totalLockedUsers || 0,
        totalBannedUsers: result.totalBannedUsers || 0,
        totalUsersToBeDeleted: result.totalUsersToBeDeleted || 0,
        usersByRole: result.usersByRole || {},
        averageFollowersPerUser: result.averageFollowersPerUser || 0,
        averageFollowingPerUser: result.averageFollowingPerUser || 0,
        averageBlogsPerUser: result.averageBlogsPerUser || 0,
        usersRegisteredToday: result.usersRegisteredToday || 0,
        usersRegisteredThisMonth: result.usersRegisteredThisMonth || 0,
        usersLoggedInToday: result.usersLoggedInToday || 0,
        usersActiveThisMonth: result.usersActiveThisMonth || 0,
        emailVerificationRequestsToday:
          result.emailVerificationRequestsToday || 0,
        emailVerificationRequestsThisMonth:
          result.emailVerificationRequestsThisMonth || 0,
        passwordResetRequests: result.passwordResetRequests || 0,
        accountDeletionRequests: result.accountDeletionRequests || 0,
        emailChangeRequests: result.emailChangeRequests || 0,
        deactivationRequests: result.deactivationRequests || 0,
        reactivationRequests: result.reactivationRequests || 0,
        mostFollowedUsers: result.mostFollowedUsers || [],
        lastCalculatedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save the analytics to the database
      await this.usersCollectionAnalyticsModel.create(analytics);

      return analytics;
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getUsersAnalytics: ${err.message}`
      );
    }
  }

  public async getSupportTicketsAnalytics(): Promise<ISupportTicketsCollectionAnalytics> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const aggregation = await this.supportTicketModel.aggregate([
        {
          $facet: {
            totalTickets: [{ $count: "count" }],
            totalUserResponses: [
              { $unwind: "$userResponses" },
              { $count: "count" },
            ],
            totalAdminResponses: [
              { $unwind: "$adminResponses" },
              { $count: "count" },
            ],
            totalAttachments: [
              {
                $group: {
                  _id: null,
                  ticketAttachments: {
                    $sum: {
                      $cond: [{ $ifNull: ["$attachments", false] }, 1, 0],
                    },
                  },
                  userResponseAttachments: {
                    $sum: {
                      $cond: [
                        { $ifNull: ["$userResponses.attachment", false] },
                        { $size: "$userResponses" },
                        0,
                      ],
                    },
                  },
                  adminResponseAttachments: {
                    $sum: {
                      $cond: [
                        { $ifNull: ["$adminResponses.attachment", false] },
                        { $size: "$adminResponses" },
                        0,
                      ],
                    },
                  },
                },
              },
            ],
            ticketsByStatus: [
              { $group: { _id: "$status", count: { $sum: 1 } } },
            ],
            ticketsByPriority: [
              { $group: { _id: "$priority", count: { $sum: 1 } } },
            ],
            ticketsByCategory: [
              { $group: { _id: "$category", count: { $sum: 1 } } },
            ],
            ticketsCreatedToday: [
              { $match: { createdAt: { $gte: today } } },
              { $count: "count" },
            ],
            ticketsCreatedThisMonth: [
              { $match: { createdAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            ticketsResolvedToday: [
              { $match: { resolvedAt: { $gte: today } } },
              { $count: "count" },
            ],
            ticketsResolvedThisMonth: [
              { $match: { resolvedAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            ticketsReopenedToday: [
              { $match: { reopenedAt: { $gte: today } } },
              { $count: "count" },
            ],
            ticketsReopenedThisMonth: [
              { $match: { reopenedAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            averageResolutionTimeHours: [
              { $match: { resolvedAt: { $ne: null } } },
              {
                $group: {
                  _id: null,
                  avgTime: {
                    $avg: {
                      $divide: [
                        { $subtract: ["$resolvedAt", "$createdAt"] },
                        1000 * 60 * 60,
                      ],
                    },
                  },
                },
              },
            ],
            averageFirstResponseTimeHours: [
              { $match: { "adminResponses.0": { $exists: true } } },
              {
                $group: {
                  _id: null,
                  avgTime: {
                    $avg: {
                      $divide: [
                        {
                          $subtract: [
                            { $min: "$adminResponses.respondedAt" },
                            "$createdAt",
                          ],
                        },
                        1000 * 60 * 60,
                      ],
                    },
                  },
                },
              },
            ],
            averageUserResponsesPerTicket: [
              {
                $group: {
                  _id: null,
                  avg: { $avg: { $size: "$userResponses" } },
                },
              },
            ],
            averageAdminResponsesPerTicket: [
              {
                $group: {
                  _id: null,
                  avg: { $avg: { $size: "$adminResponses" } },
                },
              },
            ],
            mostActiveUsers: [
              { $group: { _id: "$user", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              {
                $lookup: {
                  from: "users",
                  localField: "_id",
                  foreignField: "_id",
                  as: "user",
                },
              },
              { $project: { email: { $arrayElemAt: ["$user.email", 0] } } },
              { $group: { _id: null, users: { $push: "$email" } } },
            ],
            mostActiveAdmins: [
              { $unwind: "$adminResponses" },
              {
                $group: {
                  _id: "$adminResponses.responderId",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
              { $limit: 5 },
              {
                $lookup: {
                  from: "users",
                  localField: "_id",
                  foreignField: "_id",
                  as: "user",
                },
              },
              { $project: { email: { $arrayElemAt: ["$user.email", 0] } } },
              { $group: { _id: null, admins: { $push: "$email" } } },
            ],
            ticketsWithFollowUps: [
              { $match: { "userResponses.isFollowUp": true } },
              { $count: "count" },
            ],
            escalatedTickets: [
              { $match: { "adminResponses.escalationLevel": { $gt: 1 } } },
              { $count: "count" },
            ],
            ticketsWithInternalNotes: [
              {
                $match: {
                  "adminResponses.internalNotes": { $exists: true, $ne: "" },
                },
              },
              { $count: "count" },
            ],
            mostCommonCategories: [
              { $group: { _id: "$category", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              { $group: { _id: null, categories: { $push: "$_id" } } },
            ],
            mostCommonPriorities: [
              { $group: { _id: "$priority", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              { $group: { _id: null, priorities: { $push: "$_id" } } },
            ],
          },
        },
        {
          $project: {
            totalTickets: { $arrayElemAt: ["$totalTickets.count", 0] },
            totalUserResponses: {
              $arrayElemAt: ["$totalUserResponses.count", 0],
            },
            totalAdminResponses: {
              $arrayElemAt: ["$totalAdminResponses.count", 0],
            },
            totalAttachments: {
              $add: [
                { $arrayElemAt: ["$totalAttachments.ticketAttachments", 0] },
                {
                  $arrayElemAt: [
                    "$totalAttachments.userResponseAttachments",
                    0,
                  ],
                },
                {
                  $arrayElemAt: [
                    "$totalAttachments.adminResponseAttachments",
                    0,
                  ],
                },
              ],
            },
            ticketsByStatus: {
              $arrayToObject: {
                $map: {
                  input: "$ticketsByStatus",
                  as: "status",
                  in: { k: "$$status._id", v: "$$status.count" },
                },
              },
            },
            ticketsByPriority: {
              $arrayToObject: {
                $map: {
                  input: "$ticketsByPriority",
                  as: "priority",
                  in: { k: "$$priority._id", v: "$$priority.count" },
                },
              },
            },
            ticketsByCategory: {
              $arrayToObject: {
                $map: {
                  input: "$ticketsByCategory",
                  as: "category",
                  in: { k: "$$category._id", v: "$$category.count" },
                },
              },
            },
            ticketsCreatedToday: {
              $arrayElemAt: ["$ticketsCreatedToday.count", 0],
            },
            ticketsCreatedThisMonth: {
              $arrayElemAt: ["$ticketsCreatedThisMonth.count", 0],
            },
            ticketsResolvedToday: {
              $arrayElemAt: ["$ticketsResolvedToday.count", 0],
            },
            ticketsResolvedThisMonth: {
              $arrayElemAt: ["$ticketsResolvedThisMonth.count", 0],
            },
            ticketsReopenedToday: {
              $arrayElemAt: ["$ticketsReopenedToday.count", 0],
            },
            ticketsReopenedThisMonth: {
              $arrayElemAt: ["$ticketsReopenedThisMonth.count", 0],
            },
            averageResolutionTimeHours: {
              $arrayElemAt: ["$averageResolutionTimeHours.avgTime", 0],
            },
            averageFirstResponseTimeHours: {
              $arrayElemAt: ["$averageFirstResponseTimeHours.avgTime", 0],
            },
            averageUserResponsesPerTicket: {
              $arrayElemAt: ["$averageUserResponsesPerTicket.avg", 0],
            },
            averageAdminResponsesPerTicket: {
              $arrayElemAt: ["$averageAdminResponsesPerTicket.avg", 0],
            },
            mostActiveUsers: { $arrayElemAt: ["$mostActiveUsers.users", 0] },
            mostActiveAdmins: { $arrayElemAt: ["$mostActiveAdmins.admins", 0] },
            ticketsWithFollowUps: {
              $arrayElemAt: ["$ticketsWithFollowUps.count", 0],
            },
            escalatedTickets: { $arrayElemAt: ["$escalatedTickets.count", 0] },
            ticketsWithInternalNotes: {
              $arrayElemAt: ["$ticketsWithInternalNotes.count", 0],
            },
            mostCommonCategories: {
              $arrayElemAt: ["$mostCommonCategories.categories", 0],
            },
            mostCommonPriorities: {
              $arrayElemAt: ["$mostCommonPriorities.priorities", 0],
            },
          },
        },
      ]);

      const result = aggregation[0];
      const analytics: ISupportTicketsCollectionAnalytics = {
        totalTickets: result.totalTickets || 0,
        totalUserResponses: result.totalUserResponses || 0,
        totalAdminResponses: result.totalAdminResponses || 0,
        totalAttachments: result.totalAttachments || 0,
        ticketsByStatus: result.ticketsByStatus || {},
        ticketsByPriority: result.ticketsByPriority || {},
        ticketsByCategory: result.ticketsByCategory || {},
        ticketsCreatedToday: result.ticketsCreatedToday || 0,
        ticketsCreatedThisMonth: result.ticketsCreatedThisMonth || 0,
        ticketsResolvedToday: result.ticketsResolvedToday || 0,
        ticketsResolvedThisMonth: result.ticketsResolvedThisMonth || 0,
        ticketsReopenedToday: result.ticketsReopenedToday || 0,
        ticketsReopenedThisMonth: result.ticketsReopenedThisMonth || 0,
        averageResolutionTimeHours: result.averageResolutionTimeHours || 0,
        averageFirstResponseTimeHours:
          result.averageFirstResponseTimeHours || 0,
        averageUserResponsesPerTicket:
          result.averageUserResponsesPerTicket || 0,
        averageAdminResponsesPerTicket:
          result.averageAdminResponsesPerTicket || 0,
        mostActiveUsers: result.mostActiveUsers || [],
        mostActiveAdmins: result.mostActiveAdmins || [],
        ticketsWithFollowUps: result.ticketsWithFollowUps || 0,
        escalatedTickets: result.escalatedTickets || 0,
        ticketsWithInternalNotes: result.ticketsWithInternalNotes || 0,
        mostCommonCategories: result.mostCommonCategories || [],
        mostCommonPriorities: result.mostCommonPriorities || [],
        lastCalculatedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save the analytics to the database
      await this.supportTicketsCollectionAnalyticsModel.create(analytics);

      return analytics;
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getSupportTicketsAnalytics: ${err.message}`
      );
    }
  }

  public async getContentReportingAnalytics(): Promise<IContentReportingCollectionAnalytics> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const aggregation = await this.contentReportingModel.aggregate([
        {
          $facet: {
            totalReports: [{ $count: "count" }],
            totalArchivedReports: [
              { $match: { isArchived: true } },
              { $count: "count" },
            ],
            totalProcessedReports: [
              { $match: { processedAt: { $ne: null } } },
              { $count: "count" },
            ],
            reportsByStatus: [
              { $group: { _id: "$status", count: { $sum: 1 } } },
            ],
            reportsByType: [{ $group: { _id: "$type", count: { $sum: 1 } } }],
            reportsByResolutionType: [
              { $match: { resolutionType: { $ne: null } } },
              { $group: { _id: "$resolutionType", count: { $sum: 1 } } },
            ],
            reportsCreatedToday: [
              { $match: { createdAt: { $gte: today } } },
              { $count: "count" },
            ],
            reportsCreatedThisMonth: [
              { $match: { createdAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            reportsProcessedToday: [
              { $match: { processedAt: { $gte: today } } },
              { $count: "count" },
            ],
            reportsProcessedThisMonth: [
              { $match: { processedAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            reportsArchivedToday: [
              { $match: { isArchived: true, updatedAt: { $gte: today } } },
              { $count: "count" },
            ],
            reportsArchivedThisMonth: [
              { $match: { isArchived: true, updatedAt: { $gte: monthStart } } },
              { $count: "count" },
            ],
            averageProcessingTimeHours: [
              { $match: { processedAt: { $ne: null } } },
              {
                $group: {
                  _id: null,
                  avgTime: {
                    $avg: {
                      $divide: [
                        { $subtract: ["$processedAt", "$createdAt"] },
                        1000 * 60 * 60,
                      ],
                    },
                  },
                },
              },
            ],
            averageReportsPerBlog: [
              { $group: { _id: "$content", count: { $sum: 1 } } },
              { $group: { _id: null, avg: { $avg: "$count" } } },
            ],
            averageReportsPerUser: [
              { $group: { _id: "$user", count: { $sum: 1 } } },
              { $group: { _id: null, avg: { $avg: "$count" } } },
            ],
            mostReportedBlogs: [
              { $group: { _id: "$content", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              {
                $lookup: {
                  from: "blogs",
                  localField: "_id",
                  foreignField: "_id",
                  as: "blog",
                },
              },
              { $project: { title: { $arrayElemAt: ["$blog.title", 0] } } },
              { $group: { _id: null, blogs: { $push: "$title" } } },
            ],
            mostActiveReportingUsers: [
              { $group: { _id: "$user", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              {
                $lookup: {
                  from: "users",
                  localField: "_id",
                  foreignField: "_id",
                  as: "user",
                },
              },
              { $project: { email: { $arrayElemAt: ["$user.email", 0] } } },
              { $group: { _id: null, users: { $push: "$email" } } },
            ],
            mostActiveProcessingAdmins: [
              { $match: { processedBy: { $ne: null } } },
              { $group: { _id: "$processedBy", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              {
                $lookup: {
                  from: "users",
                  localField: "_id",
                  foreignField: "_id",
                  as: "user",
                },
              },
              { $project: { email: { $arrayElemAt: ["$user.email", 0] } } },
              { $group: { _id: null, admins: { $push: "$email" } } },
            ],
            reportsWithProcessingNotes: [
              { $match: { processedNotes: { $exists: true, $ne: "" } } },
              { $count: "count" },
            ],
            mostCommonReportTypes: [
              { $group: { _id: "$type", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              { $group: { _id: null, types: { $push: "$_id" } } },
            ],
            mostCommonResolutionTypes: [
              { $match: { resolutionType: { $ne: null } } },
              { $group: { _id: "$resolutionType", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 5 },
              { $group: { _id: null, types: { $push: "$_id" } } },
            ],
          },
        },
        {
          $project: {
            totalReports: { $arrayElemAt: ["$totalReports.count", 0] },
            totalArchivedReports: {
              $arrayElemAt: ["$totalArchivedReports.count", 0],
            },
            totalProcessedReports: {
              $arrayElemAt: ["$totalProcessedReports.count", 0],
            },
            reportsByStatus: {
              $arrayToObject: {
                $map: {
                  input: "$reportsByStatus",
                  as: "status",
                  in: { k: "$$status._id", v: "$$status.count" },
                },
              },
            },
            reportsByType: {
              $arrayToObject: {
                $map: {
                  input: "$reportsByType",
                  as: "type",
                  in: { k: "$$type._id", v: "$$type.count" },
                },
              },
            },
            reportsByResolutionType: {
              $arrayToObject: {
                $map: {
                  input: "$reportsByResolutionType",
                  as: "resolution",
                  in: { k: "$$resolution._id", v: "$$resolution.count" },
                },
              },
            },
            reportsCreatedToday: {
              $arrayElemAt: ["$reportsCreatedToday.count", 0],
            },
            reportsCreatedThisMonth: {
              $arrayElemAt: ["$reportsCreatedThisMonth.count", 0],
            },
            reportsProcessedToday: {
              $arrayElemAt: ["$reportsProcessedToday.count", 0],
            },
            reportsProcessedThisMonth: {
              $arrayElemAt: ["$reportsProcessedThisMonth.count", 0],
            },
            reportsArchivedToday: {
              $arrayElemAt: ["$reportsArchivedToday.count", 0],
            },
            reportsArchivedThisMonth: {
              $arrayElemAt: ["$reportsArchivedThisMonth.count", 0],
            },
            averageProcessingTimeHours: {
              $arrayElemAt: ["$averageProcessingTimeHours.avgTime", 0],
            },
            averageReportsPerBlog: {
              $arrayElemAt: ["$averageReportsPerBlog.avg", 0],
            },
            averageReportsPerUser: {
              $arrayElemAt: ["$averageReportsPerUser.avg", 0],
            },
            mostReportedBlogs: {
              $arrayElemAt: ["$mostReportedBlogs.blogs", 0],
            },
            mostActiveReportingUsers: {
              $arrayElemAt: ["$mostActiveReportingUsers.users", 0],
            },
            mostActiveProcessingAdmins: {
              $arrayElemAt: ["$mostActiveProcessingAdmins.admins", 0],
            },
            reportsWithProcessingNotes: {
              $arrayElemAt: ["$reportsWithProcessingNotes.count", 0],
            },
            mostCommonReportTypes: {
              $arrayElemAt: ["$mostCommonReportTypes.types", 0],
            },
            mostCommonResolutionTypes: {
              $arrayElemAt: ["$mostCommonResolutionTypes.types", 0],
            },
          },
        },
      ]);

      const result = aggregation[0];
      const analytics: IContentReportingCollectionAnalytics = {
        totalReports: result.totalReports || 0,
        totalArchivedReports: result.totalArchivedReports || 0,
        totalProcessedReports: result.totalProcessedReports || 0,
        reportsByStatus: result.reportsByStatus || {},
        reportsByType: result.reportsByType || {},
        reportsByResolutionType: result.reportsByResolutionType || {},
        reportsCreatedToday: result.reportsCreatedToday || 0,
        reportsCreatedThisMonth: result.reportsCreatedThisMonth || 0,
        reportsProcessedToday: result.reportsProcessedToday || 0,
        reportsProcessedThisMonth: result.reportsProcessedThisMonth || 0,
        reportsArchivedToday: result.reportsArchivedToday || 0,
        reportsArchivedThisMonth: result.reportsArchivedThisMonth || 0,
        averageProcessingTimeHours: result.averageProcessingTimeHours || 0,
        averageReportsPerBlog: result.averageReportsPerBlog || 0,
        averageReportsPerUser: result.averageReportsPerUser || 0,
        mostReportedBlogs: result.mostReportedBlogs || [],
        mostActiveReportingUsers: result.mostActiveReportingUsers || [],
        mostActiveProcessingAdmins: result.mostActiveProcessingAdmins || [],
        reportsWithProcessingNotes: result.reportsWithProcessingNotes || 0,
        mostCommonReportTypes: result.mostCommonReportTypes || [],
        mostCommonResolutionTypes: result.mostCommonResolutionTypes || [],
        lastCalculatedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save the analytics to the database
      await this.contentReportingCollectionAnalyticsModel.create(analytics);

      return analytics;
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getContentReportingAnalytics: ${err.message}`
      );
    }
  }
}
