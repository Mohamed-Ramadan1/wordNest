import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AccountRecoveryController from "../controllers/accountRecovery.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
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

router.route("/logout").post(protect, authController.logout);
router.route("/refresh").post(authController.refreshAccessToken);
router.route("/social-register").post(authController.socialRegister);

export default router;
