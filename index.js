import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

app.use(cookieParser());
app.use(express.json());

// app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
// app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute);

// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Something went wrong!";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// });

// POST /api/harvest/initiate
// {
//   "forestId": "MMR-TEAK-001",
//   "woodType": "TEAK_WOOD",
//   "quantity": 0.8,
//   "location": {
//     "latitude": 16.8661,
//     "longitude": 96.1951
//   },
//   "certificationId": "FSC-2024-456"
// }

app.use("/api/harvest/initiate", )

app.listen(8000, () => {
  connect();
  console.log("Connected to backend.");
});
