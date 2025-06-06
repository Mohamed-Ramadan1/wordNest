//! You will find the routes at the path of     (src/userFeatureRoutes/users.ts)
//! and the reason of this wired behavior you will find file called important.txt contains the reason explained there .

// // express imports
// import { Router } from "express";

// // multer config import
// import { upload } from "@config/multer.config";
// import { container } from "@config/inversify.config";
// console.log(container, "dddd");

// // middleware imports
// import { protect } from "@shared/index";
// import { ProfileMiddleware } from "@features/users_feature/middlewares/users/profile.middleware";
// import { AccountPasswordManagementMiddleware } from "../middlewares/users/accountPasswordManagement.middleware";
// import { AccountNotificationMiddleware } from "../middlewares/users/accountNotification.middleware";
// import { AccountStatusMiddleware } from "../middlewares/users/accountStatus.middleware";
// import { AccountDeletionMiddleware } from "../middlewares/users/accountDeletion.middleware";
// import { AccountEmailMiddleware } from "../middlewares/users/accountEmail.middleware";
// // controller imports
// import { ProfileController } from "../controllers/users/profile.controller";
// import { AccountNotificationController } from "../controllers/users/accountNotification.controller";
// import { AccountEmailController } from "../controllers/users/accountEmail.controller";
// import { AccountDeletionController } from "../controllers/users/accountDeletion.controller";
// import { AccountPasswordManagementController } from "../controllers/users/accountPasswordManagement.controller";
// import { AccountStatusController } from "../controllers/users/accountStatus.controller";

// // Create an instance of UserController
// const profileController = new ProfileController();
// const accountDeletionController = new AccountDeletionController();
// const accountNotificationController = new AccountNotificationController();
// const accountStatusController = new AccountStatusController();
// const accountEmailController = new AccountEmailController();
// const accountPasswordManagementController =
//   new AccountPasswordManagementController();

// // Initialize router
// const router: Router = Router();

// // Define user-related routes

// // Profile management
// router.get("/profile", protect, profileController.getProfile);

// router.patch(
//   "/profile/picture",
//   protect,
//   upload.single("profilePicture"),
//   ProfileMiddleware.validateUpdateUserProfilePicture,
//   profileController.updateProfilePicture
// );
// router.patch(
//   "/profile/information",
//   protect,
//   ProfileMiddleware.validateUpdateUserProfileInformation,
//   profileController.updateProfileInformation
// );

// // Password management
// router.patch(
//   "/account/password",
//   protect,
//   AccountPasswordManagementMiddleware.validateChangeAccountPassword,
//   accountPasswordManagementController.changeAccountPassword
// );

// // Account deletion
// router.post(
//   "/account/deletion-request",
//   protect,
//   AccountDeletionMiddleware.validateRequestAccountDeletion,
//   accountDeletionController.requestAccountDeletion
// );
// router.delete(
//   "/account/confirm-deletion/:token",
//   AccountDeletionMiddleware.validateConfirmAccountDeletion,
//   accountDeletionController.confirmAccountDeletion
// );

// // Account activation
// router.post(
//   "/account/activate/:token",

//   AccountStatusMiddleware.validateActivateAccount,
//   accountStatusController.activateAccount
// );
// router.post(
//   "/account/deactivate-request",
//   protect,
//   AccountStatusMiddleware.validateDeactivateAccountRequest,
//   accountStatusController.deactivateAccountRequest
// );
// //(No need to protect this route will be use by non authenticated user).
// router.post(
//   "/account/deactivate-confirm/:token",
//   AccountStatusMiddleware.validateDeactivateAccountConfirmation,
//   accountStatusController.deactivateAccountConfirmation
// );

// // Notification management
// router.patch(
//   "/account/notifications/enable",
//   protect,
//   AccountNotificationMiddleware.validateEnableAccountNotifications,
//   accountNotificationController.enableAccountNotifications
// );
// router.patch(
//   "/account/notifications/disable",
//   protect,
//   AccountNotificationMiddleware.validateDisableAccountNotifications,
//   accountNotificationController.disableAccountNotifications
// );

// // Email change
// // Initiate email change process
// router.post(
//   "/account/email/change-request",
//   protect,
//   AccountEmailMiddleware.validateChangeEmailRequest,
//   accountEmailController.requestAccountEmailChange
// );

// // Confirm email change with token sent to current email
// router.patch(
//   "/account/email/confirm-change/:token",
//   AccountEmailMiddleware.validateConfirmEmailChange,
//   accountEmailController.confirmAccountEmailChange
// );

// // Verify ownership of the new email with token
// router.patch(
//   "/account/email/verify-new-email/:token",

//   AccountEmailMiddleware.validateVerifyNewEmailOwnership,
//   accountEmailController.verifyNewEmailOwnership
// );

// // Resend verification token to the new email
// router.post(
//   "/account/email/resend-new-email-token",
//   protect,
//   AccountEmailMiddleware.validateResendNewEmailVerificationToken,
//   accountEmailController.resendNewEmailVerificationToken
// );

// export default router;
