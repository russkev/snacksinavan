import React from "react";


function OrderDiscounts({ orderTotals }) {
  if (!orderTotals.discount) {
    return (
      <div>
        <span>Discount:</span>
        <span>$0.00</span>
      </div>
    );
  } else {
    return (
      <>
        {orderTotals.lateDiscount ? (
          <div>
            <span>Discount (late fulfillment):</span>
            <span>{`$${orderTotals.lateDiscount.toFixed(2)}`}</span>
          </div>
        ) : (
          <></>
        )}
        {orderTotals.cancelledDiscount ? (
          <div>
            <span>Discount (early cancellation):</span>
            <span>{`$${orderTotals.cancelledDiscount.toFixed(2)}`}</span>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default function OrderInvoice({ order, orderTotals }) {
  return (
    <div className="invoice">
      <div className="invoice-main">
        <h2>Invoice</h2>
        {order.isCancelled ? <h4>Cancelled order</h4> : <></>}
        {order.snacks.map((snackGroup) => {
          const snackItem = snackGroup.snack;
          return (
            <div key={snackGroup._id}>
              <span>
                <strong>{snackGroup.quantity}x</strong> {snackItem.name}
              </span>
              <span>{`$${(snackGroup.quantity * snackItem.price).toFixed(2)}`}</span>
            </div>
          );
        })}
      </div>
      {orderTotals ? (
        <summary className="order-totals">
          <div>
            <span>Subtotal</span>
            <span>{`$${orderTotals.subtotal.toFixed(2)}`}</span>
          </div>
          <OrderDiscounts orderTotals={orderTotals} />
          <div className="info-totals-span">
            <span>
              <h3>Total</h3>
            </span>
            <span>
              <h3>{`$${orderTotals.total.toFixed(2)}`}</h3>
            </span>
          </div>
        </summary>
      ) : (
        <></>
      )}
    </div>
  );
}
