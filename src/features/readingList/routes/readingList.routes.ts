// Express imports
import { Router } from "express";
// shared imports
import { protect } from "@shared/index";

// middleware imports
import { ReadingListCRUDMiddleware } from "../middlewares/readingListCRUD.middleware";
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
  )
  .delete(readingListManagementController.clearReadingList);

router
  .route("/:id")
  .get(readingListCRUDController.getReadingListItem)
  .delete(readingListCRUDController.deleteReadingListItem);

// Management related routes
router.patch(
  "/items/:itemId/unread",
  readingListManagementController.markListItemAsUnread
);

router.patch(
  "/items/:itemId/completed",
  readingListManagementController.markListItemAsCompleted
);

router.patch(
  "/items/:itemId/reading",
  readingListManagementController.markListItemAsReading
);

// Settings related routes
router.post(
  "/items/:itemId/reminder-alert",
  ReadingListSettingsMiddleware.validateCreateReminderAlert,
  ReadingListSettingsMiddleware.validateAlertTimeFormateDate,
  ReadingListSettingsMiddleware.createReadingReminderAlert,
  readingListSettingsController.setReminderAlert
);

router.patch(
  "/items/:itemId/reminder-reschedule",
  ReadingListSettingsMiddleware.validateReScheduleReminderAlert,
  ReadingListSettingsMiddleware.validateAlertTimeFormateDate,
  ReadingListSettingsMiddleware.createReadingReminderAlert,
  readingListSettingsController.reScheduleReminderAlert
);

router.delete(
  "/items/:itemId/reminder-delete",
  ReadingListSettingsMiddleware.validateDeleteReminderAlert,
  readingListSettingsController.deleteReminderAlert
);

router.patch(
  "/items/:itemId/auto-remove",
  readingListSettingsController.allowAutoRemoveReadingListItem
);

router.patch(
  "/items/:itemId/auto-remove-disable",
  readingListSettingsController.disableAutoRemoveReadingListItem
);

export default router;
