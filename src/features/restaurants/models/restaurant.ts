import { Review } from "@/features/reviews/models/review";

export interface Restaurant {
  id: number;
  name: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  phone?: string;
  reviews: Review[];
}
