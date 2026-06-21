import express from "express";
import cors from "cors";
import surveyRoutes from "./presentation/routes/SurveyRoutes";
import { errorMiddleware } from "./presentation/middlewares/errorMiddleware";
import { Appconfig } from "./config/AppConfig";

const app = express();

// Global Middlewares
app.use(
  cors({
    origin: Appconfig.CLIENT_ORIGIN,    
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/surveys", surveyRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;