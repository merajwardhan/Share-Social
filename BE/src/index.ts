//Installed Typescript, Express , @types/express, zod, mongoose, crypto-js (to hash passwords), dotenv, nodemon

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userSchema, signinSchema } from "./schema/zSchema.js";
import * as argon2 from "argon2";
import { User, Content } from "./schema/dbSchema.js";

const app = express();
app.use(express.json());

try {
  await mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => console.log("Connected to mongo successfully!"));
} catch (e) {
  console.error("MongoDB connection failed: " + e);
}

app.post("/api/v1/signup", async (req, res) => {
  try {
    const userResult = userSchema.safeParse(req.body);

    if (!userResult.success) {
      return res
        .status(411)
        .json({ message: "Error in user inputs", error: userResult.error });
    }

    const userExists = await User.findOne({
      $or: [
        { username: userResult.data.username },
        { email: userResult.data.email },
      ],
    }).exec();

    if (userExists) {
      if (
        userExists.email === userResult.data.email &&
        userExists.username === userResult.data.username
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
    });

    return res.status(200).json({ message: "User signed up successfully!" });
  } catch (e) {
    console.error("Signup endpoint error = " + e);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//TODO: signin end point with argon2 verify
app.post("/api/v1/signin", async (req, res) => {
  try {
    const userResult = signinSchema.safeParse(req.body);

    if (!userResult.success) {
      return res.status(403).json({
        message: "Wrong signin credentials!",
        Error: userResult.error.message,
      });
    }

    const userExists = await User.findOne({
      $or: [
        { email: userResult.data.email },
        { username: userResult.data.username },
      ],
    }).exec();

    if (!userExists)
      return res
        .status(403)
        .json({ message: "No user with the given username/email exists!" });

    const token = jwt.sign(
      { username: userExists.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({ message: "Signed in successfully!", token });
  } catch (e) {
    console.log("Something went wrong at Signin\nError : " + e);
    res.status(500).json({ message: "Something went wrong while signing in!" });
  }
});

app.listen(process.env.PORT, (e: Error | undefined): void => {
  if (e) console.error(`There is this following error\n${e}`);
  else console.log("Server running on Port " + process.env.PORT);
});
