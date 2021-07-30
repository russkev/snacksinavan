const Globals = require("../models/globals.model")

exports.getGlobals = async (req, res) => {
  try {
    globals = await Globals.find({})
    globals = globals[0]
    res.json(globals)
  } catch (error) {
    res.status(400).json({ msg: "Error fetching globals"})
    console.log(error)
  }
}