/*
signup.schema.ts - Validation for SignUpForm
*/

import * as z from "zod";

const ethiopianPhoneRegex = /^(0[1-9]\d{8}|\+251[1-9]\d{8})$/;

export const signupSchema = z.object({
    fullname: z
        .string()
        .trim()
        .min(1, "Fullname is required")
        .regex(
            /^[\p{L}\p{M}\s\-']+$/u,
            "Name can only contain letters, spaces, hyphens, and apostrophes"
        ),

    email: z
        .string()
        .trim()
        .min(1, "Email is Required")
        .email("Invalid email - Please try again"),

    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),

    phoneNumber: z
        .string()
        .trim()
        .regex(ethiopianPhoneRegex, "Invalid phone number. Please try again.")
        .transform((val) => (
            val.startsWith("0") ? "+251" + val.slice(1) : val
        )),

    employeeId: z
        .string()
        .trim()
        .regex(/^d{6}$/, "Employee ID must be exactly 6 digits"),
        
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type SignupInput = z.infer<typeof signupSchema>;