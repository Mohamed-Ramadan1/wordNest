// Express imports
import { Router } from "express";
// shared imports
import { protect, TYPES } from "@shared/index";

// middleware  imports
import { InteractionsMiddleware } from "../middlewares/interactions.middleware";

// config imports
import { container } from "@config/inversify.config";

// controllers imports
import { InteractionsController } from "../controllers/interactions.controller";

// controllers initialization
const interactionController = container.get<InteractionsController>(
  TYPES.InteractionsController
);

const interactionMiddleware = container.get<InteractionsMiddleware>(
  TYPES.InteractionsMiddleware
);

// create  the express router
const router: Router = Router();

router.use(protect);

router
  .route("/")
  .get(interactionController.getAllInteractionsWithBlogPost)
  .post(
    interactionMiddleware.validateInteractWithBlogPost,
    interactionController.interactWithBlogPost
  );

router
  .route("/:interactionId")
  .delete(interactionController.deleteMyInteractionWithBlogPost)
  .patch(
    interactionMiddleware.validateUpdateInteraction,
    interactionController.updateMyInteractionWithBlogPost
  );

export default router;
