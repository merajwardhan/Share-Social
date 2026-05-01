//Installed Typescript, Express , @types/express, zod, mongoose, crypto-js (to hash passwords), dotenv, nodemon

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { userSchema } from "./schema/zSchema.js";
import type { IUser, IContent } from "./types/dbTypes.js";
import * as argon2 from "argon2";
import { User, Content } from "./schema/dbSchema.js";

const app = express();
app.use(express.json());
await mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => console.log("Connected to mongo successfully!"));

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  try {
    const userResult = userSchema.safeParse(req.body);

    if (!userResult.success) {
      return res
        .status(411)
        .json({ message: "Error in user inputs", error: userResult.error });
    }

    //TODO: call db to check if user exists or not
    const userExists: IUser | null = await User.findOne({
      $or: [
        { username: userResult.data.username },
        { email: userResult.data.email },
      ],
    }).exec();
    //TODO: what if the email exists and username doesn't or vice versa

    if (userExists) {
      if (
        userExists.email === userResult.data.email &&
        userExists.username === userResult.data.email
      )
        return res.status(409).json({
          message: "User already exists with this email and username",
        });

      if (userExists.email === userResult.data.email)
        return res
          .status(409)
          .json({ message: "User with this email already exists!" });

      return res
        .status(409)
        .json({ message: "User with this username already exists!" });
    }

    const hashedPassword: string = await argon2.hash(userResult.data?.password);

    await User.create({
      name: userResult.data.name,
      username: userResult.data.username,
      password: hashedPassword,
      email: userResult.data.email,
    }).exec();

    return res.status(200).json({ message: "User signed up successfully!" });
  } catch (e) {
    console.error("Signup endpoint error = " + e);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//TODO: signin end point with argon2 verify

app.listen(process.env.PORT, (e: Error | undefined): void => {
  if (e) console.error(`There is this following error\n${e}`);
  else console.log("Server running on Port " + process.env.PORT);
});
