import express from "express";
import { updateTransportation } from "../controllers/TransportationController.js";
const router = express.Router();

router.put("/:id", updateTransportation);
export default router;
