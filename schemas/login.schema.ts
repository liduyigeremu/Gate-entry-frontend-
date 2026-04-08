/*
login.schema.ts - Validation for LoginForm
*/

import * as z from "zod";

export const loginSchema = z.object({
    email: z.string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Invalid email - Please try again"),
    password: z.string()
    .trim()
    .min(1, "Please enter your password")
    .min(8, "Password must be at least 8 characters")
});

export type LoginInput = z.infer<typeof loginSchema>;