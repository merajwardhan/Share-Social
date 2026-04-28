import * as z from "zod";

//username schema and password schema

export const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters." })
    .max(10, { message: "Username must not be longer than 10 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters." })
    .max(20, { message: "Password must not be longer than 20 characters." })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Must contain at least one special character",
    }),
});
