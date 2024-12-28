// express imports
import { Router } from "express";

// multer config import
import { upload } from "@config/multer.config";

// middleware imports
import { protect } from "@shared/index";
import { ProfileMiddleware } from "@features/users/middlewares/users/profile.middleware";
import { AccountPasswordManagementMiddleware } from "../middlewares/users/accountPasswordManagement.middleware";
import { AccountNotificationMiddleware } from "../middlewares/users/accountNotification.middleware";

// controller imports
import { ProfileController } from "../controllers/users/profile.controller";
import { AccountNotificationController } from "../controllers/users/accountNotification.controller";
import { AccountEmailController } from "../controllers/users/accountEmail.controller";
import { AccountDeletionController } from "../controllers/users/accountDeletion.controller";
import { AccountPasswordManagementController } from "../controllers/users/accountPasswordManagement.controller";
import { AccountStatusController } from "../controllers/users/accountStatus.controller";

// Create an instance of UserController
const profileController = new ProfileController();
const accountDeletionController = new AccountDeletionController();
const accountNotificationController = new AccountNotificationController();
const accountStatusController = new AccountStatusController();
const accountEmailController = new AccountEmailController();
const accountPasswordManagementController =
  new AccountPasswordManagementController();

// Initialize router
const router: Router = Router();

// Define user-related routes

// shared middleware to protect all routes
router.use(protect);

// Profile management
router.get("/profile", profileController.getProfile);

router.patch(
  "/profile/picture",
  upload.single("profilePicture"),
  ProfileMiddleware.validateUpdateUserProfilePicture,
  profileController.updateProfilePicture
);
router.patch(
  "/profile/information",
  ProfileMiddleware.validateUpdateUserProfileInformation,
  profileController.updateProfileInformation
);

// Password management
router.patch(
  "/account/password",
  AccountPasswordManagementMiddleware.validateChangeAccountPassword,
  accountPasswordManagementController.changeAccountPassword
);

// Account deletion
router.post(
  "/account/deletion-request",
  accountDeletionController.requestAccountDeletion
);
router.delete(
  "/account/confirm-deletion",
  accountDeletionController.confirmAccountDeletion
);

// Account activation/deactivation
router.post("/account/activate", accountStatusController.activateAccount);
router.post("/account/deactivate", accountStatusController.deactivateAccount);

// Notification management
router.patch(
  "/account/notifications/enable",
  AccountNotificationMiddleware.validateEnableAccountNotifications,
  accountNotificationController.enableAccountNotifications
);
router.patch(
  "/account/notifications/disable",
  AccountNotificationMiddleware.validateDisableAccountNotifications,
  accountNotificationController.disableAccountNotifications
);

// Email change
router.post(
  "/account/email/change-request",
  accountEmailController.requestAccountEmailChange
);
router.patch(
  "/account/email/confirm-change",
  accountEmailController.confirmAccountEmailChange
);

// Data export

export default router;
