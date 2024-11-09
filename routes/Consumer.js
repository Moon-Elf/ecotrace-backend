import express from "express";
import { ConsumerCalculation } from "../controllers/ConsumerController.js";
const router = express.Router();

router.post("/consumer", ConsumerCalculation);

export default router;
