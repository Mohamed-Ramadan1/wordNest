// Express imports
import { Router } from "express";
// shared imports
import { protect } from "@shared/index";
// config imports
import { upload } from "@config/multer.config";

// middleware imports
import { BlogOwnerCRUDMiddleware } from "../middlewares/owner/blogOwnerCRUD.middleware";

// controllers imports
import { BlogCRUDController } from "../controllers/owner/blogOwnerCRUD.controller";
// create  the express router
const router: Router = Router();

// controllers instances
const blogCRUDController = new BlogCRUDController();

// console.log(protect);
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

export default router;
