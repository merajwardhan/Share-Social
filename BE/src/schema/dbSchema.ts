import mongoose from "mongoose";
const { Schema } = mongoose;

//TODO:  Index the DB
const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  name: String,
  email: { type: String, unique: true },
  content: [{ type: String, ref: Content }],
});

const contentSchema = new Schema({
  title: String,
  link: String,
  user: { type: ObjectId, ref: User },
});

export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
