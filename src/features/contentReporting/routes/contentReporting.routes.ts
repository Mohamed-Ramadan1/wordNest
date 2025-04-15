// Express imports
import { Router } from "express";

// config imports
import { container } from "@config/inversify.config";

// shared imports
import { TYPES, AccessControlMiddleware } from "@shared/index";

// middleware imports
import { ContentReportingCRUDMiddleware } from "../middlewares/contentReportingCRUD.middleware";
import { ContentReportingManagementMiddleware } from "../middlewares/contentReportingManagement.middleware";

// controllers imports
import { ContentReportingCRUDController } from "../controllers/contentReportingCRUD.controller";
import { ContentReportingManagementController } from "../controllers/contentReportingManagement.controller";

// create  the express router
const router: Router = Router();

// shard instances initialization
const accessControllerMiddleware = container.get<AccessControlMiddleware>(
  TYPES.AccessControlMiddleware
);

// controller instance initialization
const contentReportingCRUDController =
  container.get<ContentReportingCRUDController>(
    TYPES.ContentReportingCRUDController
  );
const contentReportingManagementController =
  container.get<ContentReportingManagementController>(
    TYPES.ContentReportingManagementController
  );

// middleware instance initialization
const contentReportingCRUDMiddleware =
  container.get<ContentReportingCRUDMiddleware>(
    TYPES.ContentReportingCRUDMiddleware
  );
const contentReportingManagementMiddleware =
  container.get<ContentReportingManagementMiddleware>(
    TYPES.ContentReportingManagementMiddleware
  );

router.use(accessControllerMiddleware.protect);

router
  .route("/")
  .post(
    contentReportingCRUDMiddleware.validateCreateContentReporting,
    contentReportingCRUDController.createReportContentRequest
  )
  .get(
    accessControllerMiddleware.restrictTo("admin"),
    contentReportingCRUDController.getAllReportContentRequests
  );

router
  .route("/:id")
  .get(
    accessControllerMiddleware.restrictTo("admin"),
    contentReportingCRUDController.getReportContentRequest
  )
  .delete(
    accessControllerMiddleware.restrictTo("admin"),
    contentReportingCRUDMiddleware.validateDeleteContentReporting,
    contentReportingCRUDController.deleteReportContentRequest
  );

export default router;
