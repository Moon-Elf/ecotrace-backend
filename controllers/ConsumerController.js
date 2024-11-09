import ManufacturingProcess from "../models/ManufacturingProcess";
import TransportationModel from "../models/TransportationModel";

export const ConsumerCalculation = async (req, res) => {
  try {
    const transportationDoc =
      (await TransportationModel.findById(req.params.id)) || "";
    const manufacturingDoc =
      (await ManufacturingProcess.findById(req.params.id)) || "";

    if (!transportationDoc && !manufacturingDoc) {
      return res.status(404).json({
        success: false,
        message: "No data found for this product",
      });
    }

    // Calculate manufacturing emissions
    let manufacturingEmissions = 0;
    if (manufacturingDoc) {
      // Convert energy usage from string to number (assuming kWh)
      const energyUsage = parseFloat(
        manufacturingDoc.processDetails.environmentalMetrics
          .estimatedEnergyUsage
      );
      // Average carbon emission factor for industrial electricity (kg CO2/kWh)
      const energyEmissionFactor = 0.5;

      // Convert water usage from string to number (assuming liters)
      const waterUsage = parseFloat(
        manufacturingDoc.processDetails.environmentalMetrics.estimatedWaterUsage
      );
      // Water treatment emission factor (kg CO2/liter)
      const waterEmissionFactor = 0.000298;

      // Convert waste from string to number (assuming kg)
      const waste = parseFloat(
        manufacturingDoc.processDetails.environmentalMetrics.estimatedWaste
      );
      // Wood waste emission factor (kg CO2/kg waste)
      const wasteEmissionFactor = 0.01;

      manufacturingEmissions =
        energyUsage * energyEmissionFactor +
        waterUsage * waterEmissionFactor +
        waste * wasteEmissionFactor;
    }

    // Calculate transportation emissions
    let transportationEmissions = 0;
    if (transportationDoc) {
      // Average emission factor for freight transport (kg CO2/km/L)
      const transportEmissionFactor = 2.62;
      transportationEmissions =
        transportationDoc.metrics.fuelConsumption *
        transportEmissionFactor *
        transportationDoc.metrics.distance;
    }

    // Calculate total carbon footprint
    const totalCarbonFootprint =
      manufacturingEmissions + transportationEmissions;

    return res.status(200).json({
      success: true,
      data: {
        totalCarbonFootprint: totalCarbonFootprint.toFixed(2), // kg CO2
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
    return res.status(500).json({
      success: false,
      message: "Error calculating carbon footprint",
      error: error.message,
    });
  }
};
