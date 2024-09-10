import { formText } from "@/lib/constants/status-messages";
import { z } from "zod";

export type Credentials = {
  email: string;
  password: string;
}

export const emailSchema = z.string().email({ message: formText.emailErrorMessage });

export const passwordSchema = z
  .string()
  .min(8, { message: formText.minLengthErrorMessage })
  .max(20, { message: formText.maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: formText.uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: formText.lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: formText.numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: formText.specialCharacterErrorMessage,
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: formText.passwordMismatchErrorMessage,
    path: ['confirmPassword']
  })

