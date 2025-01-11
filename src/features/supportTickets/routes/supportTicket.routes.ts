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

// Route to create a new support ticket
router.post(
  "/tickets",
  upload.single("attachment"),
  supportTicketController.createSupportTicket
);

// Route to get all support tickets for the current user
router.get(
  "/tickets",

  supportTicketController.getAllUserSupportTickets
);

// Route to get a specific support ticket by ID
router.get(
  "/tickets/:id",

  supportTicketController.getSupportTicketById
);

// Route to reply to a specific support ticket
router.put(
  "/tickets/:id/reply",

  supportTicketController.replaySupportTicket
);

export default router;
