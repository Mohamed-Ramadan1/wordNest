// Express imports
import { Router } from "express";
// shared imports
import { protect, restrictTo, TYPES } from "@shared/index";
// config imports
import { container } from "@config/inversify.config";

// middleware imports
import { BlogsManagementMiddleware } from "../middlewares/admin/blogsManagement.middleware";

// controller imports
import { BlogManagementController } from "../controllers/admin/blogsManagement.controller";
// controllers initialization
const blogManagementController = container.get<BlogManagementController>(
  TYPES.BlogManagementController
);
// create  the express router
const router: Router = Router();
router.use(protect);
router.use(restrictTo("admin"));

router.route("/").get(blogManagementController.getAllBlogPosts);

router
  .route("/:blogId")
  .get(blogManagementController.getBlogPost)
  .delete(
    BlogsManagementMiddleware.validateBlogPostManagementRequest,
    blogManagementController.deleteBlogPost
  );

router
  .route("/:blogId/un-publish")
  .patch(
    BlogsManagementMiddleware.validateBlogPostManagementRequest,
    BlogsManagementMiddleware.validateUnPublishBlogStatus,
    blogManagementController.unPublishBlogPost
  );

router
  .route("/:blogId/publish")
  .patch(
    BlogsManagementMiddleware.validateBlogPostManagementRequest,
    BlogsManagementMiddleware.validatePublishBlogStatus,
    blogManagementController.rePublishBlogPost
  );

export default router;
