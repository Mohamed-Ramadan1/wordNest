// Express imports
import { Router } from "express";
// shared imports
import { protect } from "@shared/index";

// middleware  imports
import { InteractionsMiddleware } from "../middlewares/interactions.middleware";

// config imports
import { container } from "@config/inversify.config";

// shared imports
import { TYPES } from "@shared/index";

// controllers imports
import { InteractionsController } from "../controllers/interactions.controller";

// controllers initialization
const interactionController = container.get<InteractionsController>(
  TYPES.InteractionsController
);

// create  the express router
const router: Router = Router();

router.use(protect);

router
  .route("/")
  .get(interactionController.getAllInteractionsWithBlogPost)
  .post(
    InteractionsMiddleware.validateInteractWithBlogPost,
    interactionController.interactWithBlogPost
  );

router
  .route("/:interactionId")
  .delete(interactionController.deleteMyInteractionWithBlogPost)
  .patch(interactionController.updateMyInteractionWithBlogPost);

export default router;
