import { envSchema } from "@/shared/validator/envValidator";

export const Appconfig = envSchema.safeParse(process.env);