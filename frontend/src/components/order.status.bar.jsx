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
      <div className="order-status-bar">
        <div className="ready-in">
          <div>
            {orderStatus.comment.map((line, i) => {
              if (i === 1) {
                return (
                  <h4 key={line} style={{ fontSize: "18pt" }}>
                    {line}
                  </h4>
                );
              } else {
                return <h4 key={line}>{line}</h4>;
              }
            })}
          </div>
          {!order.isFulfilled && !order.isCompleted && !order.isCancelled ? (
            <h4 id="time-left">{readyIn}</h4>
          ) : <></>}
        </div>
        {!order.isCompleted && !order.isFulfilled ? (
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width:
                  (
                    ((globals.discountTime * 60 - secsLeft) / (globals.discountTime * 60)) *
                    100
                  ).toString() + "%",
              }}
            ></div>
          </div>
        ) : !order.isCompleted ? 
        <div className="progress-bar">
          <div
          className="progress"
          style={{
            width: "100%", backgroundColor: "green",
            }}
        ></div></div> :
          <></>}
    </div>);
  } else {
    return <></>;
  }
}
