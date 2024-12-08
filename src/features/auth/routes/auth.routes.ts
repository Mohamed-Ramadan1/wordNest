import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AccountRecoveryController from "../controllers/accountRecovery.controller";

const authController = new AuthController();

const router = Router();

router.route("/register").post(authController.emailRegister);
router.route("/login").post(authController.emailLogin);
router.route("/logout").post(authController.logout);
router.route("/refresh").post(authController.refreshAccessToken);
router.route("/social-register").post(authController.socialRegister);

export default router;
