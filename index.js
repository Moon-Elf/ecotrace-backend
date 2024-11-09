import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import harvest from "./routes/harvest";
import manufacturing from "./routes/manufacturing";
import Consumer from "./routes/Consumer";
import Transport from "./routes/transportation";

const app = express();
dotenv.config();

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

app.listen(8000, () => {
  connect();
  console.log("Connected to backend.");
});
