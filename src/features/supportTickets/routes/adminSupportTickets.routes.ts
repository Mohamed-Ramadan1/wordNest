import { Router } from "express";
import { protect, restrictTo } from "@shared/index";

// create  the express router
const router: Router = Router();

router.use(protect);
router.use(restrictTo("admin"));

export default router;
