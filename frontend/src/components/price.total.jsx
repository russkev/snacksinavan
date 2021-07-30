import React from "react";



export default function TotalPrice({total, setTotal}) {
  return (
    <div>
        <h2 className="cart-price-card">Total price: ${(Math.abs(total)).toFixed(2)} </h2>
    </div>
      
  );
}

