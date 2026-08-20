import { Router } from "express";
import { signupController } from "../controllers/signup.controllers.js";

const router = Router();

router.post("/signup", signupController);

export default router;
