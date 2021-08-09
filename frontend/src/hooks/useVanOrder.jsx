import { useState, useEffect } from "react";
import orderTimeLeft, { timePassedSeconds } from "../components/order.time.left";
import { linearInterpolate } from "../components/util";
import useGlobals from "../hooks/useGlobals";
import useVanOrders from "./useVanOrders";


export const ORDER_START_HUE = 120;
export const ORDER_END_HUE = 0;
export const ORDER_SATURATION = "60%";
export const ORDER_VALUE = "50%";

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

    order.snacks.forEach(
      (snackGroup) => (subTotal += snackGroup.quantity * snackGroup.snack.price)
    );

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

const calculateTimeLeft = (order, discountTime, setTimeLeft, setOrderHue) => {
  if (order && discountTime) {
    const currTimeLeft = orderTimeLeft(order, discountTime, true);
    const timeTaken = timePassedSeconds(order.updatedAt) / 60;
    if (timeTaken < discountTime) {
      const timeRatio = timeTaken / discountTime;
      setOrderHue(Math.floor(linearInterpolate(ORDER_START_HUE, timeRatio, ORDER_END_HUE)));
    } else {
      setOrderHue(ORDER_END_HUE);
    }
    setTimeLeft(currTimeLeft);
  } else {
    return "";
  }
};

export default function useVanOrder(order) {
  const [timeLeft, setTimeLeft] = useState("");
  const [orderHue, setOrderHue] = useState(ORDER_START_HUE);
  const [orderTotals, setOrderTotals] = useState({ subtotal: 0, discount: 0, total: 0 });
  const [fulfilledClicked, setFulfilledClicked] = useState(false);
  const [completedClicked, setCompletedClicked] = useState(false);
  const { globals } = useGlobals();
  const { vanSocket } = useVanOrders();

  // Regularly update the order timer
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft(order, globals.discountTime, setTimeLeft, setOrderHue);
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (order) {
      calculateTimeLeft(order, globals.discountTime, setTimeLeft, setOrderHue);
    }
  }, [order, globals.discountTime]);

  // Initialize order totals
  useEffect(() => {
    calculateOrderTotals(order, setOrderTotals, globals.delayDiscount);
  }, [order, globals.delayDiscount]);

  useEffect(() => {
    // Code snippet thanks to Jason Knight
    // https://codepen.io/jason-knight/pen/XWjVZbg
    const target = document.querySelector(`div.van .details.id-${order._id}`);

    function resize() {
      const expandedHeight = target.firstElementChild.offsetHeight + "px";
      if (target.style.getPropertyValue("--expanded-height") !== expandedHeight) {
        target.style.setProperty("--expanded-height", expandedHeight);
      }
    }

    if (target) {
      window.addEventListener("resize", resize, false);
      window.addEventListener("load", resize, false);
    }

    resize();

    return () => {
      if (target) {
        window.removeEventListener("resize", resize, false);
        window.removeEventListener("load", resize, false);
      }
    };
  }, [order._id]);

  const setIsFulfilled = async (event) => {
    setFulfilledClicked(true);
    event.preventDefault();
    setTimeout(() => {
      try {
        postOrderFulfilled(vanSocket, order._id, true);
      } catch (error) {
        console.log(error);
      } finally {
        setFulfilledClicked(false);
      }
    }, 500);
  };

  const setIsCompleted = async (event) => {
    setCompletedClicked(true);
    event.preventDefault();
    setTimeout(() => {
      try {
        postOrderCompleted(vanSocket, order._id, true);
      } catch (error) {
        console.log(error);
      } finally {
        setCompletedClicked(false);
      }
    }, 500);
  };

  const toggleExpand = (event) => {
    event.preventDefault();
    const expandableElements = document.getElementsByClassName(`id-${order._id}`);

    Array.from(expandableElements).forEach((expandableElement) => {
      if (expandableElement.classList.contains("expanded")) {
        expandableElement.classList.remove("expanded");
      } else {
        expandableElement.classList.add("expanded");
      }
    });
  };

  return {
    timeLeft,
    orderHue,
    toggleExpand,
    orderTotals,
    setIsCompleted,
    setIsFulfilled,
    fulfilledClicked,
    completedClicked,
  };
}
