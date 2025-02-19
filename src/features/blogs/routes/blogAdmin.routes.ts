// Express imports
import { Router } from "express";
// shared imports
import { protect, restrictTo } from "@shared/index";

// middleware imports
import { BlogsManagementMiddleware } from "../middlewares/admin/blogsManagement.middleware";

// controller imports
import { BlogManagementController } from "../controllers/admin/blogsManagement.controller";

// controllers initialization
const blogManagementController = new BlogManagementController();

// create  the express router
const router: Router = Router();
router.use(protect);
router.use(restrictTo("admin"));
export default router;
