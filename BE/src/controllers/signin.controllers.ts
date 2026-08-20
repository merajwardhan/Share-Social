import { type Request, type Response } from "express";
import { signinSchema } from "../schema/zSchema.js";
import { User } from "../schema/dbSchema.js";
import * as argon2 from "argon2";
import type { IUser } from "../types/dbTypes.js";
import type { QueryFilter } from "mongoose";
import jwt from "jsonwebtoken";

export const signinHandler = async (req: Request, res: Response) => {
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
    //TODO: Provide user data again so user can navigate to dashboard.
    return res.status(200).json({ message: "Signed in successfully!", token });
  } catch (e) {
    console.log("Something went wrong at Signin\nError : " + e);
    res.status(500).json({ message: "Something went wrong while signing in!" });
  }
};
