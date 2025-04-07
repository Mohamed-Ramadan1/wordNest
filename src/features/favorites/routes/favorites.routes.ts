// Express imports
import { Router } from "express";

import { container } from "@config/inversify.config";
// shared imports
import { AccessControlMiddleware, TYPES } from "@shared/index";

// middleware imports
import { FavoritesMiddleware } from "../middlewares/favorites.middleware";

// controllers imports
import { FavoritesController } from "../controllers/favorites.controller";

// shard instances initialization
const accessControllerMiddleware = container.get<AccessControlMiddleware>(
  TYPES.AccessControlMiddleware
);

// controllers initialization
const favoritesController = container.get<FavoritesController>(
  TYPES.FavoritesController
);

const favoritesMiddleware = container.get<FavoritesMiddleware>(
  TYPES.FavoritesMiddleware
);

// create  the express router
const router: Router = Router();

router.use(accessControllerMiddleware.protect);

// define the routes
router
  .route("/")
  .get(favoritesController.getFavorites)
  .post(
    favoritesMiddleware.validateAddToFavorites,
    favoritesController.addToFavorites
  );

router
  .route("/:favoriteId")
  .get(favoritesController.getFavorite)
  .delete(favoritesController.removeFromFavorites);

export default router;
