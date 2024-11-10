import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import harvest from "./routes/harvest.js";
import manufacturing from "./routes/manufacturing.js";
import Consumer from "./routes/Consumer.js";
import Transport from "./routes/transportation.js";
import ForestRecord from "./models/ForestsModel.js";
import cors from "cors";
import Certification from "./models/Certification.js";
import WoodType from "./models/WoodModel.js";

const app = express();
dotenv.config();
app.use(cors());
const connect = async () => {
  try {
    await mongoose.connect(process.env.MongoDB);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares

// app.use(cookieParser());
app.use(express.json());
app.use("/api/harvest", harvest);
app.use("/api/manufacturing", manufacturing);
app.use("/api/transportation", Transport);
app.use("/api/consumer", Consumer);

// For forests endpoint
app.get("/api/getforests", async (req, res) => {
  try {
    const forests = await ForestRecord.find();
    return res.status(200).json(forests);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching forests", error: error.message });
  }
});

// For certification endpoint
app.get("/api/certification", async (req, res) => {
  try {
    const certifications = await Certification.find({});
    console.log(certifications);
    return res.status(200).json(certifications);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching certifications", error: error.message });
  }
});

// For woodtype endpoint
app.get("/api/woodtype", async (req, res) => {
  try {
    const woodtype = await WoodType.find();
    return res.status(200).json(woodtype);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching woodtypes", error: error.message });
  }
});

app.listen(8000, () => {
  connect();
  console.log("Connected to backend.");
});
