import { envSchema } from "../shared/validator/envValidator";

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Environment configuration validation failed:");
  console.error(JSON.stringify(parsed.error.format(), null, 2));
  process.exit(1);
}

export const Appconfig = parsed.data!;