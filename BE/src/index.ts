//Installed Typescript, Express , @types/express, zod, mongoose, crypto-js (to hash passwords), dotenv, nodemon

import "dotenv/config";
import express from "express";
import { userSchema } from "./schema/zSchema.js";
import * as argon2 from "argon2";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req: Request, res: Response): Response => {
  try {
    const userResult = userSchema.safeParse(req.body);

    //TODO: call db to check if user exists or not
    if (!userResult.success)
      res
        .status(411)
        .json({ message: "Error in user inputs", error: userResult.error });

    const hashedPassword: string = await argon2.hash(userResult.data?.password);
  } catch (e) {
    res.status(400).json({
      message: "Something went wrong",
      Error: e,
    });
  }
});

//TODO: signin end point with argon2 verify

app.listen(process.env.PORT, (e: Error | undefined): void => {
  if (e) console.error(`There is this following error\n${e}`);
  else console.log("Server running on Port " + process.env.PORT);
});
