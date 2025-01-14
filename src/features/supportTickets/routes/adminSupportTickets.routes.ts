import { Router } from "express";
import { protect, restrictTo } from "@shared/index";
import { upload } from "@config/multer.config";

// middleware imports
import { TicketCRUDMiddleware } from "../middlewares/admin/ticketsCRUD.middleware";

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
  .post(
    upload.single("attachment"),
    TicketCRUDMiddleware.validateCreateTicket,
    ticketsCRUDController.createTicket
  );

router
  .route("/:ticketId")
  .get(ticketsCRUDController.getTicket)
  .patch(ticketsCRUDController.updateTicket)
  .delete(ticketsCRUDController.deleteTicket);

export default router;
