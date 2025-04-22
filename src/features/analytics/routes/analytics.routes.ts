// express imports
import { Router } from "express";

// configuration imports
import { container } from "@config/inversify.config";

// shared imports
import { TYPES, AccessControlMiddleware } from "@shared/index";

// Router instance
const router = Router();

export default router;
