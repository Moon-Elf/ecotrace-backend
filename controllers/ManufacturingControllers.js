import ManufacturingProcess from "../models/ManufacturingProcess.js";

export const createManufacturingDetails = async (req, res) => {
  try {
    const newHarvest = new ManufacturingProcess(req.body);
    const saved = newHarvest.save();

    // send bloackchain for saving this data
    // then return new response
    res.status(201).json(newHarvest);
  } catch (error) {
    console.log(error);
  }
};
export const updateManufacturingDetails = async (req, res) => {
  try {
    const param = await req.params.id;
    const { stepDetails } = req.body;
    
    
    const updatedDoc = await ManufacturingProcess.findByIdAndUpdate(
      param,
      {
        $push: { "processDetails.manufacturingSteps": stepDetails },
        $set: { "processDetails.processEndDate": new Date() },
      },
      { new: true } // Returns the updated document
    );

    if (updatedDoc) {
      return res.status(200).json({
        success: true,
        message: "Manufacturing process updated successfully",
        data: updatedDoc,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Manufacturing process not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating manufacturing process",
      error: error.message,
    });
  }
};
