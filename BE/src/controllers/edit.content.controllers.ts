import type { Request, Response } from "express";
import mongoose from "mongoose";
import { contentSchema } from "../schema/zSchema.js";
import * as z from "zod";
import { User, Content } from "../schema/dbSchema.js";
import type { QueryFilter } from "mongoose";
import type { IUser } from "../types/dbTypes.js";

export const editContent = async (req: Request, res: Response) => {
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
      { returnDocument: "after" },
    );

    return res
      .status(200)
      .json({ message: "Content updated successfully!", updatedData });
  } catch (e) {
    console.error(
      "Something went wrong while updating the content!\nError : " + e,
    );
  }
};
