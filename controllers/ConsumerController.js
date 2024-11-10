import ManufacturingProcess from "../models/ManufacturingProcess.js";
import TransportationModel from "../models/TransportationModel.js";

export const ConsumerCalculation = async (req, res) => {
  try {
    console.log("hello");
    // Retrieve documents, expecting single records
    const transportationDoc = await TransportationModel.findOne({ productId: req.params.id });
    const manufacturingDoc = await ManufacturingProcess.findOne({ materialId: req.params.id });

    // Check if neither document exists
    if (!transportationDoc && !manufacturingDoc) {
      return res.status(404).json({
        success: false,
        message: "No data found for this product",
      });
    }

    // Calculate manufacturing emissions if manufacturingDoc is found
    let manufacturingEmissions = 0;
    if (manufacturingDoc) {
      const processDetails = manufacturingDoc.processDetails;
      const metrics = processDetails?.environmentalMetrics || {};

      const energyUsage = parseFloat(metrics.estimatedEnergyUsage || 0);
      const waterUsage = parseFloat(metrics.estimatedWaterUsage || 0);
      const waste = parseFloat(metrics.estimatedWaste || 0);

      const energyEmissionFactor = 0.5;
      const waterEmissionFactor = 0.000298;
      const wasteEmissionFactor = 0.01;

      manufacturingEmissions =
        energyUsage * energyEmissionFactor +
        waterUsage * waterEmissionFactor +
        waste * wasteEmissionFactor;
    }

    // Calculate transportation emissions if transportationDoc is found
    let transportationEmissions = 0;
    if (transportationDoc) {
      const metrics = transportationDoc.metrics || {};
      const fuelConsumption = metrics.fuelConsumption || 0;
      const distance = metrics.distance || 0;

      const transportEmissionFactor = 2.62;
      transportationEmissions = fuelConsumption * transportEmissionFactor * distance;
    }

    // Total carbon footprint calculation
    const totalCarbonFootprint = manufacturingEmissions + transportationEmissions;

    // Send response
    return res.status(200).json({
      success: true,
      data: {
        totalCarbonFootprint: totalCarbonFootprint.toFixed(2),
        breakdown: {
          manufacturing: manufacturingEmissions.toFixed(2),
          transportation: transportationEmissions.toFixed(2),
        },
        unit: "kg CO2",
        productDetails: {
          manufacturingId: manufacturingDoc?._id || "Not available",
          transportationId: transportationDoc?._id || "Not available",
        },
      },
    });
  } catch (error) {
    console.error("Error in ConsumerCalculation:", error.message); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Error calculating carbon footprint",
      error: error.message,
    });
  }
};
