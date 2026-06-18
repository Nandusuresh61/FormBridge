import { z } from "zod";

export const surveySchema = z.object({
  name: z.string().min(1, "Name is required"),

  gender: z.string().min(1, "Gender is required"),

  nationality: z.string().min(1, "Nationality is required"),

  email: z.email("Invalid email address"),

  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  address: z.string().min(1, "Address is required"),

  message: z.string().min(1, "Message is required"),
});

export type SurveyFormValues = z.infer<
  typeof surveySchema
>;