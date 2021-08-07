import React from "react";
import useVanOrder from "../../hooks/useVanOrder";
import loading_small_green from "../../media/loading_small_green.svg";
import chevron from "../../media/chevron.svg";
import ChevronLeftIcon from "../../media/chevron.left.icon";

export default function VanOrder({ order }) {
  const { toggleExpand, timeLeft, orderColor, orderTotals, setIsFulfilled, fulfilledClicked } =
    useVanOrder(order);
  return (
    <div className="van-order">
      <section
        // className="van-order-container-first order-first"
        onClick={(event) => toggleExpand(event)}
      >
        <div>
          {/* <div className="van-order-title-container"> */}
          <h2>{order.customer.firstName}</h2>
          {order.isChanged === true ? <h4 className="van-order-title">CHANGED</h4> : <></>}
        </div>
        {/* <ul className="van-order-snack-list van-order-items"> */}
        <ul>
          {order.snacks.map((snackGroup) => {
            return (
              <li key={snackGroup.snack.name}>
                {snackGroup.quantity} x {snackGroup.snack.name}
              </li>
            );
          })}
        </ul>
        {/* <div className="van-order-details" id={`detailsID${order._id}`}> */}
        <div className={`details ${order._id}`}>
          {/* <div className="order-info-grid">
            <div className="van-order-price-item">Subtotal:</div>
            <div className="van-order-pad-right">{`$${orderTotals.subtotal.toFixed(2)}`}</div>
            <div className="van-order-price-item">Discount:</div>
            <div className="van-order-pad-right">{`$${orderTotals.discount.toFixed(2)}`}</div>
            <div className="van-order-price-item van-order-price-bold">Total:</div>
            <div className="van-order-price-bold van-order-pad-right">
              {`$${orderTotals.total.toFixed(2)}`}
            </div>
            <div className="van-order-price-item">Order Time:</div>
            <div className="van-order-details-left">{order.updatedAt.slice(11, 19)}</div>
            <div className="van-order-price-item">ID:</div>
            <div className="van-order-details-left">{order._id.slice(-6)}</div>
            <div className="van-order-details-end" />
            <div />
          </div> */}
          <div>
            <div>Subtotal:</div>
            <div>{`$${orderTotals.subtotal.toFixed(2)}`}</div>
            <div>Discount:</div>
            <div>{`$${orderTotals.discount.toFixed(2)}`}</div>
            <div>Total:</div>
            <div>{`$${orderTotals.total.toFixed(2)}`}</div>
            <div>Order Time:</div>
            <div>{order.updatedAt.slice(11, 19)}</div>
            <div>ID:</div>
            <div>{order._id.slice(-6)}</div>
            <div />
            <div />
          </div>
        </div>
        {/* <div className="chevron">
          <img src={chevron} alt="expand order details"></img>
        </div> */}
        <svg viewBox="0 0 24 24" className={`chevron ${order._id}`}>
          <ChevronLeftIcon />
        </svg>
      </section>
      {/* <section className="van-order-countdown-container" style={{ backgroundColor: orderColor }}> */}
      <section className="countdown">
        <h4>Time left to prepare:</h4>
        <div style={{ backgroundColor: orderColor }}>
          <div
            // className="van-order-title-container"
            style={{ width: `${timeLeft.length * 14}px`, backgroundColor: orderColor }}
          >
            <h2>{timeLeft}</h2>
          </div>
        </div>
        {/* <div className="van-order-fulfilled-button-container"> */}
      </section>
      <section>
        {fulfilledClicked ? (
          <div className="van-order-loading-circle-container">
            <img src={loading_small_green} className="loading-circle-small-green" alt="loading" />
          </div>
        ) : (
          <button className="van-order-fulfilled-button" onClick={setIsFulfilled}>
            {/* <button className="van-order-fulfilled-button" onClick={setIsFulfilled}> */}
            Fulfilled
          </button>
        )}
      </section>
    </div>
  );
}

// Displays text signifying no currently active orders if applicable
export function NoOrders({ vanOrders }) {
  let numActive = 0;
  for (let i in vanOrders) {
    let vanOrder = vanOrders[i];
    if (!vanOrder.isFulfilled && !vanOrder.isCompleted && !vanOrder.isCancelled) {
      numActive++;
    }
  }

  return (
    <React.Fragment>
      {numActive === 0 ? (
        <h4 className="no-orders">You don't have any active orders. Relax!</h4>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
