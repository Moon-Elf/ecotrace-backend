import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the wood type schema
const woodTypeSchema = new Schema({
  wood_type: { type: String, required: true },
  carbon_emissions_per_kg: { type: Number, required: true },
  scientific_name: { type: String, required: true },
});

// Create a model based on the wood type schema
const WoodType = mongoose.model("WoodType", woodTypeSchema);

export default WoodType;
