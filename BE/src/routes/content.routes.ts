import { Router } from "express";
import express from "express";
import { JWT_Auth } from "../middlewares/JWT_Auth.js";
import { uploadContent } from "../controllers/upload.content.controllers.js";

const router = Router();
const app = express();

app.use(JWT_Auth);

router.post("/content", uploadContent);

export default router;
