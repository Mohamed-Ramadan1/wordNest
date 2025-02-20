// Express imports
import { Router } from "express";
// shared imports

import { BlogsController } from "../controllers/user/blogs.controller";
// create  the express router
const router: Router = Router();

// create an instance of the BlogsController
const blogsController = new BlogsController();

// define the routes
router.get("/", blogsController.getAllBlogPosts);
router.get("/:blogId", blogsController.getBlogPost);
router.get("/user/:userId", blogsController.getAllBlogPostsByUser);

export default router;
