// model import
import harvest from "../models/HarvestModel.js";
export const HarvestIniate = async (req, res) => {
  try {
    const newHarvest = new harvest(req.body);
    const saved = newHarvest.save();

    // send bloackchain for saving this data
    // then return new response
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
  }
};
