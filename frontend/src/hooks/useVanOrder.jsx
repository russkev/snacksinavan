import { useState, useEffect } from "react";
import orderTimeLeft, { timePassedSeconds } from "../components/order.time.left";
import { linearInterpolateRGB } from "../components/util";
import useGlobals from "../hooks/useGlobals";
import useVanOrders from "./useVanOrders";

export const ORDER_START_COLOR = [109, 197, 115];
export const ORDER_END_COLOR = [207, 67, 67];

// Sets an order's isFulfilled status in the database
async function postOrderFulfilled(socket, orderId, isFulfilled) {
  const orderUpdate = { orderId: orderId, isFulfilled: isFulfilled };
  socket.emit("fulfillOrder", orderUpdate);
  socket.on("error", (error) => console.log(error));
}

// Sets an order's isCompleted status in the database
async function postOrderCompleted(socket, orderId, isCompleted) {
  const info = { orderId: orderId, isComplete: isCompleted };
  socket.emit("completeOrder", info);
  socket.on("error", (error) => console.log(error));
}

export function calculateOrderTotals(order, setOrderTotals, delayDiscount) {
  if (order.snacks && delayDiscount) {
    let subTotal = 0;
    if (order.snacks[0] && order.snacks[0].length > 0) {
      order.snacks.forEach((snack) => (subTotal += snack.length * snack[0].price));
    } else {
      order.snacks.forEach((snack) => (subTotal += snack.price));
    }
    const lateDiscount = order.isDiscounted ? -delayDiscount * subTotal : 0;
    const cancelledDiscount =
      !order.isFulfilled && order.isCancelled ? -(subTotal + lateDiscount) : 0;
    const discount = lateDiscount + cancelledDiscount;
    const total = subTotal + discount;
    setOrderTotals({
      subtotal: subTotal,
      lateDiscount: lateDiscount,
      cancelledDiscount: cancelledDiscount,
      discount: discount,
      total: total,
    });
  }
}

const calculateTimeLeft = (order, discountTime, setTimeLeft, setOrderColor) => {
  if (order && discountTime) {
    const currTimeLeft = orderTimeLeft(order, discountTime, true);
    const timeTaken = timePassedSeconds(order.updatedAt) / 60;
    if (timeTaken < discountTime) {
      const timeRatio = timeTaken / discountTime;
      setOrderColor(linearInterpolateRGB(ORDER_START_COLOR, timeRatio, ORDER_END_COLOR));
    } else {
      setOrderColor(linearInterpolateRGB(ORDER_START_COLOR, 1, ORDER_END_COLOR));
    }
    setTimeLeft(currTimeLeft);
  } else {
    return "";
  }
};

export default function useVanOrder(order) {
  const [timeLeft, setTimeLeft] = useState("");
  const [orderColor, setOrderColor] = useState("rgb(127, 127, 127)");
  const [orderTotals, setOrderTotals] = useState({ subtotal: 0, discount: 0, total: 0 });
  const [fulfilledClicked, setFulfilledClicked] = useState(false);
  const { globals } = useGlobals();
  const { vanSocket } = useVanOrders();

  // Regularly update the order timer
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft(order, globals.discountTime, setTimeLeft, setOrderColor);
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (order) {
      calculateTimeLeft(order, globals.discountTime, setTimeLeft, setOrderColor);
    }
  }, [order, globals.discountTime]);

  // Initialize order totals
  useEffect(() => {
    calculateOrderTotals(order, setOrderTotals, globals.delayDiscount);
  }, [order, globals.delayDiscount]);

  const setIsFulfilled = async (event) => {
    setFulfilledClicked(true);
    event.preventDefault();
    try {
      postOrderFulfilled(vanSocket, order._id, true);
    } catch (error) {
      console.log(error);
      setFulfilledClicked(false);
    }
  };

  const setIsCompleted = async (event) => {
    event.preventDefault();
    try {
      postOrderCompleted(vanSocket, order._id, true);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExpand = (event) => {
    event.preventDefault();
    const expandableElement = document.getElementById(`detailsID${order._id}`);
    if (expandableElement) {
      if (expandableElement.className.includes("expanded")) {
        expandableElement.className = "van-order-details";
      } else {
        expandableElement.className = "van-order-details  van-order-details-expanded";
      }
    }
  };

  return {
    timeLeft,
    orderColor,
    toggleExpand,
    orderTotals,
    setIsCompleted,
    setIsFulfilled,
    fulfilledClicked,
  };
}
