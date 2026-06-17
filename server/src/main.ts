import "dotenv/config";
import { Appconfig } from "./config/AppConfig";
import { connectDB } from "./infrastructure/database/connectDB";
import app from "./server";

const startServer = async () => {
  const { PORT } = Appconfig;

  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("FATAL: Failed to start the server:", error);
  process.exit(1);
});
