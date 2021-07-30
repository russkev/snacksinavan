const mongoose = require("mongoose");

const globalsSchema = new mongoose.Schema({
    discountTime: { type: Number, required: true },
    cancelTime: { type: Number, required: true }
})

const Globals = mongoose.model("Globals", globalsSchema);
module.exports = Globals;