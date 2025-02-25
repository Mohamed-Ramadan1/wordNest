import "reflect-metadata";
import { Container } from "inversify";
import { IInteractionsService } from "@features/interactions/interfaces/interactionsService.interface";
import { InteractionsService } from "@features/interactions/services/interactions.service";
import { InteractionsController } from "@features/interactions/controllers/interactions.controller";

import { TYPES } from "./containerTypes.config";

// Create an IoC container
const container = new Container();

// Bind service to its interface
container
  .bind<IInteractionsService>(TYPES.InteractionService) // Bind to interface
  .to(InteractionsService) // Provide the concrete implementation
  .inSingletonScope(); // Ensure only one instance is used

container
  .bind<InteractionsController>(TYPES.InteractionsController)
  .to(InteractionsController)
  .inSingletonScope();

export { container };
