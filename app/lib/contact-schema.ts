import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]).optional(),
  service: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a bit more (at least 10 characters)"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
