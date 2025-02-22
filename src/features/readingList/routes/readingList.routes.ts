// Express imports
import { Router } from "express";
// shared imports
import { protect } from "@shared/index";

// middleware imports
import { ReadingListCRUDMiddleware } from "../middlewares/readingListCRUD.middleware";
import { ReadingListManagementMiddleware } from "../middlewares/readingListManagement.middleware";
import { ReadingListSettingsMiddleware } from "../middlewares/readingListSettings.middleware";

// controllers imports
import { ReadingListCRUDController } from "../controllers/readingListCRUD.controller";
import { ReadingListManagementController } from "../controllers/readingListManagement.controller";
import { ReadingListSettingsController } from "../controllers/readingListSettings.controller";

// initialize the controllers
const readingListCRUDController = new ReadingListCRUDController();
const readingListManagementController = new ReadingListManagementController();
const readingListSettingsController = new ReadingListSettingsController();

// create  the express router
const router: Router = Router();

router.use(protect);

// CRUD related routes
router
  .route("/")
  .get(readingListCRUDController.getAllReadingListItems)
  .post(
    ReadingListCRUDMiddleware.validateCreateReadingListItem,
    readingListCRUDController.createReadingListItem
  );

router
  .route("/:id")
  .get(readingListCRUDController.getReadingListItem)
  .delete(readingListCRUDController.deleteReadingListItem);

export default router;
