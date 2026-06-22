import mongoose from "mongoose";
import { Appconfig } from "../../config/AppConfig";
import { AdminModel } from "./models/AdminModel";
import bcrypt from "bcryptjs";
import process from "process";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(Appconfig.MONGODB_URI);
    console.log("MongoDB status: Connected");

    // Auto-seed admin if database collection is empty
    const adminCount = await AdminModel.countDocuments();
    if (adminCount === 0) {
      console.log("No admin found in database. Seeding default admin from environment...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Appconfig.ADMIN_PASSWORD, salt);
      await AdminModel.create({
        email: Appconfig.ADMIN_EMAIL.toLowerCase(),
        password: hashedPassword,
      });
      console.log("Default admin seeded successfully.");
    }
  } catch (error) {
    console.log("MongoDB status: Failed", error);
    process.exit(1);
  }
};
