import mongoose from "mongoose";
const { Schema } = mongoose;
import type { IUser, IContent } from "../types/dbTypes.js";

//TODO:  Index the DB
const userSchema = new Schema<IUser>({
  name: String,
  username: { type: String, unique: true, required: true },
  password: String,
  email: { type: String, unique: true, required: true },
  content: [{ type: String, ref: "Content" }],
});
//TODO: Check if we have to always provide the required fields we ever have to update the document.

const contentSchema = new Schema<IContent>({
  title: { String, required: true },
  link: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const User = mongoose.model<IUser>("User", userSchema);
export const Content = mongoose.model<IContent>("Content", contentSchema);
