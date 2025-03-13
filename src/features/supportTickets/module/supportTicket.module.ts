import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";

// package imports
import { Model } from "mongoose";

// model imports
import SupportTicketModel from "../models/supportTicket.model";

// repository imports
import { SupportTicketRepository } from "../repositories/supportTicket.repository";
import { SupportTicketManagementRepository } from "../repositories/supportTicketManagement.repository";

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

// middlewares imports
import { TicketPriorityMiddleware } from "../middlewares/admin/ticketPriority.middleware";
import { TicketResponseMiddleware } from "../middlewares/admin/ticketResponse.middleware";
import { TicketCRUDMiddleware } from "../middlewares/admin/ticketsCRUD.middleware";
import { TicketStatusMiddleware } from "../middlewares/admin/ticketStatus.middleware";
import { SupportTicketsMiddleware } from "../middlewares/users/supportTickets.middleware";

// interfaces imports
import {
  ISupportTicket,
  ISupportTicketService,
  ITicketsCRUDService,
  ITicketPriorityService,
  ITicketResponseService,
  ITicketStatusService,
  ISupportTicketsMiddleware,
  ITicketCRUDMiddleware,
  ITicketPriorityMiddleware,
  ITicketResponseMiddleware,
  ITicketStatusMiddleware,
  ISupportTicketManagementRepository,
  ISupportTicketRepository,
} from "../interfaces/index";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  bind<Model<ISupportTicket>>(TYPES.SupportTicketModel).toConstantValue(
    SupportTicketModel
  );

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

  // Binding the middlewares
  bind<ISupportTicketsMiddleware>(TYPES.SupportTicketsMiddleware)
    .to(SupportTicketsMiddleware)
    .inSingletonScope();
  // Binding the middlewares
  bind<ITicketCRUDMiddleware>(TYPES.TicketCRUDMiddleware)
    .to(TicketCRUDMiddleware)
    .inSingletonScope();
  // Binding the middlewares
  bind<ITicketPriorityMiddleware>(TYPES.TicketPriorityMiddleware)
    .to(TicketPriorityMiddleware)
    .inSingletonScope();
  // Binding the middlewares
  bind<ITicketResponseMiddleware>(TYPES.TicketResponseMiddleware)
    .to(TicketResponseMiddleware)
    .inSingletonScope();
  // Binding the middlewares
  bind<ITicketStatusMiddleware>(TYPES.TicketStatusMiddleware)
    .to(TicketStatusMiddleware)
    .inSingletonScope();

  // Binding the repository to its interface
  bind<ISupportTicketRepository>(TYPES.SupportTicketRepository)
    .to(SupportTicketRepository)
    .inSingletonScope();

  // Binding the repository to its interface
  bind<ISupportTicketManagementRepository>(
    TYPES.SupportTicketManagementRepository
  )
    .to(SupportTicketManagementRepository)
    .inSingletonScope();
});
