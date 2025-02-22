// Express imports
import { Router } from "express";
// shared imports
import { protect } from "@shared/index";

// create  the express router
const router: Router = Router();

router.use(protect);

export default router;
