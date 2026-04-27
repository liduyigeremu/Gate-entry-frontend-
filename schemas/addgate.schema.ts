// addgate.schema.ts - Validation for Gate Registration Form

import * as z from "zod";

export const addGateSchema = z.object({
    gate_name: z.string()
        .trim()
        .min(1, "Gate name is required")
        .min(2, "Gate name must be at least 2 characters")
        .max(100, "Gate name must be less than 100 characters")
        .regex(
            /^[\p{L}\p{M}\s\d\-']+$/u,
            "Gate name can only contain letters, numbers, spaces, hyphens, and apostrophes"
        ),
    location: z.string()
        .trim()
        .min(1, "Location is required")
        .min(3, "Location must be at least 3 characters")
        .max(200, "Location must be less than 200 characters")
        .regex(
            /^[\p{L}\p{M}\s\d\-,']+$/u,
            "Location can only contain letters, numbers, spaces, hyphens, commas, and apostrophes"
        ),
    description: z.string()
        .trim()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .transform(val => val === undefined ? "" : val)
});

export type AddGateInput = z.infer<typeof addGateSchema>;