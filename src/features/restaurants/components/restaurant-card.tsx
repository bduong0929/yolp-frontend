import { Restaurant } from "../models/restaurant";

import { useNavigate } from "@tanstack/react-router";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const navigate = useNavigate();

  // Calculate average rating
  const hasReviews = restaurant.reviews && restaurant.reviews.length > 0;
  const averageRating = hasReviews
    ? parseFloat(
        (
          restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) /
          restaurant.reviews.length
        ).toFixed(1),
      )
    : 0;
  const reviewCount = hasReviews ? restaurant.reviews.length : 0;

  return (
    <div
      className="flex h-full cursor-pointer flex-col rounded-md border transition-all duration-300 hover:scale-105"
      onClick={() =>
        navigate({
          to: "/restaurant/$restaurantId",
          params: { restaurantId: restaurant.id.toString() },
        })
      }
    >
      <img
        src={
          restaurant.imageUrl || "https://placehold.co/600x400?text=No+Image"
        }
        alt={restaurant.name}
        className="h-80 w-full rounded-t-md object-cover"
      />
      <div className="flex-grow border-t p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{restaurant.name}</h3>
          {hasReviews && (
            <div className="flex items-center">
              <span className="mr-1 text-amber-500">★</span>
              <span className="font-medium">{averageRating}</span>
              <span className="ml-1 text-sm text-gray-500">
                ({reviewCount})
              </span>
            </div>
          )}
        </div>
        {restaurant.description ? (
          <p className="mt-2 text-sm">{restaurant.description}</p>
        ) : (
          <p className="mt-2 text-sm text-gray-400 italic">
            No description available
          </p>
        )}
        {restaurant.address ? (
          <p className="mt-2 text-sm text-gray-500">{restaurant.address}</p>
        ) : (
          <p className="mt-2 text-sm text-gray-400 italic">
            Address not available
          </p>
        )}
        {restaurant.phone ? (
          <p className="mt-1 text-sm text-gray-500">{restaurant.phone}</p>
        ) : (
          <p className="mt-1 text-sm text-gray-400 italic">
            Phone not available
          </p>
        )}
        {!hasReviews && (
          <p className="mt-2 text-sm text-gray-400 italic">No reviews yet</p>
        )}
      </div>
    </div>
  );
};
