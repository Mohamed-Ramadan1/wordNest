import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/types/containerTypes";
import { Model } from "mongoose";
// model imports
import { FavoriteModel } from "../models/favorites.model";

// services imports
import { FavoritesService } from "../services/favorites.service";

// repository imports
import { FavoritesRepository } from "../repositories/favorites.repository";

// middlewares imports
import { FavoritesMiddleware } from "../middlewares/favorites.middleware";

// controllers imports
import { FavoritesController } from "../controllers/favorites.controller";

// interfaces imports
import {
  IFavoritesService,
  IFavorite,
  IFavoritesRepository,
  IFavoritesMiddleware,
} from "../interfaces/index";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  bind<Model<IFavorite>>(TYPES.FavoriteModel).toConstantValue(FavoriteModel);
  // Binding the repository to its interface
  bind<IFavoritesService>(TYPES.FavoritesService)
    .to(FavoritesService)
    .inSingletonScope();
  bind<FavoritesController>(TYPES.FavoritesController)
    .to(FavoritesController)
    .inSingletonScope();

  bind<IFavoritesMiddleware>(TYPES.FavoritesMiddleware)
    .to(FavoritesMiddleware)
    .inSingletonScope();

  bind<IFavoritesRepository>(TYPES.FavoritesRepository)
    .to(FavoritesRepository)
    .inSingletonScope();
});
