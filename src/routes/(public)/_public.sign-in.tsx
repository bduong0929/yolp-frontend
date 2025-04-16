import { useForm } from "react-hook-form";

import { useSignIn } from "@/features/users/hooks/use-sign-in";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  signInSchema,
  SignInSchema,
} from "@/features/users/schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const Route = createFileRoute("/(public)/_public/sign-in")({
  component: SignIn,
});

function SignIn() {
  const { mutate: signIn } = useSignIn();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values: SignInSchema) => {
    signIn(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-96 flex-col gap-y-4 rounded-md border p-6"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-y-5 py-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    {...field}
                    className="rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Sign In</Button>

        <div className="flex flex-col gap-y-2">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-500" to={"/sign-up"}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
