// Express imports
import { Router } from "express";
// shared imports
import { TYPES, AccessControlMiddleware } from "@shared/index";
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

// shard instances initialization
const accessControllerMiddleware = container.get<AccessControlMiddleware>(
  TYPES.AccessControlMiddleware
);

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

// middleware instances
const blogOwnerCRUDMiddleware = container.get<BlogOwnerCRUDMiddleware>(
  TYPES.BlogOwnerCRUDMiddleware
);
const blogStatusMiddleware = container.get<BlogStatusMiddleware>(
  TYPES.BlogStatusMiddleware
);

const scheduledBlogsMiddleware = container.get<ScheduledBlogsMiddleware>(
  TYPES.ScheduledBlogsMiddleware
);

router.use(accessControllerMiddleware.protect);

// blogs CRUD related routes
router
  .route("/")
  .get(blogCRUDController.getAllBlogPosts)
  .post(
    upload.array("blogImages", 5),
    blogOwnerCRUDMiddleware.validateCreateBlogPost,
    blogCRUDController.createBlogPost
  );

router
  .route("/:blogId")
  .get(blogCRUDController.getBlogPost)
  .patch(
    upload.single("image"),
    blogOwnerCRUDMiddleware.validateUpdateBlogPost,
    blogCRUDController.updateBlogPost
  )
  .delete(
    blogOwnerCRUDMiddleware.validateDeleteBlogPost,
    blogCRUDController.deleteBlogPost
  );

// blog status related routes
router
  .route("/:blogId/private")
  .patch(
    blogStatusMiddleware.validateBlogExists,
    blogStatusMiddleware.validateConvertToPrivate,
    blogStatusController.convertBlogToPrivate
  );

router
  .route("/:blogId/public")
  .patch(
    blogStatusMiddleware.validateBlogExists,
    blogStatusMiddleware.validateConvertToPublic,
    blogStatusController.convertBlogToPublic
  );

// archive the blog
router
  .route("/:blogId/archive")
  .patch(
    blogStatusMiddleware.validateBlogExists,
    blogStatusMiddleware.validateArchiveBlogPost,
    blogStatusController.archiveBlogPost
  );

// restore the archived blog
router
  .route("/:blogId/unarchive")
  .patch(
    blogStatusMiddleware.validateBlogExists,
    blogStatusMiddleware.validateUneArchivedBlogPost,
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
    scheduledBlogsMiddleware.validateScheduleDateFormat,
    scheduledBlogsMiddleware.validateCreateScheduledBlogPost,
    scheduledBlogsController.createScheduledBlogPost
  );

router
  .route("/scheduled/:blogId")
  .get(scheduledBlogsController.getScheduledBlogPost)
  .delete(scheduledBlogsController.deleteScheduledBlogPost)
  .patch(
    scheduledBlogsMiddleware.validateUpdateScheduledBlogPost,
    scheduledBlogsController.updateScheduledBlogPost
  );

// reschedule the blog post
router
  .route("/scheduled/:blogId/reschedule")
  .patch(
    scheduledBlogsMiddleware.validateScheduleDateFormat,
    scheduledBlogsMiddleware.validateRescheduleBlogPost,
    scheduledBlogsController.rescheduleBlogPost
  );
export default router;
