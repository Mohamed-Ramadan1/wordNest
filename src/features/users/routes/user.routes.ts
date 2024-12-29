// express imports
import { Router } from "express";

// multer config import
import { upload } from "@config/multer.config";

// middleware imports
import { protect } from "@shared/index";
import { ProfileMiddleware } from "@features/users/middlewares/users/profile.middleware";
import { AccountPasswordManagementMiddleware } from "../middlewares/users/accountPasswordManagement.middleware";
import { AccountNotificationMiddleware } from "../middlewares/users/accountNotification.middleware";
import { AccountStatusMiddleware } from "../middlewares/users/accountStatus.middleware";

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

// Profile management
router.get("/profile", protect, profileController.getProfile);

router.patch(
  "/profile/picture",
  protect,
  upload.single("profilePicture"),
  ProfileMiddleware.validateUpdateUserProfilePicture,
  profileController.updateProfilePicture
);
router.patch(
  "/profile/information",
  protect,
  ProfileMiddleware.validateUpdateUserProfileInformation,
  profileController.updateProfileInformation
);

// Password management
router.patch(
  "/account/password",
  protect,
  AccountPasswordManagementMiddleware.validateChangeAccountPassword,
  accountPasswordManagementController.changeAccountPassword
);

// Account deletion
router.post(
  "/account/deletion-request",
  protect,
  accountDeletionController.requestAccountDeletion
);
router.delete(
  "/account/confirm-deletion",
  protect,
  accountDeletionController.confirmAccountDeletion
);

// Account activation
router.post(
  "/account/activate/:token",

  AccountStatusMiddleware.validateActivateAccount,
  accountStatusController.activateAccount
);
router.post(
  "/account/deactivate-request",
  protect,
  AccountStatusMiddleware.validateDeactivateAccountRequest,
  accountStatusController.deactivateAccountRequest
);
//(No need to protect this route will be use by non authenticated user).
router.post(
  "/account/deactivate-confirm/:token",
  AccountStatusMiddleware.validateDeactivateAccountConfirmation,
  accountStatusController.deactivateAccountConfirmation
);

// Notification management
router.patch(
  "/account/notifications/enable",
  protect,
  AccountNotificationMiddleware.validateEnableAccountNotifications,
  accountNotificationController.enableAccountNotifications
);
router.patch(
  "/account/notifications/disable",
  protect,
  AccountNotificationMiddleware.validateDisableAccountNotifications,
  accountNotificationController.disableAccountNotifications
);

// Email change
router.post(
  "/account/email/change-request",
  protect,
  accountEmailController.requestAccountEmailChange
);
router.patch(
  "/account/email/confirm-change",
  protect,
  accountEmailController.confirmAccountEmailChange
);

// Data export

export default router;
