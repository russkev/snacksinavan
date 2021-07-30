const mongoose = require("mongoose");

const snackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.0,
  },
  category: {
    type: String,
    enum: ["drink", "food"],
    required: true,
  },
  photo: { 
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
  }
});

const Snack = mongoose.model("Snack", snackSchema);
module.exports = Snack;
