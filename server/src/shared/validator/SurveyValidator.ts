import { z } from "zod";

export const createSurveySchema = z.object({
  name: z.string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters"),

  gender: z.string({ message: "Gender is required" })
    .min(1, "Gender is required"),

  nationality: z.string({ message: "Nationality is required" })
    .min(1, "Nationality is required"),

  email: z.string({ message: "Email is required" })
    .email("Invalid email address"),

  phoneNumber: z.string({ message: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits"),

  address: z.string({ message: "Address is required" })
    .min(5, "Address must be at least 5 characters"),

  message: z.string({ message: "Message is required" })
    .min(5, "Message must be at least 5 characters"),

  attachmentUrl: z.string().optional(),

  recaptchaToken: z.string({ message: "reCAPTCHA token is required" })
    .min(1, "reCAPTCHA token is required"),
});