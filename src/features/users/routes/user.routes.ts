// express imports
import { Router } from "express";

// controller imports
import UserController from "../controllers/users/user.controller";

// middleware imports
import { protect } from "@shared/index";
import { userMiddleware } from "@features/users/middlewares/users/user.middleware";
// multer import
import { upload } from "@config/multer.config";

// Create an instance of UserController
const userController = new UserController();

// Initialize router
const router: Router = Router();

// Define user-related routes

// shared middleware to protect all routes
router.use(protect);

// Profile management
router.get("/profile", userController.getProfile);

router.patch(
  "/profile/picture",
  upload.single("profilePicture"),
  userMiddleware.validateUpdateUserProfilePicture,
  userController.updateProfilePicture
);
router.patch(
  "/profile/information",
  userMiddleware.validateUpdateUserProfileInformation,
  userController.updateProfileInformation
);

// Password management
router.patch("/account/password", userController.changeAccountPassword);

// Account deletion
router.post("/account/deletion-request", userController.requestAccountDeletion);
router.delete(
  "/account/confirm-deletion",
  userController.confirmAccountDeletion
);

// Account activation/deactivation
router.post("/account/activate", userController.activateAccount);
router.post("/account/deactivate", userController.deactivateAccount);

// Notification management
router.post(
  "/account/notifications/enable",
  userController.enableAccountNotifications
);
router.post(
  "/account/notifications/disable",
  userController.disableAccountNotifications
);

// Email change
router.post(
  "/account/email/change-request",
  userController.requestAccountEmailChange
);
router.patch(
  "/account/email/confirm-change",
  userController.confirmAccountEmailChange
);

// Social accounts (No need for `protect` as it's already applied globally)
router.post("/account/social/link", userController.addSocialAccount);
router.delete("/account/social/unlink", userController.removeSocialAccount);

// Data export
router.get("/account/export-data", userController.exportAccountData);

export default router;
