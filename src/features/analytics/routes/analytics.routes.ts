// express imports
import { Router } from "express";

// configuration imports
import { container } from "@config/inversify.config";

// shared imports
import { TYPES, AccessControlMiddleware } from "@shared/index";
import { AnalyticsController } from "../controllers/analytics.controller";

// Router instance
const router = Router();

const accessControlMiddleware = container.get<AccessControlMiddleware>(
  TYPES.AccessControlMiddleware
);

const analyticsController = container.get<AnalyticsController>(
  TYPES.AnalyticsController
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

export default router;
