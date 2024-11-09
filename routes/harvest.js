import express from "express";
import { HarvestIniate } from "../controllers/HarvestController";
const router = express.Router();

router.post("/initiate", HarvestIniate);
