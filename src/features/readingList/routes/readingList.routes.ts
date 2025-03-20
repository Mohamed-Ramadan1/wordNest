// Express imports
import { Router } from "express";
// shared imports
import { protect, TYPES } from "@shared/index";
import { container } from "@config/inversify.config";

// middleware imports
import { ReadingListCRUDMiddleware } from "../middlewares/readingListCRUD.middleware";
import { ReadingListSettingsMiddleware } from "../middlewares/readingListSettings.middleware";

// controllers imports
import { ReadingListCRUDController } from "../controllers/readingListCRUD.controller";
import { ReadingListManagementController } from "../controllers/readingListManagement.controller";
import { ReadingListSettingsController } from "../controllers/readingListSettings.controller";

// initialize the controllers
const readingListCRUDController = container.get<ReadingListCRUDController>(
  TYPES.ReadingListCRUDController
);
const readingListManagementController =
  container.get<ReadingListManagementController>(
    TYPES.ReadingListManagementController
  );

const readingListSettingsController =
  container.get<ReadingListSettingsController>(
    TYPES.ReadingListSettingsController
  );

// middleware initialization
const readingListCRUDMiddleware = container.get<ReadingListCRUDMiddleware>(
  TYPES.ReadingListCRUDMiddleware
);

const readingListSettingsMiddleware =
  container.get<ReadingListSettingsMiddleware>(
    TYPES.ReadingListSettingsMiddleware
  );

// create  the express router
const router: Router = Router();

router.use(protect);

// CRUD related routes
router
  .route("/")
  .get(readingListCRUDController.getAllReadingListItems)
  .post(
    readingListCRUDMiddleware.validateCreateReadingListItem,
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
  readingListSettingsMiddleware.validateCreateReminderAlert,
  readingListSettingsMiddleware.validateAlertTimeFormateDate,
  readingListSettingsMiddleware.createReadingReminderAlert,
  readingListSettingsController.setReminderAlert
);

router.patch(
  "/items/:itemId/reminder-reschedule",
  readingListSettingsMiddleware.validateReScheduleReminderAlert,
  readingListSettingsMiddleware.validateAlertTimeFormateDate,
  readingListSettingsMiddleware.createReadingReminderAlert,
  readingListSettingsController.reScheduleReminderAlert
);

router.delete(
  "/items/:itemId/reminder-delete",
  readingListSettingsMiddleware.validateDeleteReminderAlert,
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
