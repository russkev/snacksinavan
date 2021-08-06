import { useState } from "react";
import useOrders from "../hooks/useOrders";

async function postOrderRating(socket, order, rating, comment) {
  const toSend = {
    orderId: order._id,
    rating: rating,
    feedback: comment,
  };
  socket.emit("rateOrder", toSend);
  socket.on("error", (error) => {
    console.log(error);
  });
}

export default function useRating(order) {
  const [finalRating, setFinalRating] = useState(0);
  const [comment, setComment] = useState("");
  const { socket } = useOrders();

  function hoverOnRating(rating) {
    for (let i = 1; i <= 5; i++) {
      let star = document.getElementById(`rating-${i}`);
      if (i <= rating) {
        star.classList.add("filled");
      } else {
        star.classList.remove("filled");
        star.classList.remove("hovered");
      }
      if (i === rating) {
        star.classList.add("hovered");
      }
    }
  }

  function hoverOffRating() {
    for (let i = 1; i <= 5; i++) {
      let star = document.getElementById(`rating-${i}`);
      if (i <= finalRating) {
        star.classList.add("filled");
        star.classList.remove("hovered");
      } else {
        star.classList.remove("filled");
        star.classList.remove("hovered");
      }
    }
  }

  function onFinalRatingClick(rating) {
    setFinalRating(rating);
  }

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  function handleRatingSubmit(event) {
    postOrderRating(socket, order, finalRating, comment);
    setComment("");
    setFinalRating(0);
    if (event) {
      event.preventDefault();
    }
  }

  return {
    hoverOnRating,
    hoverOffRating,
    onFinalRatingClick,
    onCommentChange,
    handleRatingSubmit,
    finalRating,
    comment,
  };
}
