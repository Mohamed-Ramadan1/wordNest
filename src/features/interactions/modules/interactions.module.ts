import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@config/containerTypes.config";

// Interface imports
import { IInteractionsService } from "../interfaces/interactionsService.interface";
import { IInteractionsRepository } from "../interfaces/InteractionsRepository.interface";

// Service  imports
import { InteractionsService } from "../services/interactions.service";

// Controller imports
import { InteractionsController } from "../controllers/interactions.controller";

// Repository imports
import { InteractionsRepository } from "../repositories/interactions.repository";

/**
 * This module encapsulates the bindings for the Interactions feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Binding the repository to its interface
  bind<IInteractionsRepository>(TYPES.InteractionsRepository)
    .to(InteractionsRepository)
    .inSingletonScope();

  // Binding the service to its interface
  bind<IInteractionsService>(TYPES.InteractionService)
    .to(InteractionsService)
    .inSingletonScope();

  // Binding the controller to its type
  bind<InteractionsController>(TYPES.InteractionsController)
    .to(InteractionsController)
    .inSingletonScope();
});
