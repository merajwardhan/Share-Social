import type { Response, Request } from "express";
import { contentSchema } from "../schema/zSchema.js";
import { User, Content } from "../schema/dbSchema.js";

export const uploadContent = async (req: Request, res: Response) => {
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
      tags: contentResult.data.tags || [],
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
};
