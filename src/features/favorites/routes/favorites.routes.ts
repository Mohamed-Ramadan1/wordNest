// Express imports
import { Router } from "express";
import { TYPES } from "@shared/types/containerTypes";
import { container } from "@config/inversify.config";
// shared imports
import { protect } from "@shared/index";

// middleware imports
import { FavoritesMiddleware } from "../middlewares/favorites.middleware";

// controllers imports
import { FavoritesController } from "../controllers/favorites.controller";

// controllers initialization
const favoritesController = container.get<FavoritesController>(
  TYPES.FavoritesController
);

// create  the express router
const router: Router = Router();

router.use(protect);

// define the routes
router
  .route("/")
  .get(favoritesController.getFavorites)
  .post(
    FavoritesMiddleware.validateAddToFavorites,
    favoritesController.addToFavorites
  );

router
  .route("/:favoriteId")
  .get(favoritesController.getFavorite)
  .delete(favoritesController.removeFromFavorites);

export default router;
