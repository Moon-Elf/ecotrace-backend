import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the certification schema
const certificationSchema = new Schema({
  certificationId: { type: String, required: true },
  type: { type: String, required: true },
  issuer: { type: String, required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
});

// Create a model based on the certification schema
const Certification = mongoose.model("Certification", certificationSchema);

export default Certification;
