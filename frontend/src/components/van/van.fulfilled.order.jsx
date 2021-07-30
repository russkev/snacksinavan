import React from "react";
import groupSnacks from "../../components/group.snacks";
import useVanOrder from "../../hooks/useVanOrder";
import chevron from "../../media/chevron.svg";

// Displays a single fulfilled order and its details, along with a button to
// complete the order.
export default function FulfilledOrder({ order }) {
  const { toggleExpand, orderTotals, setIsCompleted } =
    useVanOrder(order);

  const snacks = order.snacks;
  let groupedSnacks = groupSnacks(snacks);
  let numSnackType = groupedSnacks.length;

  // Get the time and date the order was last updated at
  let dateTime = new Date(order.updatedAt);
  let timeStamp = dateTime.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  let date = dateTime.toLocaleDateString();

  return (
    <div>
      <div className="van-order-container">
        <div className="van-order-container-first fulfilled-first" onClick={(event) => toggleExpand(event)}>
          <div className="van-order-title-container">
            <h4 className="van-order-title">
              {order.customer.firstName} {order.customer.lastName}
            </h4>
          </div>
          <ul className="van-order-snack-list van-order-items">
            {order.snacks.map((snack, index) => (
              <li key={snack[0].name}>
                {snack.length} x {snack[0].name}
                {index + 1 === numSnackType}
              </li>
            ))}
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
        <div className="van-order-countdown-container fulfilled-second">
          <div className="van-order-title-container time">
            <h4 className="van-order-title">
              {timeStamp}
            </h4>
            <span className="date">
               {date}
            </span>
          </div>
          <button className="van-completed-button" value={order._id} onClick={setIsCompleted}>
            Completed
          </button>
        </div>
        <hr className="van-order-separator" />
      </div>
    </div>
  );
}

// Displays text signifying no currently fulfilled orders if applicable
export function NoOrders({ vanOrders }) {

  let numFulfilled = 0;
  for (let i in vanOrders) {
    let vanOrder = vanOrders[i];
    if (vanOrder.isFulfilled && !vanOrder.isCompleted && !vanOrder.isCancelled) {
      numFulfilled++;
    }
  }

  return (
    <React.Fragment> 
      {numFulfilled === 0 ? <h4 className="no-orders">You currently have no orders waiting to be picked up.</h4> : <></>}
    </React.Fragment>
  )
}
