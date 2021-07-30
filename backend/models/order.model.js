const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    snacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snack",
        required: true,
      },
    ],
    isFulfilled: {
      type: Boolean,
      required: true,
      default: false,
    },

    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    isCancelled: {
      type: Boolean,
      required: true,
      default: false,
    },

    isChanged: {
      type: Boolean,
      required: true,
      default: false,
    },

    isDiscounted: {
      type: Boolean,
      required: true,
      default: false,
    },

    rating: {
      type: Number,
      required: false,
      default: null,
    },

    feedback: {
      type: String,
      required: false,
      default: "",
    },
    
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    van: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Van",
      required: true,
    },
  },
  {
    // Created and modified timestamps updated set automatically this way
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
