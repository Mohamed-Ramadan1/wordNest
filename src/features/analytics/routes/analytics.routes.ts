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

router.use(
  accessControlMiddleware.protect,
  accessControlMiddleware.restrictTo("admin")
);
// ROUTES
router.get("/blogs", analyticsController.getBlogAnalytics);
router.get("/users", analyticsController.getUserAnalytics);
router.get("/support-tickets", analyticsController.getSupportTicketAnalytics);
router.get(
  "/content-reporting",
  analyticsController.getContentReportingAnalytics
);

// GET ALL REPORTS
router.get(
  "/blogs/reports",
  analyticsReportsController.getAllBlogsAnalyticsReports
);
router.get(
  "/users/reports",
  analyticsReportsController.getAllUsersAnalyticsReports
);
router.get(
  "/support-tickets/reports",
  analyticsReportsController.getAllSupportTicketsAnalyticsReports
);
router.get(
  "/content-reporting/reports",
  analyticsReportsController.getAllContentReportingAnalyticsReports
);

export default router;
