// express imports
import { Router } from "express";

// controller imports
import { ProfileController } from "../controllers/users/profile.controller";
import { AccountSettingsController } from "../controllers/users/accountSettings.controller";
import { AccountNotificationController } from "../controllers/users/accountNotification.controller";
import { AccountEmailController } from "../controllers/users/accountEmail.controller";

// middleware imports
import { protect } from "@shared/index";
import { ProfileMiddleware } from "@features/users/middlewares/users/profile.middleware";
// multer import
import { upload } from "@config/multer.config";

// Create an instance of UserController
const profileController = new ProfileController();
const accountSettingsController = new AccountSettingsController();
const accountNotificationController = new AccountNotificationController();
const accountEmailController = new AccountEmailController();

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
  accountSettingsController.changeAccountPassword
);

// Account deletion
router.post(
  "/account/deletion-request",
  accountSettingsController.requestAccountDeletion
);
router.delete(
  "/account/confirm-deletion",
  accountSettingsController.confirmAccountDeletion
);

// Account activation/deactivation
router.post("/account/activate", accountSettingsController.activateAccount);
router.post("/account/deactivate", accountSettingsController.deactivateAccount);

// Notification management
router.post(
  "/account/notifications/enable",
  accountNotificationController.enableAccountNotifications
);
router.post(
  "/account/notifications/disable",
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
