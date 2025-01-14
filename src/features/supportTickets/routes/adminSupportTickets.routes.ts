import { Router } from "express";
import { protect, restrictTo } from "@shared/index";

// middleware imports

// controller imports
import { TicketsCRUDController } from "../controllers/admin/ticketsCRUD.controller";

// instantiate the controllers
const ticketsCRUDController = new TicketsCRUDController();

// create  the express router
const router: Router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router
  .route("/")
  .get(ticketsCRUDController.getAllTickets)
  .post(ticketsCRUDController.createTicket);

router
  .route("/:ticketId")
  .get(ticketsCRUDController.getTicket)
  .patch(ticketsCRUDController.updateTicket)
  .delete(ticketsCRUDController.deleteTicket);

export default router;
