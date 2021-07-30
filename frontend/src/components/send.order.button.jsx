import React from "react";
import useCart from "../hooks/useCart";

export default function SendOrderButton(props) {
  const { cartSize, submitCart } = useCart();

  if (cartSize() > 0 && props.enabled) {
    return (
      <button onClick={submitCart} className="checkout-button checkout-button-confirm">
        Confirm
      </button>
    );
  } else {
    return (
      <button disabled className="checkout-button checkout-button-confirm de-emphasised border submit-button greyed-out">
        Confirm
      </button>
    );
  }
}
