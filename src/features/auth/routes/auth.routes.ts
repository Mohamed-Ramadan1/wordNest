import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AccountRecoveryController from "../controllers/accountRecovery.controller";

const router = Router();

router.route("/register").post(AuthController.emailRegister);

export default router;
