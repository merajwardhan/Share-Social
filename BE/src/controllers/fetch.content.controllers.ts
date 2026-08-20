import type { Request, Response } from "express";
import { User } from "../schema/dbSchema.js";
import { contentSchema } from "./schema/zSchema.js";
import * as z from "zod";

export const fetchContent = async (req: Request, res: Response) => {
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
};
