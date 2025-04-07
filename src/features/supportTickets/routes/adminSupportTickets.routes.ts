import { Router } from "express";
import { AccessControlMiddleware, TYPES } from "@shared/index";
import { upload } from "@config/multer.config";
import { container } from "@config/inversify.config";

// middleware imports
import { TicketCRUDMiddleware } from "../middlewares/admin/ticketsCRUD.middleware";
import { TicketPriorityMiddleware } from "../middlewares/admin/ticketPriority.middleware";
import { TicketStatusMiddleware } from "../middlewares/admin/ticketStatus.middleware";
import { TicketResponseMiddleware } from "../middlewares/admin/ticketResponse.middleware";

// controller imports
import { TicketsCRUDController } from "../controllers/admin/ticketsCRUD.controller";
import { TicketStatusController } from "../controllers/admin/ticketStatus.controller";
import { TicketPriorityController } from "../controllers/admin/ticketPriority.controller";
import { TicketResponseController } from "../controllers/admin/ticketResponse.controller";

// shard instances initialization
const accessControllerMiddleware = container.get<AccessControlMiddleware>(
  TYPES.AccessControlMiddleware
);

// instantiate the controllers
const ticketsCRUDController = container.get<TicketsCRUDController>(
  TYPES.TicketsCRUDController
);
const ticketStatusController = container.get<TicketStatusController>(
  TYPES.TicketStatusController
);
const ticketPriorityController = container.get<TicketPriorityController>(
  TYPES.TicketPriorityController
);
const ticketResponseController = container.get<TicketResponseController>(
  TYPES.TicketResponseController
);

// middleware instance creation
const ticketCRUDMiddleware = container.get<TicketCRUDMiddleware>(
  TYPES.TicketCRUDMiddleware
);
const ticketPriorityMiddleware = container.get<TicketPriorityMiddleware>(
  TYPES.TicketPriorityMiddleware
);

const ticketStatusMiddleware = container.get<TicketStatusMiddleware>(
  TYPES.TicketStatusMiddleware
);

const ticketResponseMiddleware = container.get<TicketResponseMiddleware>(
  TYPES.TicketResponseMiddleware
);

// create  the express router
const router: Router = Router();

router.use(
  accessControllerMiddleware.protect,
  accessControllerMiddleware.restrictTo("admin")
);

router
  .route("/")
  .get(ticketsCRUDController.getAllTickets)
  .post(
    upload.single("attachment"),
    ticketCRUDMiddleware.validateCreateTicket,
    ticketsCRUDController.createTicket
  );

router
  .route("/:ticketId")
  .get(ticketsCRUDController.getTicket)
  .patch(
    ticketCRUDMiddleware.validateUpdateTicket,
    ticketsCRUDController.updateTicket
  )
  .delete(
    ticketCRUDMiddleware.validateDeleteTicket,
    ticketsCRUDController.deleteTicket
  );

// ticket Priority related routes (upgrade and downgrade)
router
  .route("/:ticketId/priority")
  .patch(
    ticketPriorityMiddleware.validatePriorityChange,
    ticketPriorityController.changePriority
  );

// ticket status related routes (close and reopen).
router
  .route("/:ticketId/status/close")
  .patch(
    ticketStatusMiddleware.validateCloseTicket,
    ticketStatusController.closeTicket
  );

router
  .route("/:ticketId/status/reopen")
  .patch(
    ticketStatusMiddleware.validateReopenTicket,
    ticketStatusController.reopenTicket
  );

// ticket response related routes
router
  .route("/:ticketId/response")
  .post(
    upload.single("attachment"),
    ticketResponseMiddleware.validateRespondToTicket,
    ticketResponseController.respondToTicket
  );
export default router;
