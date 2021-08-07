import React from "react";
import useVanOrder, { ORDER_SATURATION, ORDER_VALUE } from "../../hooks/useVanOrder";
import loading_small_green from "../../media/loading_small_green.svg";
import ChevronLeftIcon from "../../media/chevron.left.icon";
import ButtonLoading from "../../media/button.loading";

export default function VanOrder({ order }) {
  const { toggleExpand, timeLeft, orderHue, orderTotals, setIsFulfilled, fulfilledClicked } =
    useVanOrder(order);

  const dateTime = new Date(order.updatedAt);
  const date = dateTime.toLocaleDateString();

  return (
    <div className="van-order">
      <section className="fulfilled">
        {fulfilledClicked ? (
          <svg viewBox="0 0 24 24">
            <ButtonLoading />
          </svg>
        ) : (
          <button onClick={setIsFulfilled}>Fulfilled</button>
        )}
      </section>
      <section className="main-info" onClick={(event) => toggleExpand(event)}>
        <div>
          <h2>{order.customer.firstName}</h2>
          {order.isChanged === true ? <h4 className="van-order-title">CHANGED</h4> : <></>}
        </div>
        <ul>
          {order.snacks.map((snackGroup) => {
            return (
              <li key={snackGroup.snack.name}>
                <strong>{snackGroup.quantity} x </strong>
                {snackGroup.snack.name}
              </li>
            );
          })}
        </ul>
        <div className={`details ${order._id}`}>
          <div>
            <div>ID:</div>
            <div>{order._id.slice(-6)}</div>
            <div>Order Time:</div>
            <div>{order.updatedAt.slice(11, 19)}</div>
            <div>Date:</div>
            <div>{date}</div>
          </div>
          <div>
            <div>Subtotal:</div>
            <div>{`$${orderTotals.subtotal.toFixed(2)}`}</div>
            <div>Discount:</div>
            <div>{`$${orderTotals.discount.toFixed(2)}`}</div>
            <div>
              <strong>Total:</strong>
            </div>
            <div>
              <strong>{`$${orderTotals.total.toFixed(2)}`}</strong>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 24 24" className={`chevron ${order._id}`}>
          <ChevronLeftIcon />
        </svg>
      </section>
      <section className="countdown">
        <h4>Time left to prepare:</h4>
        <div>
          <div>
            <h2>{timeLeft}</h2>
          </div>
          <div
            style={{ backgroundColor: `hsl(${orderHue}, ${ORDER_SATURATION}, ${ORDER_VALUE})` }}
          ></div>
        </div>
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
