import React from "react";
import useCart from "../hooks/useCart";

export default function CartItemCard({ snack, cart}) {
  const { updateCart } = useCart();

  if (typeof cart[snack.name] === "undefined") {
    return null;
  }
  return (
    <div className="menu-item-holder">
      <div className="menu-item-card no-click cart-card">
        {/* <Avatar imageUrl={snack.photo} width="128px" hardRight={true} /> */}
        <div className="menu-item-card-details">
          <div className="menu-item-card-heading">
            <h4>{snack.name}</h4>
            <h4>{cart[snack.name]}</h4>
          </div>
          <div>
            <hr className="menu-item-card-hr" />
            <p className="cart-card-description">
              {(snack.price * cart[snack.name]).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="cart-buttons">
          <button
            onClick={() => {
              updateCart(snack, 1);
            }}
            className="cart-button"
          >
            {" "}
            <span className="cart-button-words">Add 1</span>
            <span className="cart-button-symbols">+</span>{" "}
          </button>
          <button
            onClick={() => {
              updateCart(snack, -1);
            }}
            className="cart-button"
          >
            {" "}
            <span className="cart-button-words">Remove 1</span>
            <span className="cart-button-symbols">-</span>
          </button>
        </div>
      </div>
    </div>
  );
}
