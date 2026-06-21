import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string(),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  RECAPTCHA_SECRET_KEY: z.string().min(1),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
});
