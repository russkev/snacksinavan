const Snack = require("../models/snack.model");

// Handles customer feature 1: Gets all menu of all snacks
const getAllSnacks = async (req, res) => {
  let result = await Snack.find({})
  res.send(result);
};

// Handles customer feature 2: Gets details of one snack
const getSnack = async (req, res) => {
  let result = await Snack.findOne({ name: req.params.name }, { _id: false });
  res.send(result);
};

module.exports = {
  getAllSnacks,
  getSnack,
};
