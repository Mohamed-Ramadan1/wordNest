// express imports
import { Router } from "express";

// configuration imports
import { container } from "@config/inversify.config";

// shared imports
import { TYPES } from "@shared/index";

// controllers imports
import AuthController from "../controllers/auth.controller";
import AccountRecoveryController from "../controllers/accountRecovery.controller";

// middleware imports
import AuthMiddleware from "../middlewares/auth.middleware";
import { AccountRecoveryMiddleware } from "../middlewares/accountRecovery.middleware";

// shared imports
import { protect } from "@shared/index";

// controllers instances (dependency injection)
const authController = container.get<AuthController>(TYPES.AuthController);
const accountRecoveryController = container.get<AccountRecoveryController>(
  TYPES.AccountRecoveryController
);

// middleware instances
const authMiddleware = new AuthMiddleware();

// Router instance
const router = Router();

// Register a new user with email address.
router
  .route("/register")
  .post(authMiddleware.validateRegistration, authController.emailRegister);

// Login a user with email address.
router
  .route("/login")
  .post(authMiddleware.validateLogin, authController.emailLogin);

// Log out auth user.
router.route("/logout").post(protect, authController.logout);

// OAuth register routes.
router.route("/social-register").post(authController.socialRegister);

// account recovery routes
router
  .route("/verify-email/:token")
  .get(
    AccountRecoveryMiddleware.validateVerifyEMails,
    accountRecoveryController.verifyEmail
  );
// Resend verification email. (this route user must be authenticated)
router
  .route("/verify-email/resend")
  .post(
    protect,
    AccountRecoveryMiddleware.validateResendVerificationEmail,
    accountRecoveryController.resendVerification
  );

// forgot password request.
router
  .route("/password/forgot")
  .post(
    AccountRecoveryMiddleware.validateRequestResetPassword,
    accountRecoveryController.requestPasswordReset
  );

// Reset password.
router
  .route("/password/reset/:token")
  .post(
    AccountRecoveryMiddleware.validateResetPassword,
    accountRecoveryController.resetPassword
  );

export default router;
