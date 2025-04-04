// Express imports
import { Router } from "express";
// shared imports
import { TYPES, AccessControlMiddleware } from "@shared/index";
// config imports
import { container } from "@config/inversify.config";

// middleware imports
import { BlogsManagementMiddleware } from "../middlewares/admin/blogsManagement.middleware";

// controller imports
import { BlogManagementController } from "../controllers/admin/blogsManagement.controller";


// shard instances initialization
const accessControllerMiddleware = container.get<AccessControlMiddleware>(
  TYPES.AccessControlMiddleware
);

// controllers initialization
const blogManagementController = container.get<BlogManagementController>(
  TYPES.BlogManagementController
);

// middleware initialization
const blogManagementMiddleware = container.get<BlogsManagementMiddleware>(
  TYPES.BlogsManagementMiddleware
);

// create  the express router
const router: Router = Router();
router.use(
  accessControllerMiddleware.protect,
  accessControllerMiddleware.restrictTo("admin")
);

router.route("/").get(blogManagementController.getAllBlogPosts);

router
  .route("/:blogId")
  .get(blogManagementController.getBlogPost)
  .delete(
    blogManagementMiddleware.validateBlogPostManagementRequest,
    blogManagementController.deleteBlogPost
  );

router
  .route("/:blogId/un-publish")
  .patch(
    blogManagementMiddleware.validateBlogPostManagementRequest,
    blogManagementMiddleware.validateUnPublishBlogStatus,
    blogManagementController.unPublishBlogPost
  );

router
  .route("/:blogId/publish")
  .patch(
    blogManagementMiddleware.validateBlogPostManagementRequest,
    blogManagementMiddleware.validatePublishBlogStatus,
    blogManagementController.rePublishBlogPost
  );

export default router;
