/*

*/

import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const maxImageSizeinMB = 5;
const MAX_FILE_SIZE = maxImageSizeinMB * 1024 * 1024;

export const deviceRegisterSchema = z.object({
    deviceType: z.string()
        .min(1, "Please select your device type"),
    brand: z.string()
        .min(1, "Please select your device brand"),
    model: z.string()
        .min(1, "Please fill model"),
    serialNumber: z.string()
        .min(1, "Please fill serial number"),
    macAddress: z.string()
        .optional(),
    assetTag: z.string()
        .optional(),
    frontImage: z.instanceof(File, { message: "Front Image is required" })
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .png, and .webp formats are supported"
        )
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB"),
    backImage: z.instanceof(File, { message: "Front Image is required" })
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .png, and .webp formats are supported"
        )
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
});

export type RegisterDeviceInput = z.infer<typeof deviceRegisterSchema>;