import { Router } from "express";
import express from "express";
import { JWT_Auth } from "../middlewares/JWT_Auth.js";
import { uploadContent } from "../controllers/upload.content.controllers.js";
import { editContent } from "../controllers/edit.content.controllers.js";
import { fetchContent } from "../controllers/fetch.content.controllers.js";
import { deleteContent } from "../controllers/delete.content.controllers.js";

const router = Router();
const app = express();

app.use(JWT_Auth);

router.post("/content", uploadContent);
router.patch("/content/:contentId", editContent);
router.get("/content", fetchContent);
router.delete("/content/:content", deleteContent);
export default router;
