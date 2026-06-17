import { Router } from "express";
import { surveyController } from "../../infrastructure/di/container";

const router = Router();

router.post(
  "/",
  surveyController.createSurvey
);

export default router;
