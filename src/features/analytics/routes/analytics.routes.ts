// // express imports
// import { Router } from "express";

// // configuration imports
// import { container } from "@config/inversify.config";

// // shared imports
// import { TYPES, AccessControlMiddleware } from "@shared/index";
// import { AnalyticsController } from "../controllers/analytics.controller";
// import { AnalyticsReportsController } from "../controllers/analyticsReports.controller";

// // Router instance
// const router = Router();

// const accessControlMiddleware = container.get<AccessControlMiddleware>(
//   TYPES.AccessControlMiddleware
// );

// const analyticsController = container.get<AnalyticsController>(
//   TYPES.AnalyticsController
// );

// const analyticsReportsController = container.get<AnalyticsReportsController>(
//   TYPES.AnalyticsReportsController
// );

// router.use(
//   accessControlMiddleware.protect,
//   accessControlMiddleware.restrictTo("admin")
// );
// // ROUTES
// router.get("/blogs", analyticsController.getBlogAnalytics);
// router.get("/users", analyticsController.getUserAnalytics);
// router.get("/support-tickets", analyticsController.getSupportTicketAnalytics);
// router.get(
//   "/content-reporting",
//   analyticsController.getContentReportingAnalytics
// );

// // GET ALL REPORTS
// router.get(
//   "/blogs/reports",
//   analyticsReportsController.getAllBlogsAnalyticsReports
// );
// router.get(
//   "/users/reports",
//   analyticsReportsController.getAllUsersAnalyticsReports
// );
// router.get(
//   "/support-tickets/reports",
//   analyticsReportsController.getAllSupportTicketsAnalyticsReports
// );
// router.get(
//   "/content-reporting/reports",
//   analyticsReportsController.getAllContentReportingAnalyticsReports
// );

// export default router;
/**
 * Express router for analytics and analytics reports endpoints.
 * Provides routes for fetching analytics data and reports for blogs, users, support tickets, and content reporting.
 * All routes are protected and restricted to admin users.
 * @module routes/analytics
 */

// express imports
import { Router } from "express";

// configuration imports
import { container } from "@config/inversify.config";

// shared imports
import { TYPES, AccessControlMiddleware } from "@shared/index";
import { AnalyticsController } from "../controllers/analytics.controller";
import { AnalyticsReportsController } from "../controllers/analyticsReports.controller";

// Router instance
const router = Router();

const accessControlMiddleware = container.get<AccessControlMiddleware>(
  TYPES.AccessControlMiddleware
);

const analyticsController = container.get<AnalyticsController>(
  TYPES.AnalyticsController
);

const analyticsReportsController = container.get<AnalyticsReportsController>(
  TYPES.AnalyticsReportsController
);

// Apply middleware to protect routes and restrict to admin role
router.use(
  accessControlMiddleware.protect,
  accessControlMiddleware.restrictTo("admin")
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     BlogAnalytics:
 *       type: object
 *       properties:
 *         totalBlogs:
 *           type: number
 *           description: Total number of blogs
 *         totalViews:
 *           type: number
 *           description: Total views across all blogs
 *         totalShares:
 *           type: number
 *           description: Total shares across all blogs
 *         totalComments:
 *           type: number
 *           description: Total comments across all blogs
 *         totalInteractions:
 *           type: number
 *           description: Total interactions across all blogs
 *     UserAnalytics:
 *       type: object
 *       properties:
 *         totalUsers:
 *           type: number
 *           description: Total number of users
 *     SupportTicketAnalytics:
 *       type: object
 *       properties:
 *         totalTickets:
 *           type: number
 *           description: Total number of support tickets
 *     ContentReportingAnalytics:
 *       type: object
 *       properties:
 *         totalReports:
 *           type: number
 *           description: Total number of content reports
 *     BlogAnalyticsReport:
 *       type: object
 *       properties:
 *         totalBlogs:
 *           type: number
 *           description: Total number of blogs
 *         totalViews:
 *           type: number
 *           description: Total views across all blogs
 *         totalShares:
 *           type: number
 *           description: Total shares across all blogs
 *         totalComments:
 *           type: number
 *           description: Total comments across all blogs
 *         totalInteractions:
 *           type: number
 *           description: Total interactions across all blogs
 *         averageViewsPerBlog:
 *           type: number
 *           description: Average views per blog
 *         averageSharesPerBlog:
 *           type: number
 *           description: Average shares per blog
 *         averageCommentsPerBlog:
 *           type: number
 *           description: Average comments per blog
 *         averageInteractionsPerBlog:
 *           type: number
 *           description: Average interactions per blog
 *         blogsPublishedToday:
 *           type: number
 *           description: Number of blogs published today
 *         blogsPublishedThisMonth:
 *           type: number
 *           description: Number of blogs published this month
 *         blogsArchived:
 *           type: number
 *           description: Number of archived blogs
 *         blogsUnderReview:
 *           type: number
 *           description: Number of blogs under review
 *         blogsPrivate:
 *           type: number
 *           description: Number of private blogs
 *         mostPopularTags:
 *           type: array
 *           items:
 *             type: string
 *           description: Most popular tags used in blogs
 *         mostPopularCategories:
 *           type: array
 *           items:
 *             type: string
 *           description: Most popular categories used in blogs
 *         lastCalculatedAt:
 *           type: string
 *           format: date-time
 *           description: When the analytics were last calculated
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the report was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the report was last updated
 *     ApiResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [success, error]
 *           description: Status of the response
 *         message:
 *           type: string
 *           description: Response message
 *         results:
 *           type: number
 *           description: Number of items in the data
 *         data:
 *           type: object
 *           properties:
 *             reports:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogAnalyticsReport'
 */

/**
 * @swagger
 * /api/v1/analytics/blogs:
 *   get:
 *     summary: Get blog analytics
 *     description: Retrieves analytics data for blogs. Accessible only to admin users.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blog analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Blog analytics fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/BlogAnalytics'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get("/blogs", analyticsController.getBlogAnalytics);

/**
 * @swagger
 * /api/v1/analytics/users:
 *   get:
 *     summary: Get user analytics
 *     description: Retrieves analytics data for users. Accessible only to admin users.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User analytics fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/UserAnalytics'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get("/users", analyticsController.getUserAnalytics);

/**
 * @swagger
 * /api/v1/analytics/support-tickets:
 *   get:
 *     summary: Get support ticket analytics
 *     description: Retrieves analytics data for support tickets. Accessible only to admin users.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Support ticket analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Support ticket analytics fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/SupportTicketAnalytics'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get("/support-tickets", analyticsController.getSupportTicketAnalytics);

/**
 * @swagger
 * /api/v1/analytics/content-reporting:
 *   get:
 *     summary: Get content reporting analytics
 *     description: Retrieves analytics data for content reporting. Accessible only to admin users.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Content reporting analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Content reporting analytics fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/ContentReportingAnalytics'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get(
  "/content-reporting",
  analyticsController.getContentReportingAnalytics
);

/**
 * @swagger
 * /api/v1/analytics/blogs/reports:
 *   get:
 *     summary: Get all blog analytics reports
 *     description: Retrieves detailed analytics reports for blogs with filtering, sorting, and pagination. Accessible only to admin users.
 *     tags: [Analytics Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., totalViews, -totalBlogs for descending)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Fields to include in response (comma-separated, e.g., totalBlogs,totalViews)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Blog analytics reports fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get(
  "/blogs/reports",
  analyticsReportsController.getAllBlogsAnalyticsReports
);

/**
 * @swagger
 * /api/v1/analytics/users/reports:
 *   get:
 *     summary: Get all user analytics reports
 *     description: Retrieves detailed analytics reports for users with filtering, sorting, and pagination. Accessible only to admin users.
 *     tags: [Analytics Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Fields to include in response
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: User analytics reports fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get(
  "/users/reports",
  analyticsReportsController.getAllUsersAnalyticsReports
);

/**
 * @swagger
 * /api/v1/analytics/support-tickets/reports:
 *   get:
 *     summary: Get all support ticket analytics reports
 *     description: Retrieves detailed analytics reports for support tickets with filtering, sorting, and pagination. Accessible only to admin users.
 *     tags: [Analytics Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Fields to include in response
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Support ticket analytics reports fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get(
  "/support-tickets/reports",
  analyticsReportsController.getAllSupportTicketsAnalyticsReports
);

/**
 * @swagger
 * /api/v1/analytics/content-reporting/reports:
 *   get:
 *     summary: Get all content reporting analytics reports
 *     description: Retrieves detailed analytics reports for content reporting with filtering, sorting, and pagination. Accessible only to admin users.
 *     tags: [Analytics Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Fields to include in response
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Content reporting analytics reports fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get(
  "/content-reporting/reports",
  analyticsReportsController.getAllContentReportingAnalyticsReports
);

export default router;
