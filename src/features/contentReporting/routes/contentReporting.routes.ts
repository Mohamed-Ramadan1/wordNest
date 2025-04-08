// Express imports
import { Router } from "express";

// shared imports
import { TYPES, AccessControlMiddleware } from "@shared/index";

// config imports
import { container } from "@config/inversify.config";

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

router.use(accessControllerMiddleware.protect);

export default router;
