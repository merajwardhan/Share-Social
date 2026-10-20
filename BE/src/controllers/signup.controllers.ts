import { type Request, type Response } from "express";
import { userSchema } from "../schema/zSchema.js";
import { User } from "../schema/dbSchema.js";
import type { QueryFilter } from "mongoose";
import type { IUser } from "../types/dbTypes.js";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(400).json({
        success: false,
        message:
          "Error with sign in function at environment variable handling!",
      });
    }

    const userResult = userSchema.safeParse(req.body);

    if (!userResult.success) {
      return res.status(422).json({
        success: false,
        message: "Error in user inputs",
        fieldErrors: userResult.error.flatten().fieldErrors,
      });
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
        return res.status(400).json({
          success: false,
          message: "User already exists with this email and username",
        });

      if (userExists.email === userResult.data.email)
        return res.status(400).json({
          success: false,
          message: "User with this email already exists!",
        });

      return res.status(400).json({
        success: false,
        message: "User with this username already exists!",
      });
    }

    const hashedPassword: string = await argon2.hash(userResult.data?.password);

    const newUser = await User.create({
      name: userResult.data.name,
      username: userResult.data.username,
      password: hashedPassword,
      email: userResult.data.email,
    });

    const token = jwt.sign({ username: userResult.data.username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "User signed up successfully!",
      token,
      userData: {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (e) {
    console.error("Signup endpoint error = " + e);
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong on our end, Please try again later.",
      });
  }
};
