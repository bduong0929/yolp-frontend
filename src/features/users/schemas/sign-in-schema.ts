import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
