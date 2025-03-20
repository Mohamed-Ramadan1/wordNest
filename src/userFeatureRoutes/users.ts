// express imports
import { Router } from "express";

// multer config import
import { upload } from "@config/multer.config";
import { container } from "@config/inversify.config";

// middleware imports
import { protect, TYPES } from "@shared/index";
import { ProfileMiddleware } from "@features/users/middlewares/users/profile.middleware";
import { AccountPasswordManagementMiddleware } from "@features/users/middlewares/users/accountPasswordManagement.middleware";
import { AccountNotificationMiddleware } from "@features/users/middlewares/users/accountNotification.middleware";
import { AccountStatusMiddleware } from "@features/users/middlewares/users/accountStatus.middleware";
import { AccountDeletionMiddleware } from "@features/users/middlewares/users/accountDeletion.middleware";
import { AccountEmailMiddleware } from "@features/users/middlewares/users/accountEmail.middleware";
// controller imports
import { ProfileController } from "@features/users/controllers/users/profile.controller";
import { AccountNotificationController } from "@features/users/controllers/users/accountNotification.controller";
import { AccountEmailController } from "@features/users/controllers/users/accountEmail.controller";
import { AccountDeletionController } from "@features/users/controllers/users/accountDeletion.controller";
import { AccountPasswordManagementController } from "@features/users/controllers/users/accountPasswordManagement.controller";
import { AccountStatusController } from "@features/users/controllers/users/accountStatus.controller";

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

// middleware creation for using container
const accountDeletionMiddleware = container.get<AccountDeletionMiddleware>(
  TYPES.AccountDeletionMiddleware
);

const accountNotificationMiddleware =
  container.get<AccountNotificationMiddleware>(
    TYPES.AccountNotificationMiddleware
  );

const accountStatusMiddleware = container.get<AccountStatusMiddleware>(
  TYPES.AccountStatusMiddleware
);

const accountEmailMiddleware = container.get<AccountEmailMiddleware>(
  TYPES.AccountEmailMiddleware
);

const profileMiddleware = container.get<ProfileMiddleware>(
  TYPES.ProfileMiddleware
);

const accountPasswordManagement =
  container.get<AccountPasswordManagementMiddleware>(
    TYPES.AccountPasswordManagementMiddleware
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
  profileMiddleware.validateUpdateUserProfilePicture,
  profileController.updateProfilePicture
);
router.patch(
  "/profile/information",
  protect,
  profileMiddleware.validateUpdateUserProfileInformation,
  profileController.updateProfileInformation
);

// Password management
router.patch(
  "/account/password",
  protect,
  accountPasswordManagement.validateChangeAccountPassword,
  accountPasswordManagementController.changeAccountPassword
);

// Account deletion
router.post(
  "/account/deletion-request",
  protect,
  accountDeletionMiddleware.validateRequestAccountDeletion,
  accountDeletionController.requestAccountDeletion
);
router.delete(
  "/account/confirm-deletion/:token",
  accountDeletionMiddleware.validateConfirmAccountDeletion,
  accountDeletionController.confirmAccountDeletion
);

// Account activation
router.post(
  "/account/activate/:token",

  accountStatusMiddleware.validateActivateAccount,
  accountStatusController.activateAccount
);
router.post(
  "/account/deactivate-request",
  protect,
  accountStatusMiddleware.validateDeactivateAccountRequest,
  accountStatusController.deactivateAccountRequest
);
//(No need to protect this route will be use by non authenticated user).
router.post(
  "/account/deactivate-confirm/:token",
  accountStatusMiddleware.validateDeactivateAccountConfirmation,
  accountStatusController.deactivateAccountConfirmation
);

// Notification management
router.patch(
  "/account/notifications/enable",
  protect,
  accountNotificationMiddleware.validateEnableAccountNotifications,
  accountNotificationController.enableAccountNotifications
);
router.patch(
  "/account/notifications/disable",
  protect,
  accountNotificationMiddleware.validateDisableAccountNotifications,
  accountNotificationController.disableAccountNotifications
);

// Email change
// Initiate email change process
router.post(
  "/account/email/change-request",
  protect,
  accountEmailMiddleware.validateChangeEmailRequest,
  accountEmailController.requestAccountEmailChange
);

// Confirm email change with token sent to current email
router.patch(
  "/account/email/confirm-change/:token",
  accountEmailMiddleware.validateConfirmEmailChange,
  accountEmailController.confirmAccountEmailChange
);

// Verify ownership of the new email with token
router.patch(
  "/account/email/verify-new-email/:token",

  accountEmailMiddleware.validateVerifyNewEmailOwnership,
  accountEmailController.verifyNewEmailOwnership
);

// Resend verification token to the new email
router.post(
  "/account/email/resend-new-email-token",
  protect,
  accountEmailMiddleware.validateResendNewEmailVerificationToken,
  accountEmailController.resendNewEmailVerificationToken
);

export default router;
