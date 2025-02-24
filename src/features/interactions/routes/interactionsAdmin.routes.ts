// Express imports
import { Router } from "express";
// shared imports
import { protect, restrictTo } from "@shared/index";

// middleware imports
import { InteractionsAdminManagementMiddleware } from "../middlewares/interactionsAdminManagement.middleware";

// controllers imports
import { InteractionsAdminManagementController } from "../controllers/interactionsAdminManagement.controller";

// controllers initialization
const interactionsManagementController =
  new InteractionsAdminManagementController();
// create  the express router
const router: Router = Router();

router.use(protect);
router.use(restrictTo("admin"));

export default router;
