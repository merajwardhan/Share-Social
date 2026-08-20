import { Router } from "express";
import { signupHandler } from "../controllers/signup.controllers.js";
import { signinHandler } from "../controllers/signin.controllers.js";

const router = Router();

router.post("/signup", signupHandler);
router.post("/signin", signinHandler);

export default router;
