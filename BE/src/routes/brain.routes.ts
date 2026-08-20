import { Router } from "express";
import { getBrain } from "../controllers/get.brain.controllers.js";

const router = Router();

router.get("/brain/:username", getBrain);

export default router;
