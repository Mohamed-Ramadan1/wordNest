import { Router } from "express";
import { protect, restrictTo } from "@shared/index";
import { upload } from "@config/multer.config";

// middleware imports
import { TicketCRUDMiddleware } from "../middlewares/admin/ticketsCRUD.middleware";
import { TicketPriorityMiddleware } from "../middlewares/admin/ticketPriority.middleware";
import { TicketResponseMiddleware } from "../middlewares/admin/ticketResponse.middleware";
import { TicketStatusMiddleware } from "../middlewares/admin/ticketStatus.middleware";

// controller imports
import { TicketsCRUDController } from "../controllers/admin/ticketsCRUD.controller";
import { TicketStatusController } from "../controllers/admin/ticketStatus.controller";
import { TicketPriorityController } from "../controllers/admin/ticketPriority.controller";
import { TicketResponseController } from "../controllers/admin/ticketResponse.controller";

// instantiate the controllers
const ticketsCRUDController = new TicketsCRUDController();
const ticketStatusController = new TicketStatusController();
const ticketPriorityController = new TicketPriorityController();
const ticketResponseController = new TicketResponseController();

// create  the express router
const router: Router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router
  .route("/")
  .get(ticketsCRUDController.getAllTickets)
  .post(
    upload.single("attachment"),
    TicketCRUDMiddleware.validateCreateTicket,
    ticketsCRUDController.createTicket
  );

router
  .route("/:ticketId")
  .get(ticketsCRUDController.getTicket)
  .patch(
    TicketCRUDMiddleware.validateUpdateTicket,
    ticketsCRUDController.updateTicket
  )
  .delete(
    TicketCRUDMiddleware.validateDeleteTicket,
    ticketsCRUDController.deleteTicket
  );

// ticket Priority related routes (upgrade and downgrade)
router
  .route("/:ticketId/priority")
  .patch(
    TicketPriorityMiddleware.validatePriorityChange,
    ticketPriorityController.changePriority
  );

// ticket status related routes (close and reopen).
router
  .route("/:ticketId/status/close")
  .patch(
    TicketStatusMiddleware.validateCloseTicket,
    ticketStatusController.closeTicket
  );

router
  .route("/:ticketId/status/reopen")
  .patch(
    TicketStatusMiddleware.validateReopenTicket,
    ticketStatusController.reopenTicket
  );

// ticket response related routes
router
  .route("/:ticketId/response")
  .post(
    upload.single("attachment"),
    TicketResponseMiddleware.validateRespondToTicket,
    ticketResponseController.respondToTicket
  );
export default router;
