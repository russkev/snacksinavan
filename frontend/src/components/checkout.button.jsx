import React from "react";
import cartIcon from "../media/cart.svg";

import { Link } from "react-router-dom";
export default function CheckoutButton(props) {
  const cart = props.cart;
  const total = props.total;
  let count = 0;
  for (const key in cart) {
    count += cart[key];
  }
  if (count > 0) {
    return (
      <Link
        to={{
          pathname: "/cart",
          state: { cart: cart, total: total },
        }}
        className="checkout-button checkout-button-cart"
      >
        <div className="checkout-button-div">
          <img src={cartIcon} className="checkout-button-icon" alt="cart" />
          {count}
        </div>
      </Link>
    );
  } else {
    return null;
  }
}
