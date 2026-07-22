import { z } from "zod"

export const createRepairRequestSchema = z.object({
    customerName: z
        .string()
        .min(2, "Customer name is required"),

    phoneNumber: z
        .string()
        .min(7, "Phone number is required"),

    email: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),

    deviceType: z
        .string()
        .min(1, "Device type is required"),

    deviceBrand: z.string().optional(),

    deviceModel: z.string().optional(),

    problemDescription: z
        .string()
        .min(10, "Please describe the issue"),

    serviceMethod: z.enum([
        "TECHNICIAN_VISITS_CUSTOMER",
        "CUSTOMER_VISITS_TECHNICIAN",
    ]),

    municipality: z
        .string()
        .min(1, "Municipality is required"),

    preferredDate: z.string().optional(),

    preferredTime: z.string().optional(),
});

export type CreateRepairRequestInputDto = z.infer<typeof createRepairRequestSchema>;