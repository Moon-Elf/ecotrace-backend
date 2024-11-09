import express from "express";
import { HarvestIniate } from "../controllers/HarvestController.js";
const router = express.Router();

router.post("/initiate", HarvestIniate);
export default router;
