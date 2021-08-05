import React from "react";
import { timeLeft } from "../components/order.time.left";
import useGlobals from "../hooks/useGlobals";

export default function OrderStatusBar({ order, orderStatus }) {
  const { globals } = useGlobals();
  const currentTimeLeft = timeLeft(order.updatedAt, globals.discountTime);
  var readyIn;
  var secsLeft;
  if (currentTimeLeft.multiplier < 0 || order.isFulfilled) {
    readyIn = "";
    secsLeft = 0;
  } else {
    secsLeft = currentTimeLeft.minutes * 60 + currentTimeLeft.seconds;
    readyIn = currentTimeLeft.minutes.toString() + " Minutes!";
  }

  if (orderStatus && orderStatus.comment) {
    return (
      <div className="order-status">
            {orderStatus.comment.map((line, i) => {
              if (i === 1) {
                return (
                  <p key={line}>
                    {line}
                  </p>
                );
              } else {
                return <p key={line}>{line}</p>;
              }
            })}
          {!order.isFulfilled && !order.isCompleted && !order.isCancelled ? (
            <p><strong>{readyIn}</strong></p>
          ) : <></>}
        {!order.isCompleted && !order.isFulfilled ? (
          <div className="progress">
            <div
              style={{
                width:
                  (
                    ((globals.discountTime * 60 - secsLeft) / (globals.discountTime * 60)) *
                    100
                  ).toString() + "%",
              }}
            />
          </div>
        ) : !order.isCompleted ? 
        <div className="progress">
          <div
          style={{
            width: "100%", backgroundColor: "var(--success)",
            }}
        ></div></div> :
          <></>}
    </div>);
  } else {
    return <></>;
  }
}
