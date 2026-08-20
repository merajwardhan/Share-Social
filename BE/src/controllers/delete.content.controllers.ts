import type { Request, Response } from "express";
import { User, Content } from "../schema/dbSchema.js";
import type { QueryFilter } from "mongoose";

export const deleteContent = async (req: Request, res: Response) => {
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
};
