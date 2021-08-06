import React from "react";
import { timeLeft } from "./order.time.left";
import useGlobals from "../hooks/useGlobals";

function ProgressBar({order, secsLeft, globals}) {
  if (!order.isCompleted && !order.isFulfilled && !order.isCancelled) {
    // Order still in progress
    return (
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
    );
  } else if (order.isFulfilled && !order.isCompleted && !order.isCancelled) {
    // Order fulfilled but not picked up
    return (
      <div className="progress">
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--success)",
          }}
        ></div>
      </div>
    );
  } else {
    // Progress bar not required
    return <> </>
  }
}

function OrderStatusText({order, orderStatus, readyIn}) {
  return (
    <div className="order-status">
      <div>
        {orderStatus.comment.map((line, i) => {
          if (i === 1) {
            return <p key={line}>{line}</p>;
          } else {
            return <p key={line}>{line}</p>;
          }
        })}
      </div>
      {!order.isFulfilled && !order.isCompleted && !order.isCancelled ? (
        <p>
          <strong>{readyIn}</strong>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default function OrderStatus({ order, orderStatus }) {
  const { globals } = useGlobals();
  const currentTimeLeft = timeLeft(order.updatedAt, globals.discountTime);
  var readyIn;
  var secsLeft;
  if (currentTimeLeft.multiplier < 0 || order.isFulfilled) {
    readyIn = "";
    secsLeft = 0;
  } else {
    secsLeft = currentTimeLeft.minutes * 60 + currentTimeLeft.seconds;
    readyIn = (currentTimeLeft.minutes + 1).toString() + " Minutes!";
  }

  if (orderStatus && orderStatus.comment) {
    return (
      <>
        <OrderStatusText order={order} orderStatus={orderStatus} readyIn={readyIn} />
        <ProgressBar order={order} secsLeft={secsLeft} globals={globals} />
      </>
    );
  } else {
    return <></>;
  }
}
