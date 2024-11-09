import express from "express";
import { updateTransportation } from "../controllers/TransportationController";
const router = express.Router();

router.put("/:id", updateTransportation);
