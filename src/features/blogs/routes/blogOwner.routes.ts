// Express imports
import { Router } from "express";
// shared imports
import { protect, TYPES } from "@shared/index";
// config imports
import { upload } from "@config/multer.config";
// config imports
import { container } from "@config/inversify.config";

// middleware imports
import { BlogOwnerCRUDMiddleware } from "../middlewares/owner/blogOwnerCRUD.middleware";
import { BlogStatusMiddleware } from "../middlewares/owner/blogStatus.middleware";
import { ScheduledBlogsMiddleware } from "../middlewares/owner/scheduledBlogs.middleware";

// controllers imports
import { BlogCRUDController } from "../controllers/owner/blogOwnerCRUD.controller";
import { BlogStatusController } from "../controllers/owner/blogStatus.controller";
import { ScheduledBlogsController } from "../controllers/owner/scheduledBlogs.controller";
// create  the express router
const router: Router = Router();

// controllers instances
const blogCRUDController = container.get<BlogCRUDController>(
  TYPES.BlogOwnerCRUDController
);
const blogStatusController = container.get<BlogStatusController>(
  TYPES.BlogStatusController
);
const scheduledBlogsController = container.get<ScheduledBlogsController>(
  TYPES.ScheduledBlogsController
);

router.use(protect);

// blogs CRUD related routes
router
  .route("/")
  .get(blogCRUDController.getAllBlogPosts)
  .post(
    upload.array("blogImages", 5),
    BlogOwnerCRUDMiddleware.validateCreateBlogPost,
    blogCRUDController.createBlogPost
  );

router
  .route("/:blogId")
  .get(blogCRUDController.getBlogPost)
  .patch(
    upload.single("image"),
    BlogOwnerCRUDMiddleware.validateUpdateBlogPost,
    blogCRUDController.updateBlogPost
  )
  .delete(
    BlogOwnerCRUDMiddleware.validateDeleteBlogPost,
    blogCRUDController.deleteBlogPost
  );

// blog status related routes
router
  .route("/:blogId/private")
  .patch(
    BlogStatusMiddleware.validateBlogExists,
    BlogStatusMiddleware.validateConvertToPrivate,
    blogStatusController.convertBlogToPrivate
  );

router
  .route("/:blogId/public")
  .patch(
    BlogStatusMiddleware.validateBlogExists,
    BlogStatusMiddleware.validateConvertToPublic,
    blogStatusController.convertBlogToPublic
  );

// archive the blog
router
  .route("/:blogId/archive")
  .patch(
    BlogStatusMiddleware.validateBlogExists,
    BlogStatusMiddleware.validateArchiveBlogPost,
    blogStatusController.archiveBlogPost
  );

// restore the archived blog
router
  .route("/:blogId/unarchive")
  .patch(
    BlogStatusMiddleware.validateBlogExists,
    BlogStatusMiddleware.validateUneArchivedBlogPost,
    blogStatusController.restoreArchivedBlogPost
  );

// schedule posts related routes

router
  .route("/:userId/scheduled")
  .get(scheduledBlogsController.getAllScheduledBlogPosts);
router
  .route("/scheduled")
  .get(scheduledBlogsController.getAllScheduledBlogPosts)
  .post(
    upload.array("blogImages", 5),
    ScheduledBlogsMiddleware.validateScheduleDateFormat,
    ScheduledBlogsMiddleware.validateCreateScheduledBlogPost,
    scheduledBlogsController.createScheduledBlogPost
  );

router
  .route("/scheduled/:blogId")
  .get(scheduledBlogsController.getScheduledBlogPost)
  .delete(scheduledBlogsController.deleteScheduledBlogPost)
  .patch(
    ScheduledBlogsMiddleware.validateUpdateScheduledBlogPost,
    scheduledBlogsController.updateScheduledBlogPost
  );

// reschedule the blog post
router
  .route("/scheduled/:blogId/reschedule")
  .patch(
    ScheduledBlogsMiddleware.validateScheduleDateFormat,
    ScheduledBlogsMiddleware.validateRescheduleBlogPost,
    scheduledBlogsController.rescheduleBlogPost
  );
export default router;
