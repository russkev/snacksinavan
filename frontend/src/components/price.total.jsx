import React from "react";

export default function TotalPrice({ total }) {
  return (
    <div>
      <h4>Subtotal:</h4>
      <h4>${Math.abs(total).toFixed(2)}</h4>
      <h4>Discounts:</h4>
      <h4>$0.00</h4>
      <h3>Total price: </h3>
      <h3>${Math.abs(total).toFixed(2)} </h3>
    </div>
  );
}
