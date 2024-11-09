import express from "express";
import { ConsumerCalculation } from "../controllers/ConsumerController";
const router = express.Router();

router.post("/consumer", ConsumerCalculation);
