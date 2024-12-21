import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AccountRecoveryController from "../controllers/accountRecovery.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { AccountRecoveryMiddleware } from "../middlewares/accountRecovery.middleware";
import { protect } from "@shared/index";
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
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
    AccountRecoveryController.verifyEmail
  );
// Resend verification email. (this route user must be authenticated)
router
  .route("/verify-email/resend")
  .post(
    protect,
    AccountRecoveryMiddleware.validateResendEmail,
    AccountRecoveryController.resendVerification
  );

// forgot password request.
router
  .route("/password/forgot")
  .post(AccountRecoveryController.requestPasswordReset);

// Reset password.
router.route("/password/reset").post(AccountRecoveryController.resetPassword);

export default router;
