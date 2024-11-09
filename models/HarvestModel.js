import mongoose from "mongoose";
const HarvestSchema = new mongoose.Schema({
  forest_id: {
    type: String,
    required: true,
  },
  woodType: {
    type: String,
    required: true,
  },
  location: {
    type: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  certificationId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("harvest", HarvestSchema);
