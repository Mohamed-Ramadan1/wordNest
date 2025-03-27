import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";
import { Model } from "mongoose";

// Interface imports

import {
  IInteraction,
  IInteractionsService,
  IInteractionsRepository,
} from "../interfaces/index";
import { InteractionModel } from "../models/interactions.model";
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
  // binding the interactions models
  bind<Model<IInteraction>>(TYPES.InteractionsModel).toConstantValue(
    InteractionModel
  );
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
