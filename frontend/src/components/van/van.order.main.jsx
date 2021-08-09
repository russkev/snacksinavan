import React from "react";
import ChevronLeftIcon from "../../media/chevron.left.icon";
import Stars from "../stars";

export default function VanOrderMain({
  order,
  orderTotals,
  date,
  toggleExpand,
  hasRating,
  rating,
  feedback,
}) {
  function TimeData() {
    return (
      <>
        <div>ID:</div>
        <div>{order._id.slice(-6)}</div>
        <div>Order Time:</div>
        <div>{order.updatedAt.slice(11, 19)}</div>
        <div>Date:</div>
        <div>{date}</div>
      </>
    );
  }
  function TotalsData() {
    return (
      <>
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
      </>
    );
  }

  function FeedbackData() {
    return (
      <>
        <div>Rating:</div>
        <div>
          <Stars rating={rating} />
        </div>
        <div>Feedback:</div>
        <div>{feedback}</div>
      </>
    );
  }

  return (
    <section className="main-info" onClick={(event) => toggleExpand(event)}>
          <div>
            <h2>{order.customer.firstName}</h2>
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
      {hasRating ? (
        <div className={`details with-rating id-${order._id}`}>
          <div className="content">
            <div className="section">
              <TimeData />
              <TotalsData />
            </div>
            <div className="section">
              <FeedbackData />
            </div>
          </div>
        </div>
      ) : (
        <div className={`details id-${order._id}`}>
          <div className="content">
            <div className="section">
              <TimeData />
            </div>
            <div className="section">
              <TotalsData />
            </div>
          </div>
        </div>
      )}
      <svg viewBox="0 0 24 24" className={`chevron id-${order._id}`}>
        <ChevronLeftIcon />
      </svg>
    </section>
  );
}
