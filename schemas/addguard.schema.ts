// addguard.schema.ts - Validation for Guard Registration Form

import * as z from "zod";

export const addGuardSchema = z.object({
    guardId: z.string()
        .trim()
        .min(1, "Guard ID is required")
        .regex(/^\d+$/, "Guard ID must contain only numbers"),
    fullName: z.string()
        .trim()
        .min(1, "Full name is required")
        .min(3, "Full name must be at least 3 characters")
        .regex(
            /^[\p{L}\p{M}\s\-']+$/u,
            "Name can only contain letters, spaces, hyphens, and apostrophes"
        ),
    phoneNumber: z.string()
        .trim()
        .min(1, "Phone number is required")
        .regex(
            /^\+?[0-9]{10,15}$/,
            "Please enter a valid phone number (10-15 digits)"
        ),
    profilePhoto: z.instanceof(File)
        .optional()
        .refine(
            (file) => {
                if (!file) return true;
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
                return validTypes.includes(file.type);
            },
            {
                message: "Please upload a valid image file (JPEG, PNG, WEBP)"
            }
        )
        .refine(
            (file) => {
                if (!file) return true;
                return file.size <= 5 * 1024 * 1024;
            },
            {
                message: "File size must be less than 5MB"
            }
        )
});

export type AddGuardInput = z.infer<typeof addGuardSchema>;