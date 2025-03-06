import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";

// controllers imports
import { TicketPriorityController } from "../controllers/admin/ticketPriority.controller";
import { TicketResponseController } from "../controllers/admin/ticketResponse.controller";
import { TicketStatusController } from "../controllers/admin/ticketStatus.controller";
import { TicketsCRUDController } from "../controllers/admin/ticketsCRUD.controller";
import { SupportTicketController } from "../controllers/users/supportTickets.controller";

// services imports
import { SupportTicketService } from "../services/users/supportTickets.service";
import { TicketPriorityService } from "../services/admin/ticketPriority.service";
import { TicketResponseService } from "../services/admin/ticketResponse.service";
import { TicketStatusService } from "../services/admin/ticketStatus.service";
import { TicketsCRUDService } from "../services/admin/ticketsCRUD.service";

// interfaces imports
import { ISupportTicketService } from "../interfaces/supportTicketsService.interface";
import { ITicketsCRUDService } from "../interfaces/ticketCRUDService.interface";
import { ITicketPriorityService } from "../interfaces/ticketPriorityService.interface";
import { ITicketResponseService } from "../interfaces/ticketResponseService.interface";
import { ITicketStatusService } from "../interfaces/ticketStatusService.interface";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Binding the service to its interface
  bind<ISupportTicketService>(TYPES.SupportTicketService)
    .to(SupportTicketService)
    .inSingletonScope();

  // Binding the controllers
  bind<SupportTicketController>(TYPES.SupportTicketController)
    .to(SupportTicketController)
    .inSingletonScope();

  // Binding the service to its interface
  bind<ITicketsCRUDService>(TYPES.TicketsCRUDService)
    .to(TicketsCRUDService)
    .inSingletonScope();

  // Binding the controllers
  bind<TicketsCRUDController>(TYPES.TicketsCRUDController)
    .to(TicketsCRUDController)
    .inSingletonScope();

  // Binding the service to its interface
  bind<ITicketPriorityService>(TYPES.TicketPriorityService)
    .to(TicketPriorityService)
    .inSingletonScope();

  // Binding the controllers
  bind<TicketPriorityController>(TYPES.TicketPriorityController)
    .to(TicketPriorityController)
    .inSingletonScope();
  // Binding the service to its interface
  bind<ITicketResponseService>(TYPES.TicketResponseService)
    .to(TicketResponseService)
    .inSingletonScope();
  // Binding the controllers
  bind<TicketResponseController>(TYPES.TicketResponseController)
    .to(TicketResponseController)
    .inSingletonScope();

  // Binding the service to its interface
  bind<ITicketStatusService>(TYPES.TicketStatusService)
    .to(TicketStatusService)
    .inSingletonScope();

  // Binding the controllers
  bind<TicketStatusController>(TYPES.TicketStatusController)
    .to(TicketStatusController)
    .inSingletonScope();
});
