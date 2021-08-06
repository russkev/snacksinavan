const orderModel = require("../models/order.model");
const vanModel = require("../models/van.model");
const userModel = require("../models/user.model");
const orderController = require("./order.controller");

const ORDERS_CHANGED = "ordersChanged";

const orderListVan = (socket) => {
  socket.on("requestVanOrders", async () => {
    if (socket.handshake.auth.vanName) {
      const savedVan = await vanModel.findOne({ vanName: socket.handshake.auth.vanName });
      try {
        savedOrders = await orderModel
          .find({ van: savedVan._id, isCancelled: false })
          .populate(["customer", "snacks"]);
        socket.emit("getVanOrders", savedOrders);
      } catch (error) {
        socket.emit("error", error.message);
      }
    } else {
      socket.emit("error", "vanName not found in header");
    }
  });
};

const orderListCustomer = async (socket) => {
  socket.on("requestCustomerOrders", async () => {
    if (socket.handshake.auth.username) {
      try {
        const customer = await userModel.findOne({ username: socket.handshake.auth.username });
        const orders = await orderModel
          .find({ customer: customer.id })
          .populate(["snacks", "van"]);
        socket.emit("orderListCustomer", orders);
      } catch (error) {
        socket.emit("error", error.message);
      }
    } else {
      socket.emit("error", "Username not found in header");
    }
  });
};

const createOrder = async (io, socket) => {
  socket.on("createOrder", async (order) => {
    if (order.snacks && order.vanName) {
      let orderedSnackIds = [];
      let customerId = "";
      let vanId = "";
      let van = null;

      try {
        orderedSnackIds = await orderController.getSnackIds(order.snacks);
        customerId = await orderController.getCustomerId(socket.handshake.auth.username);
        vanId = await orderController.getVanId(order.vanName);
        van = await vanModel.findOne({ _id: vanId });
      } catch (error) {
        socket.emit("error", "There was a problem receiving items from the database");
        console.log(error);
        return;
      }

      // Check that van is available for orders
      if (van && !van.readyForOrders) {
        socket.emit("error", "Van is not ready for orders");
        return;
      }

      const newOrder = new orderModel({
        snacks: orderedSnackIds,
        customer: customerId,
        van: vanId,
      });

      // Create the order
      try {
        const savedOrder = await newOrder.save();
        socket.emit("orderCreated", savedOrder);
        io.sockets.emit(ORDERS_CHANGED, {
          customer: socket.handshake.auth.username,
          van: van.vanName,
        });
      } catch (error) {
        socket.emit("error", error.message);
        console.log(error);
        return;
      }
    } else {
      socket.emit("error", "Please include 'snacks' and 'vanName' value");
    }
    socket.emit("createOrderSuccess", true);
  });
};

const fulfillOrder = async (io, socket) => {
  socket.on("fulfillOrder", async (info) => {
    if (info.orderId && info.isFulfilled) {
      try {
        await orderModel.updateOne(
          { _id: info.orderId },
          {
            isFulfilled: info.isFulfilled,
          },
          { timestamps: false }
        );
        const savedOrder = await orderModel.findOne({ _id: info.orderId });
        const savedVan = await vanModel.findOne({ _id: savedOrder.van });
        const customer = await userModel.findOne({ _id: savedOrder.customer });
        socket.emit("orderFulfilledUpdated", savedOrder);
        io.sockets.emit(ORDERS_CHANGED, {
          customer: customer.username,
          van: savedVan.vanName,
        });
      } catch (error) {
        socket.emit("error", error.message);
        console.log(error);
      }
    } else {
      socket.emit("error", "Missing orderId or isFulfilled");
    }
  });
};

const completeOrder = async (io, socket) => {
  socket.on("completeOrder", async (info) => {
    if (info.orderId && info.isComplete) {
      try {
        await orderModel.updateOne(
          { _id: info.orderId },
          {
            isCompleted: info.isComplete,
          },
          { timestamps: false }
        );
        const savedOrder = await orderModel.findOne({ _id: info.orderId });
        const savedVan = await vanModel.findOne({ _id: savedOrder.van });
        const customer = await userModel.findOne({ _id: savedOrder.customer });

        socket.emit("orderCompleteUpdated", savedOrder);
        io.sockets.emit(ORDERS_CHANGED, {
          customer: customer.username,
          van: savedVan.vanName,
        });
      } catch (error) {
        socket.emit("error", error.message);
        console.log(error);
      }
    } else {
      socket.emit("error", "Missing orderId or isComplete");
    }
  });
};

const rateOrder = async (io, socket) => {
  socket.on("rateOrder", async (info) => {
    console.log(info)
    if (info.orderId && info.rating && (info.feedback || info.feedback === "")) {
      try {
        await orderModel.updateOne(
          { _id: info.orderId },
          {
            rating: info.rating,
            feedback: info.feedback,
          },
          { timestamps: false }
        );
        const savedOrder = await orderModel.findOne({ _id: info.orderId });
        const savedVan = await vanModel.findOne({ _id: savedOrder.van });
        const customer = await userModel.findOne({ _id: savedOrder.customer });

        socket.emit("orderRated", savedOrder);
        io.sockets.emit(ORDERS_CHANGED, {
          customer: customer.username,
          van: savedVan.vanName,
        });
      } catch (error) {
        socket.emit("error", error.message);
        console.log(error);
      }
    } else {
      socket.emit("error", "Missing orderId, rating or feedback");
    }
  });
};

const orderModify = async (io, socket) => {
  socket.on("orderModify", async (info) => {
    if (info.orderId && info.snacks) {
      orderedSnackIds = await orderController.getSnackIds(info.snacks);
      try {
        await orderModel.updateOne(
          { _id: info.orderId },
          {
            snacks: orderedSnackIds,
            isChanged: true,
          },
          { timestamps: true }
        );
        const savedOrder = await orderModel.findOne({ _id: info.orderId });
        const savedVan = await vanModel.findOne({ _id: savedOrder.van });
        socket.emit("orderModified", savedOrder);
        io.sockets.emit(ORDERS_CHANGED, {
          customer: socket.handshake.auth.username,
          van: savedVan.vanName,
        });
      } catch (error) {
        socket.emit("error", error.message);
        console.log(error);
      }
    } else {
      socket.emit("error", "Missing orderId or snacks");
    }
  });
};

const cancelOrder = async (io, socket) => {
  socket.on("cancelOrder", async (info) => {
    if (info.orderId && info.isCancelled) {
      try {
        await orderModel.updateOne(
          { _id: info.orderId },
          {
            isCancelled: info.isCancelled,
          },
          { timestamps: false }
        );
        const savedOrder = await orderModel.findOne({ _id: info.orderId });
        const savedVan = await vanModel.findOne({ _id: savedOrder.van });
        socket.emit("orderCancelUpdated", savedOrder);
        io.sockets.emit(ORDERS_CHANGED, {
          customer: socket.handshake.auth.username,
          van: savedVan.vanName,
        });
      } catch (error) {
        socket.emit("error", error.message);
        console.log(error);
      }
    } else {
      socket.emit("error", "Missing orderId or isCancelled");
    }
  });
};

const getOrder = async (socket) => {
  socket.on("requestOrder", async (info) => {
    if (info.orderId) {
      try {
        const savedOrder = await orderModel
          .findOne({ _id: info.orderId })
          .populate(["snacks", "van"]);
        socket.emit("order", savedOrder);
      } catch (error) {
        socket.emit("error", error.message);
      }
    } else {
      socket.emit("error", "Missing orderId");
    }
  });
};

const orderConnection = async (io) => {
  io.on("connection", (socket) => {
    console.log(`New client connected to socket: ${socket.id}`);

    orderListVan(socket);
    createOrder(io, socket);
    fulfillOrder(io, socket);
    completeOrder(io, socket);

    orderListCustomer(socket);
    getOrder(socket);
    orderModify(io, socket);
    cancelOrder(io, socket);
    rateOrder(io, socket);
  });
};

module.exports = orderConnection;
