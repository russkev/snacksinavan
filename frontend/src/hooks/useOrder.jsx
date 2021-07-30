import { useEffect, useState } from "react";
import useGlobals from "../hooks/useGlobals";
import { timePassedSeconds } from "../components/order.time.left";
import { calculateOrderTotals } from "../hooks/useVanOrder";
import { useHistory } from "react-router-dom";
import useOrders from "./useOrders";

/*  Chooses the most appropriate status to display for the order. Also prepends
    the discounted status if appropriate. */
function calculateOrderStatus(order, globals) {
  let status = { 
    color: "var(--orange)", 
    text: "Preparing...",
    longText: "Order is being prepared",
    comment: ["Your order will be ready in:"],
  };
  if (timePassedSeconds(order.updatedAt) > globals.discountTime * 60) {
    status.comment = ["Your order is taking much longer than expected. "
    + "Our expert snack makers are working hard to finish your order.",
    "To compensate you for the delay, we have applied a "
    + `${Math.floor(globals.delayDiscount * 100)}% discount to your order.`]
  }

  if (order.isCancelled) {
    status.text = "Cancelled";
    status.longText = "Order has been cancelled"
    status.color = "darkRed";
    status.comment = ["Your order has been cancelled"]
  } else if (order.isCompleted) {
    status.text = "Completed";
    status.longText = "Order is complete"
    status.color = "black";
    status.comment = ["Thank you for ordering from Snacks in a Van"]
  } else if (order.isFulfilled) {
    status.text = "Ready for collection";
    status.longText = "Order is ready for collection"
    status.color = "green";
    status.comment = ["Your order is ready for collection"]
  }
  return status;
}

async function postOrderRating(socket, order, rating, comment) {
  
  const toSend = {
    orderId: order._id,
    rating: rating,
    feedback: comment,
  }
  socket.emit("rateOrder", toSend);
  socket.on("error", (error) => {
    console.log(error)
  })

}

const calculateTimeStatus = (updatedAt) => {
  const currentTime = new Date();
  const orderTime = new Date(updatedAt);
  if (currentTime.getDate() === orderTime.getDate()) {
    const secondsPassed = timePassedSeconds(updatedAt);
    if (secondsPassed < 3600) {
      const mins = Math.max(Math.floor(secondsPassed / 60), 0);
      return `${mins} minutes ago`;
    } else {
      return orderTime.toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })

    }
  } else {
    return orderTime.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
};

export default function useOrder(order) {
  const [timeValue, setTimeValue] = useState("");
  const [orderTotals, setOrderTotals] = useState({ subtotal: 0, discount: 0, total: 0 });
  const { globals } = useGlobals();
  const [orderStatus, setOrderStatus] = useState({});
  const [rating, setRating] = useState(0)
  const { socket } = useOrders();
  const [comment, setComment] = useState("");
  const history = useHistory();

  // Regularly update the amount of time left
  useEffect(() => {
    const timer = setInterval(() => {
      if(order) {
        setTimeValue(calculateTimeStatus(order.updatedAt));
      }
    }, 3000);
    return () => clearInterval(timer);
  });

  // Initialize the amount of time left
  useEffect(() => {
    if (order) {
      setTimeValue(calculateTimeStatus(order.updatedAt));
    }
  }, [order])

  // Initialize order totals
  useEffect(() => {
    if (order && globals.delayDiscount) {
      calculateOrderTotals(order, setOrderTotals, globals.delayDiscount);
      setOrderStatus(calculateOrderStatus(order, globals));
    }
  }, [order, globals]);

  function handleOrderSelect(event) {
    event.preventDefault();
    history.push("/customer/orders/" + order._id);
  }

  function handleRatingSubmit(event) {
    postOrderRating(socket, order, rating, comment)
    setComment("");
    setRating(0);
    if (event) {
      event.preventDefault()
    }
  }

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  return {
    timeValue,
    orderTotals,
    orderStatus,
    handleOrderSelect,
    handleRatingSubmit,
    rating,
    setRating,
    comment,
    onCommentChange,
  };
}
