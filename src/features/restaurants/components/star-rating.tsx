import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  maxRating?: number;
  size?: number;
  className?: string;
  readOnly?: boolean;
}

export function StarRating({
  rating,
  setRating,
  maxRating = 5,
  size = 24,
  className,
  readOnly = false,
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            size={size}
            className={cn(
              "cursor-pointer transition-colors duration-200",
              rating >= starValue || hoveredRating >= starValue
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-300",
              readOnly
                ? "cursor-default"
                : "hover:fill-yellow-400 hover:text-yellow-400",
            )}
            onClick={() => {
              if (!readOnly) {
                // Toggle star off if clicking the same star twice
                if (rating === starValue) {
                  setRating(starValue - 1);
                } else {
                  setRating(starValue);
                }
              }
            }}
            onMouseEnter={() => {
              if (!readOnly) {
                setHoveredRating(starValue);
              }
            }}
            onMouseLeave={() => {
              if (!readOnly) {
                setHoveredRating(0);
              }
            }}
          />
        );
      })}
    </div>
  );
}
