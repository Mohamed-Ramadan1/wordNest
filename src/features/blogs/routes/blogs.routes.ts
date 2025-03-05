// Express imports
import { Router } from "express";
// shared imports

import { TYPES } from "@shared/index";

import { container } from "@config/inversify.config";
import { BlogsController } from "../controllers/user/blogs.controller";
// create  the express router
const router: Router = Router();

// create an instance of the BlogsController
const blogsController = container.get<BlogsController>(TYPES.BlogsController);

// define the routes
router.get("/", blogsController.getAllBlogPosts);
router.get("/:blogId", blogsController.getBlogPost);
router.get("/user/:userId", blogsController.getAllBlogPostsByUser);

export default router;
