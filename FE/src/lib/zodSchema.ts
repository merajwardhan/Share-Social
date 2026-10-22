import * as z from "zod";

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "name must be at least 3 characters long!" })
      .max(30, { message: "name cannot be more then 30 characters!" }),
    username: z
      .string()
      .min(3, { message: "username must contain at least 3 characters." })
      .max(10, { message: "username must not be longer than 10 characters." })
      .regex(/^[a-za-z0-9_.]+$/, {
        message:
          "username can only contain letters, numbers, underscores, and dots",
      })
      .refine((val) => /[a-za-z0-9]/.test(val), {
        message: "username must contain at least one letter or number",
      }),
    password: z
      .string()
      .min(8, { message: "password must contain at least 8 characters." })
      .max(20, { message: "password must not be longer than 20 characters." })
      .regex(/[a-z]/, { message: "must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "must contain at least one number" })
      .regex(/[^a-za-z0-9]/, {
        message: "must contain at least one special character",
      }),
    confirmPassword: z.string(),
    email: z.string().email({ message: "incorrect email format!" }),
    shareable: z.boolean().default(true).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

export const signinSchema = z
  .object({
    username: userSchema.shape.username.optional(),
    email: userSchema.shape.email.optional(),
    password: userSchema.shape.password,
  })
  .refine((data) => data.email || data.username, {
    message: "Email or username is required to signin!",
  });

export const contentSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters long!" })
    .max(30, { message: "Title cannot be more than 30 characters long!" }),
  link: z.string().url({ message: "Invalid URL" }),
  description: z
    .string()
    .max(300, { message: "Description cannot be longer than 300 characters" })
    .optional(),
  tags: z
    .array(
      z
        .string()
        .min(3, "Tag should be at least 3 letter long!")
        .max(45, "Tag should not be longer than 45 letters!")
        .transform((str) => str.trim().toLowerCase())
        .refine((str) => !str.includes(" "), "Tag should be just one letter!"),
    )
    .optional(),
});

export type UserSignUpFormData = z.infer<typeof userSchema>;
export type UserSigninFormData = z.infer<typeof signinSchema>;
export type UserContentData = z.infer<typeof contentSchema>;
