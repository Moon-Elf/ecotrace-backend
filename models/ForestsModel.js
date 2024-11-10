import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the forest schema
const forestSchema = new Schema({
  forest_id: { type: String, required: true },
  location_name: { type: String, required: true },
  wood_type: { type: String, required: true },
  location: { type: String, required: true },
  active: { type: Boolean, required: true },
});

const mainSchema = new Schema({
  forest_ids: [forestSchema],
});

const ForestRecord = mongoose.model("ForestRecord", mainSchema);

export default ForestRecord;
