import express from "express";
import {
  createManufacturingDetails,
  updateManufacturingDetails,
} from "../controllers/ManufacturingControllers.js";
const router = express.Router();

router.post("/create", createManufacturingDetails);
router.put("/:id", updateManufacturingDetails);
export default router;
