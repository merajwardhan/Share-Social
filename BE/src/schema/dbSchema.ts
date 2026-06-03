import mongoose from "mongoose";
const { Schema } = mongoose;
import type { IUser, IContent } from "../types/dbTypes.js";

//TODO:  Index the DB
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  content: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  shareable: { type: Boolean, default: true },
});

const contentSchema = new Schema<IContent>({
  title: { type: String, required: true },
  link: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  tags: [{ type: String }],
});
//TODO: Add createdAt and modifiedAt so you can pull documents and sort them with the help of unwind -> sort -> gruup (using aggregate)

export const User = mongoose.model<IUser>("User", userSchema);
export const Content = mongoose.model<IContent>("Content", contentSchema);
