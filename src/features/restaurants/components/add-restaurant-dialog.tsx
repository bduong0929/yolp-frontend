import {
  AddRestaurantSchema,
  addRestaurantSchema,
} from "../schemas/add-restaurant-schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddRestaurantDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddRestaurantDialog = ({
  open,
  setOpen,
}: AddRestaurantDialogProps) => {
  const form = useForm<AddRestaurantSchema>({
    resolver: zodResolver(addRestaurantSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      phone: "",
    },
  });

  const onSubmit = (data: AddRestaurantSchema) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Restaurant</DialogTitle>
          <DialogDescription>
            Add a new restaurant to your account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-col gap-y-5 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Name
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Image URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your image URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Add Restaurant</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
