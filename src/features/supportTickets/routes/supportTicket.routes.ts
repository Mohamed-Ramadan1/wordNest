// Express imports
import { Router } from "express";
// shared imports
import { protect } from "@shared/index";
// config imports
import { upload } from "@config/multer.config";

// middleware imports
import { SupportTicketsMiddleware } from "../middlewares/users/supportTickets.middleware";

// controller imports
import { SupportTicketController } from "../controllers/users/supportTickets.controller";

// instantiate the support ticket controller
const supportTicketController = new SupportTicketController();

// create  the express router
const router: Router = Router();

router.use(protect);

router
  .route("/")
  .get(supportTicketController.getAllUserSupportTickets)
  .post(
    upload.single("attachment"),
    SupportTicketsMiddleware.validateCreateSupportTicket,
    supportTicketController.createSupportTicket
  );

// Route to get a specific support ticket by ID
router.route("/:ticketId").get(supportTicketController.getSupportTicketById);

// Route to reply to a specific support ticket
router.put(
  "/:ticketId/reply",

  supportTicketController.replaySupportTicket
);

export default router;
