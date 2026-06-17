import express from "express";
import cors from "cors";
import surveyRoutes from "./presentation/routes/SurveyRoutes";
import { errorMiddleware } from "./presentation/middlewares/errorMiddleware";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/surveys", surveyRoutes);

// Error handling middleware (must be after routes)
app.use(errorMiddleware);

export default app;