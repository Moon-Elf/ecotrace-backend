import express from "express";
import { ConsumerCalculation } from "../controllers/ConsumerController.js";
const router = express.Router();

router.get("/:id", ConsumerCalculation);

export default router;
