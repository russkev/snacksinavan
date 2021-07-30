import React from "react";
import useVanOrder from "../../hooks/useVanOrder";
import loading_small_green from "../../media/loading_small_green.svg";
import chevron from "../../media/chevron.svg";

export default function VanOrder({ order }) {
  const { toggleExpand, timeLeft, orderColor, orderTotals, setIsFulfilled, fulfilledClicked } =
    useVanOrder(order);
  return (
    
    <div className="van-order-container">
      <div className="van-order-container-first order-first" onClick={(event) => toggleExpand(event)}>
        <div className="van-order-title-container">
          <h4 className="van-order-title">{order.customer.firstName}</h4>
          {order.isChanged === true 
            ? <h4 className="van-order-title">CHANGED</h4> 
            : <></>
          }
        </div>
        <ul className="van-order-snack-list van-order-items">
          {order.snacks.map((snack) => {
            return (
              <li key={snack[0].name}>
                {snack.length} x {snack[0].name}
              </li>
            );
          })}
        </ul>
        <div className="van-order-details" id={`detailsID${order._id}`}>
        <div className="order-info-grid">
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
          </div>
        </div>
        <div className="chevron">
          <img src={chevron} alt="expand order details"></img>
        </div>
      </div>
      <div className="van-order-countdown-container" style={{ backgroundColor: orderColor }}>
        <div
          className="van-order-title-container"
          style={{ minWidth: `${timeLeft.length * 14}px` }}
        >
          <h4 className="van-order-title">{timeLeft}</h4>
        </div>
        <div className="van-order-fulfilled-button-container">
          {fulfilledClicked ? (
            <div className="van-order-loading-circle-container">
              <img src={loading_small_green} className="loading-circle-small-green" alt="loading" />
            </div>
          ) : (
            <button className="van-order-fulfilled-button" onClick={setIsFulfilled}>
              Fulfilled
            </button>
          )}
        </div>
      </div>
      <hr className="van-order-separator" />
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
          {numActive === 0 ? <h4 className="no-orders">You don't have any active orders. Relax!</h4> : <></>}
      </React.Fragment>
  )
}