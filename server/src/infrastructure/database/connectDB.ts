import mongoose from "mongoose";
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB status: Connected");
  } catch (error) {
    console.log("MongoDB status: Failed", error);
    process.exit(1);
  }
};
