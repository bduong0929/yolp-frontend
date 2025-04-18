import { useState } from "react";
import {
  Loader2,
  Trash,
  ChevronLeft,
  MapPin,
  Phone,
  Info,
  Star,
} from "lucide-react";

import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useGetRestaurantById } from "@/features/restaurants/hooks/use-get-restaurant-by-id";
import { EditRestaurantDialog } from "@/features/restaurants/components/edit-restaurant-dialog";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteRestaurant } from "@/features/restaurants/hooks/use-delete-restaurant";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/features/restaurants/components/star-rating";
import { useAddReview } from "@/features/reviews/hooks/use-add-review";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export const Route = createFileRoute("/(auth)/_auth/restaurant/$restaurantId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [editRestaurantDialog, setEditRestaurantDialog] = useState(false);
  const [deleteConfirm, DeleteConfirmDialog] = useConfirm();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { restaurantId } = useParams({
    from: "/(auth)/_auth/restaurant/$restaurantId",
  });
  const { mutate: deleteRestaurant, isPending: isDeleting } =
    useDeleteRestaurant();
  const { data: restaurant, isLoading } = useGetRestaurantById(restaurantId);
  const { mutate: addReview } = useAddReview();

  const handleDelete = async () => {
    const ok = await deleteConfirm();
    if (!ok) return;

    deleteRestaurant(restaurantId, {
      onSuccess: () => {
        navigate({ to: "/dashboard" });
      },
    });
  };

  const handleSubmit = () => {
    if (!isValidForm) return;

    setSubmitting(true);
    addReview(
      {
        rating,
        comment: review,
        restaurantId,
      },
      {
        onSuccess: () => {
          setReview("");
          setRating(0);
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      },
    );
  };

  const isValidForm = review.trim().length > 0 && rating > 0;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center gap-4">
        <div className="text-xl font-medium">Restaurant not found</div>
        <Button onClick={() => navigate({ to: "/dashboard" })}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

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
    <>
      <Button
        variant="ghost"
        className="w-fit"
        onClick={() => navigate({ to: "/dashboard" })}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 pt-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            {hasReviews && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{averageRating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setEditRestaurantDialog(true)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash className="size-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="overflow-hidden p-0">
            <img
              src={
                restaurant.imageUrl ||
                "https://placehold.co/600x400?text=No+Image"
              }
              alt={restaurant.name}
              className="h-64 w-full object-cover"
            />
            <div className="space-y-4 p-6">
              {restaurant.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <span>{restaurant.address}</span>
                </div>
              )}
              {restaurant.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="text-muted-foreground h-4 w-4" />
                  <span>{restaurant.phone}</span>
                </div>
              )}
              {restaurant.description && (
                <div className="flex items-start gap-2">
                  <Info className="text-muted-foreground mt-1 h-4 w-4" />
                  <p className="text-muted-foreground text-sm">
                    {restaurant.description}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Add Your Review</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <StarRating
                    rating={rating}
                    setRating={setRating}
                    size={28}
                    className="justify-start"
                  />
                </div>
                <Textarea
                  placeholder="Share your experience with this restaurant..."
                  className="min-h-[120px] resize-none"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <Button
                  className="w-full"
                  disabled={!isValidForm || submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Add Review"
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {hasReviews && (
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold">Customer Reviews</h3>
            <div className="space-y-4">
              {restaurant.reviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex">
                        <StarRating
                          rating={review.rating}
                          setRating={() => {}}
                          readOnly
                        />
                      </div>
                      <p className="mt-2 text-sm">{review.comment}</p>
                    </div>
                    <time className="text-muted-foreground text-xs">
                      {review.createdAt
                        ? format(new Date(review.createdAt), "MMM dd, yyyy")
                        : ""}
                    </time>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <EditRestaurantDialog
        restaurant={restaurant}
        open={editRestaurantDialog}
        setOpen={setEditRestaurantDialog}
      />
      <DeleteConfirmDialog
        title="Delete Restaurant"
        description="Are you sure you want to delete this restaurant? This action cannot be undone."
        confirmLabel="Delete"
        destructive
      />
    </>
  );
}
