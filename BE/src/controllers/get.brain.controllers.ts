import type { Request, Response } from "express";
import { User } from "../schema/dbSchema.js";

export const getBrain = async (req: Request, res: Response) => {
  try {
    const username: string | string[] | undefined = req.params.username;
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
};
