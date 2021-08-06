import React from "react";
import groupSnacks from "../components/group.snacks";

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
        {orderTotals.lateDiscount ? (
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
  const groupedSnacks = order ? groupSnacks(order.snacks) : null;

  return (
    <div className="invoice">
      <h2>Invoice</h2>
      {order.isCancelled ? <h4>Cancelled order</h4> : <></>}
      {groupedSnacks.map((snack) => (
        <div key={snack[0].name}>
          <span>
            <strong>{snack.length}x</strong> {snack[0].name}
          </span>
          <span>{`$${(snack.length * snack[0].price).toFixed(2)}`}</span>
        </div>
      ))}
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
