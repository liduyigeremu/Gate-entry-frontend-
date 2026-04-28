/*
forgot.schema.ts - Validation for ForgotPasswordForm
*/

import * as z from "zod";

export const forgotSchema = z.object({
    email: z.string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Invalid email - Please try again"),
});

export type ForgotInput = z.infer<typeof forgotSchema>;