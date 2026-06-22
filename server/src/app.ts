import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import surveyRoutes from "./presentation/routes/SurveyRoutes";
import adminRoutes from "./presentation/routes/AdminRoutes";
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
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/surveys", surveyRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;