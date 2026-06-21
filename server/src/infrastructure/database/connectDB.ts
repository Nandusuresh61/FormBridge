import mongoose from "mongoose";
import { Appconfig } from "../../config/AppConfig";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(Appconfig.MONGODB_URI);
    console.log("MongoDB status: Connected");
  } catch (error) {
    console.log("MongoDB status: Failed", error);
    process.exit(1);
  }
};
