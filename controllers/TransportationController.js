export const updateTransportation = async (req, res) => {
  try {
    const param = req.query.param;
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
