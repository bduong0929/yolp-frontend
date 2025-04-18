import { z } from "zod";

export const addReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Review is required"),
  restaurantId: z.string(),
});

export type AddReviewSchema = z.infer<typeof addReviewSchema>;
