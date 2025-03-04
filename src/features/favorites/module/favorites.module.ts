import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/types/containerTypes";

// services imports
import { FavoritesService } from "../services/favorites.service";

// controllers imports
import { FavoritesController } from "../controllers/favorites.controller";

// interfaces imports
import { IFavoritesService } from "../interfaces/favoritesService.interface";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Binding the repository to its interface
  bind<IFavoritesService>(TYPES.FavoritesService)
    .to(FavoritesService)
    .inSingletonScope();
  bind<FavoritesController>(TYPES.FavoritesController)
    .to(FavoritesController)
    .inSingletonScope();
});
