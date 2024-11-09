import TransportationModel from "../models/TransportationModel.js";

export const createTransportation = async (req, res) => {
  try {
    const newTransport = new TransportationModel(req.body);
    await newTransport.save();
    return res.status(201).send(newTransport);
  } catch (error) {
    res.status(500).second(error);
  }
};
export const updateTransportation = async (req, res) => {
  try {
    const param = req.params.id;
    const { location, metrics } = req.body;
    const locationUpdate = {
      timestamp: new Date(),
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    };
    const existingTransport = await TransportationModel.findById(param);
    const newMetrics = {
      fuelConsumption:
        (existingTransport?.metrics?.fuelConsumption || 0) +
        metrics.fuelConsumption,
      distance: (existingTransport?.metrics?.distance || 0) + metrics.distance,
    };
    const updatedTransport = await TransportationModel.findByIdAndUpdate(
      param,
      {
        $push: { locationUpdates: locationUpdate },
        $set: {
          "metrics.fuelConsumption": newMetrics.fuelConsumption,
          "metrics.distance": newMetrics.distance,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedTransport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating transportation record",
      error: error.message,
    });
  }
};
