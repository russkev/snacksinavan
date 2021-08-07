const orderModel = require("../models/order.model");
const snackModel = require("../models/snack.model");
const vanModel = require("../models/van.model");
const userModel = require("../models/user.model");
const globalsModel = require("../models/globals.model");

/**
 * NOTE: Order controller methods have been replaced by socket connections.
 * 
 * Referenced Mozilla guide:
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
**/

// Helper function for createOrder
exports.getSnacks = async (snacks) => {
  returnList = []
  for (const [snackId, quantity] of Object.entries(snacks)) {
    returnList.push({quantity: quantity, snack: snackId})
  }
  return returnList

}

// Helper function for createOrder
exports.getVanId = async (vanName) => {
  try {
    van = await vanModel.findOne({ vanName: vanName });
    return van.id;
  } catch (err) {
    throw new Error(`Error: Unable to locate ${vanName}`);
  }
}

// Helper function for createOrder
exports.getCustomerId = async (customerName) => {
  try {
    customer = await userModel.findOne({ username: customerName });
    return customer.id;
  } catch (err) {
    throw new Error(`Error: Unable to locate ${customerName}`);
  }
}

// Apply discounts for orders that took to long at regular intervals
(async function () {
  try {
    orders = await orderModel.find({ isCancelled: false, isFulfilled: false, isCompleted: false });
    globals = await globalsModel.find({});
    globals = globals[0];
    orders.forEach((order) => {
      const updatedAt = new Date(order.updatedAt).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = Math.floor((currentTime - updatedAt) / 1000);
      if (timeDifference  > globals.discountTime * 60 + 2 && !order.isDiscounted) {
        orderModel
          .updateOne({ _id: order._id }, { isDiscounted: true }, { timestamps: false })
          .then()
          .catch((error) => {
            throw error;
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
  setTimeout(arguments.callee, 3000);
})();


exports.orderRate = async (req, res, next) => {
  if (req.params.orderId) {
    let order = null; 
    // TODO: Two try functions can probably be run in parallel
    try {
      updateOrder = await orderModel.updateOne({ _id: req.params.orderId }, {rating: req.body.rating, feedback: req.body.feedback, updatedAt: new Date().getTime()});
      const order = await orderModel.findOne({ _id: req.params.orderId });
      res.json(order);
    } catch (err) {
      res.status(400).json({
        msg: `Error: Unable to locate order with id ${req.params.orderId}`,
      });
    }
  } else {
    res.status(400).json({ msg: "Error: orderId required in address" });
  }
};