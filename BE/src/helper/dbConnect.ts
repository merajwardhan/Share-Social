import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URL}`)
      .then(() => console.log("Connected to mongo successfully!"));
  } catch (e) {
    console.error("MongoDB connection failed: " + e);
  }
}
