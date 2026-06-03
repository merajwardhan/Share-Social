import type { Types, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  content: Types.ObjectId[];
  shareable: boolean;
}

export interface IContent extends Document {
  title: string;
  link: string;
  description: string;
  user: Types.ObjectId;
  tags: string[];
}
