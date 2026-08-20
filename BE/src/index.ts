import "dotenv/config";
import express from "express";
import { dbConnect } from "./helper/dbConnect.js";
import authRouter from "./routes/auth.routes.js";
import contentRouter from "./routes/content.routes.js";
import brainRouter from "./routes/brain.routes.js";

const app = express();
app.use(express.json());

dbConnect();
//TODO:deal with cors erros and revise about it while you are at it

app.use("/api/v1", authRouter);

app.use("/api/v1", contentRouter);

app.use("/api/v1", brainRouter);

app.listen(process.env.PORT, (e: Error | undefined): void => {
  if (e) console.error(`There is this following error\n${e}`);
  else console.log("Server running on Port " + process.env.PORT);
});
