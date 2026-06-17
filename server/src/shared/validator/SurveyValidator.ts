import { z } from "zod";

export const createSurveySchema = z.object({
  name: z.string().min(2),

  gender: z.string().min(1),

  nationality: z.string().min(1),

  email: z.email(),

  phoneNumber: z.string().min(10),

  address: z.string().min(5),

  message: z.string().min(5),

  attachmentUrl: z.string().optional(),

  recaptchaToken: z.string().min(1),
});