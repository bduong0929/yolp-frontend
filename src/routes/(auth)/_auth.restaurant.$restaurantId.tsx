import { useState } from "react";
import { Loader2, Trash } from "lucide-react";

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

export const Route = createFileRoute("/(auth)/_auth/restaurant/$restaurantId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [editRestaurantDialog, setEditRestaurantDialog] = useState(false);
  const [deleteConfirm, DeleteConfirmDialog] = useConfirm();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const { restaurantId } = useParams({
    from: "/(auth)/_auth/restaurant/$restaurantId",
  });
  const { mutate: deleteRestaurant } = useDeleteRestaurant();
  const { data: restaurant, isLoading } = useGetRestaurantById(restaurantId);

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
    console.log(review, rating);
  };

  const isValidForm = review && rating;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setEditRestaurantDialog(true)}
            >
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mx-auto flex h-[500px] w-[500px] flex-col gap-10">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="mx-auto rounded-md"
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Rating</label>
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <Textarea
              placeholder="Write a review"
              className="resize-none"
              rows={10}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <Button disabled={!isValidForm} onClick={handleSubmit}>
              Add Review
            </Button>
          </div>
        </div>
      </div>

      <EditRestaurantDialog
        restaurant={restaurant}
        open={editRestaurantDialog}
        setOpen={setEditRestaurantDialog}
      />
      <DeleteConfirmDialog
        title="Delete Restaurant"
        description="Are you sure you want to delete this restaurant?"
        confirmLabel="Delete"
        destructive
      />
    </>
  );
}
