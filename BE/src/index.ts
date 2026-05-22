//Installed Typescript, Express , @types/express, zod, mongoose, crypto-js (to hash passwords), dotenv, nodemon

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import type { QueryFilter } from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_Auth } from "./middlewares/JWT_Auth.js";
import { userSchema, signinSchema, contentSchema } from "./schema/zSchema.js";
import * as z from "zod";
import * as argon2 from "argon2";
import { User, Content } from "./schema/dbSchema.js";
import type { IUser, IContent } from "./types/dbTypes.js";
import { dbConnect } from "./helper/dbConnect.js";

const app = express();
app.use(express.json());

dbConnect();

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

    await User.findByIdAndUpdate(userId._id, {
      $push: { content: createdContent._id },
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

app.patch("/api/v1/content/:contentId", JWT_Auth, async (req, res) => {
  try {
    const { contentId } = req.params;
    if (!contentId || typeof contentId !== "string")
      return res.status(403).json({ message: "ContentId not provided!" });
    if (!mongoose.isObjectIdOrHexString(contentId))
      return res.status(403).json({ message: "Invalid contentId!", contentId });

    type contentType = z.infer<typeof contentSchema>;
    const updatedContent: contentType = req.body.updatedContent;
    if (!updatedContent)
      return res
        .status(403)
        .json({ message: "Update information not provided!" });

    const user = await User.findOne({
      username: req.user,
      content: contentId,
    } as QueryFilter<IUser>);
    if (!user)
      return res
        .status(403)
        .json({ message: "User is not the owner of the content!" });

    const updatedData = await Content.findByIdAndUpdate(
      contentId,
      updatedContent,
      { new: true },
    );

    return res
      .status(200)
      .json({ message: "Content updated successfully!", updatedData });
  } catch (e) {
    console.error(
      "Something went wrong while updating the content!\nError : " + e,
    );
  }
});

app.get("/api/v1/content", JWT_Auth, async (req, res) => {
  try {
    const userWithContent = await User.aggregate([
      { $match: { username: req.user } },
      {
        $lookup: {
          from: "contents",
          localField: "content",
          foreignField: "_id",
          as: "content",
        },
      },
      {
        $project: {
          name: 1,
          content: 1,
          _id: 0,
        },
      },
    ]);

    type contentType = z.infer<typeof contentSchema>;
    if (!userWithContent[0])
      return res.status(403).json({ message: "No user found!" });
    else {
      userWithContent[0].content = userWithContent[0].content.map(
        (content: contentType) => ({
          title: content.title,
          link: content.link,
          description: content.description,
        }),
      );
    }

    return res.status(200).json({
      message: "Contents successfully fetched!",
      contents: userWithContent[0].content,
    });
  } catch (e) {
    console.error("Error while fetching content!\nError : " + e);
    return res
      .status(403)
      .json({ message: "Something went wrong while retreiving the content!" });
  }
});

app.delete("/api/v1/content/:content", JWT_Auth, async (req, res) => {
  try {
    const { contentId } = req.params;

    const deletedContent = await Content.findOneAndDelete({
      _id: contentId,
      user: await User.findOne({ username: req.user }).select("_id"),
    } as QueryFilter<IContent>);

    if (!deletedContent)
      return res
        .status(403)
        .json({ message: "Content not found or you do not own the post!" });

    await User.findOneAndUpdate(
      { username: req.user },
      { $pull: { content: contentId } },
    );

    return res.status(200).json({ message: "Content Deleted successfully!" });
  } catch (e) {
    console.error("Content deletion went wrong\nError : " + e);
    return res
      .status(403)
      .json({ message: "Something went wrong while deleting the content!" });
  }
});

app.get("/api/v1/brain/:username", async (req, res) => {
  try {
    const username: string = req.params.username;
    if (!username)
      return res.status(403).json({ message: "Usernamej not provided!" });

    const user = await User.aggregate([
      { $match: { username } },
      {
        $lookup: {
          from: "contents",
          localField: "content",
          foreignField: "_id",
          as: "populatedContent",
        },
      },
      {
        $project: {
          _id: 0,
          username: 1,
          password: 0,
          email: 0,
          shareable: 0,
          allPosts: "$populatedContent",
        },
      },
    ]);

    if (!user || user[0].shareable !== true)
      return res.status(403).json({
        message: "User not found or User's content is not shareable!",
      });

    return res.status(200).json({
      message: "These are all the sharable documents",
      username: user[0].username,
      allPosts: user[0].allPosts,
    });
  } catch (e) {
    console.error("Something went wrong in the /brain endpoint\nError = " + e);
    res.status(403).json({
      message: "Something went wrong while fetching the contents of brain!",
    });
  }
});

app.listen(process.env.PORT, (e: Error | undefined): void => {
  if (e) console.error(`There is this following error\n${e}`);
  else console.log("Server running on Port " + process.env.PORT);
});
