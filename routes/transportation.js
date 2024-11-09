import express from "express";
import {
  createTransportation,
  updateTransportation,
} from "../controllers/TransportationController.js";
const router = express.Router();
router.post("/create", createTransportation);
router.put("/:id", updateTransportation);
export default router;
