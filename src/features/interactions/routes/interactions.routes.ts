// Express imports
import { Router } from "express";
// shared imports
import { protect } from "@shared/index";

// middleware  imports
import { InteractionsMiddleware } from "../middlewares/interactions.middleware";

// controllers imports
import { InteractionsController } from "../controllers/interactions.controller";

// controllers initialization
const interactionController = new InteractionsController();

// create  the express router
const router: Router = Router();

router.use(protect);

export default router;
