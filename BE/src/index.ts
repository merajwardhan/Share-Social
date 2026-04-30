//Installed Typescript, Express , @types/express, zod, mongoose, crypto-js (to hash passwords), dotenv, nodemon

import "dotenv/config";
import express from "express";
import * as z from "zod";
import { userSchema } from "./schema/zSchema.js";
import * as argon2 from "argon2";
import { User, Content } from "./schema/dbSchema.js";

const app = express();
app.use(express.json());
type UserType = z.infer<typeof userSchema>;

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  try {
    const userResult = userSchema.safeParse(req.body);

    if (!userResult.success) {
      return res
        .status(411)
        .json({ message: "Error in user inputs", error: userResult.error });
    }

    //TODO: call db to check if user exists or not
    const userExists: UserType = await User.findOne({
      username: userResult.data.username,
      email: userResult.data.email,
    }).exec();
    //TODO: what if the email exists and username doesn't or vice versa

    if (userExists) {
      return res
        .status(403)
        .json({ message: "User already exists with this email or username" });
    }

    const hashedPassword: string = await argon2.hash(userResult.data?.password);

    const userCreated: UserType = await User.create({
      name: userResult.data.name,
      username: userResult.data.username,
      password: hashedPassword,
      email: userResult.data.email,
    });

    if (userCreated) {
      return res.status(200).json({ message: "User signed up successfully!" });
    } else
      return res
        .status(400)
        .json({ message: "Something went wrong while user creation!" });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong", Error: e });
  }
});

//TODO: signin end point with argon2 verify

app.listen(process.env.PORT, (e: Error | undefined): void => {
  if (e) console.error(`There is this following error\n${e}`);
  else console.log("Server running on Port " + process.env.PORT);
});
