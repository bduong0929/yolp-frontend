import { z } from "zod";

export const addRestaurantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  phone: z.string().optional(),
});

export type AddRestaurantSchema = z.infer<typeof addRestaurantSchema>;
