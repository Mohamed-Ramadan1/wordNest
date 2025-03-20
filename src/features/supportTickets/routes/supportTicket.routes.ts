// Express imports
import { Router } from "express";
// shared imports
import { protect, TYPES } from "@shared/index";
// config imports
import { upload } from "@config/multer.config";
import { container } from "@config/inversify.config";

// middleware imports
import { SupportTicketsMiddleware } from "../middlewares/users/supportTickets.middleware";

// controller imports
import { SupportTicketController } from "../controllers/users/supportTickets.controller";

// instantiate the support ticket controller
const supportTicketController = container.get<SupportTicketController>(
  TYPES.SupportTicketController
);

// middleware instance creation
const supportTicketsMiddleware = container.get<SupportTicketsMiddleware>(
  TYPES.SupportTicketsMiddleware
);
// create  the express router
const router: Router = Router();

router.use(protect);

router
  .route("/")
  .get(supportTicketController.getAllUserSupportTickets)
  .post(
    upload.single("attachment"),
    supportTicketsMiddleware.validateCreateSupportTicket,
    supportTicketController.createSupportTicket
  );

// Route to get a specific support ticket by ID
router.route("/:ticketId").get(supportTicketController.getSupportTicketById);

// Route to reply to a specific support ticket
router.post(
  "/:ticketId/reply",
  upload.single("attachment"),
  supportTicketsMiddleware.validateReplaySupportTicket,
  supportTicketController.replaySupportTicket
);

export default router;
