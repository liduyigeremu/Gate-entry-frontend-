/*
signup.schema.ts - Validation for SignUpForm
*/

import * as z from "zod";

export const signupSchema = z.object({
    fullname: z.string()
        .trim()
        .min(1, "Fullname is required")
        .regex(
            /^[\p{L}\p{M}\s\-']+$/u,
            "Name can only contain letters, spaces, hyphens, and apostrophes"
        ),
    email: z.string()
        .trim()
        .min(1, "Email is Required")
        .email("Invalid email - Please try again"),
         employeeId: z.string(),
          phoneNumber: z.string(),
    password: z.string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
        .min(1, "Please confirm your password")
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type SignupInput = z.infer<typeof signupSchema>;