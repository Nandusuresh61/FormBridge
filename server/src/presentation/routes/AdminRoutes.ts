import { Router } from "express";
import { adminController } from "../../infrastructure/di/container";
import { verifyAdmin } from "../middlewares/AdminMiddleWare";

const router = Router();

router.post("/login", adminController.login);
router.post("/logout", adminController.logout);
router.get("/submissions", verifyAdmin, adminController.getRecentSubmissions);

export default router;