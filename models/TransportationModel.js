import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TransportSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true,
    },
    shipmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    route: [
      {
        origin: {
          type: String,
          required: true,
          trim: true,
        },
        destination: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["INITIATED", "IN_TRANSIT", "DELIVERED"],
      default: "INITIATED",
    },
    locationUpdates: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        location: {
          latitude: Number,
          longitude: Number,
        },
      },
    ],
    metrics: {
      fuelConsumption: {
        type: Number,
        required: true,
      },
      distance: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TransportationModel", TransportSchema);
