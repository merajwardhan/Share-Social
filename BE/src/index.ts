//Installed Typescript, Express , @types/express, zod, mongoose, crypto-js (to hash passwords), dotenv, nodemon

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import type { QueryFilter } from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_Auth } from "./middlewares/JWT_Auth.js";
import { userSchema, signinSchema, contentSchema } from "./schema/zSchema.js";
import * as argon2 from "argon2";
import { User, Content } from "./schema/dbSchema.js";
import type { IUser } from "./types/dbTypes.js";

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
    } as QueryFilter<IUser>).exec();

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
        { username: userResult.data.username },
        { email: userResult.data.email },
      ],
    } as QueryFilter<IUser>).exec();

    if (!userExists)
      return res
        .status(403)
        .json({ message: "No user with the given username/email exists!" });

    const isPasswordValid: boolean = await argon2.verify(
      userExists.password,
      userResult.data.password,
    );

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Password does not match for the given email/username!",
      });
    }

    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(403).json({
        message:
          "Error with sign in function at environment variable handling!",
      });
    }

    const token = jwt.sign({ username: userExists.username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ message: "Signed in successfully!", token });
  } catch (e) {
    console.log("Something went wrong at Signin\nError : " + e);
    res.status(500).json({ message: "Something went wrong while signing in!" });
  }
});

app.post("/api/v1/content", JWT_Auth, async (req, res) => {
  try {
    const contentResult = contentSchema.safeParse(req.body);

    if (!contentResult.success) {
      return res.status(403).json({
        message: "Invalid Content",
        Error: contentResult.error.message,
      });
    }

    const userId = await User.findOne({
      username: req.user,
    })
      .select("_id")
      .exec();

    if (!userId || !userId._id) {
      return res.status(403).json({ message: "User not found!" });
    }

    if (!userId._id) {
      return res
        .status(403)
        .json({ message: "User id not found to create content!" });
    }

    const createdContent = await Content.create({
      title: contentResult.data.title,
      link: contentResult.data.link,
      description: contentResult.data.description || "",
      user: userId._id,
    });

    return res.status(200).json({
      message: "Your content is successfully added!",
      contentId: createdContent._id,
    });
  } catch (e) {
    console.error(
      "Something went wrong while adding content in /api/v1/content\nError : " +
        e,
    );
    return res
      .status(403)
      .json({ message: "Something went wrong while adding content!" });
  }
});

app.post("/api/v1/content/update", async (req, res) => {
  try {
  } catch (e) {
    console.error(
      "Something went wrong while updating the content!\nError : " + e,
    );
  }
});

app.listen(process.env.PORT, (e: Error | undefined): void => {
  if (e) console.error(`There is this following error\n${e}`);
  else console.log("Server running on Port " + process.env.PORT);
});
