// express imports
import { Router } from "express";

// multer config import
import { upload } from "@config/multer.config";
import { container } from "@config/inversify.config";
import { TYPES } from "@shared/index";

// middleware imports
import { protect } from "@shared/index";
import { ProfileMiddleware } from "@features/users_feature/middlewares/users/profile.middleware";
import { AccountPasswordManagementMiddleware } from "@features/users_feature/middlewares/users/accountPasswordManagement.middleware";
import { AccountNotificationMiddleware } from "@features/users_feature/middlewares/users/accountNotification.middleware";
import { AccountStatusMiddleware } from "@features/users_feature/middlewares/users/accountStatus.middleware";
import { AccountDeletionMiddleware } from "@features/users_feature/middlewares/users/accountDeletion.middleware";
import { AccountEmailMiddleware } from "@features/users_feature/middlewares/users/accountEmail.middleware";
// controller imports
import { ProfileController } from "@features/users_feature/controllers/users/profile.controller";
import { AccountNotificationController } from "@features/users_feature/controllers/users/accountNotification.controller";
import { AccountEmailController } from "@features/users_feature/controllers/users/accountEmail.controller";
import { AccountDeletionController } from "@features/users_feature/controllers/users/accountDeletion.controller";
import { AccountPasswordManagementController } from "@features/users_feature/controllers/users/accountPasswordManagement.controller";
import { AccountStatusController } from "@features/users_feature/controllers/users/accountStatus.controller";

// Create an instance of UserController
const profileController = container.get<ProfileController>(
  TYPES.ProfileController
);

const accountDeletionController = container.get<AccountDeletionController>(
  TYPES.AccountDeletionController
);

const accountNotificationController =
  container.get<AccountNotificationController>(
    TYPES.AccountNotificationController
  );
const accountStatusController = container.get<AccountStatusController>(
  TYPES.AccountStatusController
);

const accountEmailController = container.get<AccountEmailController>(
  TYPES.AccountEmailController
);

const accountPasswordManagementController =
  container.get<AccountPasswordManagementController>(
    TYPES.AccountPasswordManagementController
  );

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
  AccountDeletionMiddleware.validateRequestAccountDeletion,
  accountDeletionController.requestAccountDeletion
);
router.delete(
  "/account/confirm-deletion/:token",
  AccountDeletionMiddleware.validateConfirmAccountDeletion,
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
// Initiate email change process
router.post(
  "/account/email/change-request",
  protect,
  AccountEmailMiddleware.validateChangeEmailRequest,
  accountEmailController.requestAccountEmailChange
);

// Confirm email change with token sent to current email
router.patch(
  "/account/email/confirm-change/:token",
  AccountEmailMiddleware.validateConfirmEmailChange,
  accountEmailController.confirmAccountEmailChange
);

// Verify ownership of the new email with token
router.patch(
  "/account/email/verify-new-email/:token",

  AccountEmailMiddleware.validateVerifyNewEmailOwnership,
  accountEmailController.verifyNewEmailOwnership
);

// Resend verification token to the new email
router.post(
  "/account/email/resend-new-email-token",
  protect,
  AccountEmailMiddleware.validateResendNewEmailVerificationToken,
  accountEmailController.resendNewEmailVerificationToken
);

export default router;
