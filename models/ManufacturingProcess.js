const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManufacturingProcessSchema = new Schema(
  {
    materialId: {
      type: String,
      required: true,
      trim: true,
    },
    facilityId: {
      type: String,
      required: true,
      trim: true,
    },
    productType: {
      type: String,
      required: true,
      trim: true,
    },
    processDetails: {
      plannedStartDate: {
        type: Date,
        required: true,
      },
      estimatedDuration: {
        type: String,
        required: true,
      },
      manufacturingSteps: [
        {
          stepId: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
            trim: true,
          },
          estimatedDuration: {
            type: String,
            required: true,
          },
          toolsRequired: [
            {
              type: String,
              trim: true,
            },
          ],
        },
      ],
      environmentalMetrics: {
        estimatedEnergyUsage: {
          type: String,
          required: true,
        },
        estimatedWaterUsage: {
          type: String,
          required: true,
        },
        estimatedWaste: {
          type: String,
          required: true,
        },
      },
      qualityChecks: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("manufacturing", ManufacturingProcessSchema);
