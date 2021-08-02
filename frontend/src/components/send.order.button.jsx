import React from "react";
import useCart from "../hooks/useCart";

export default function SendOrderButton(props) {
  const { cartSize, submitCart } = useCart();

  if (cartSize() > 0 && props.enabled) {
    return (
      <button onClick={submitCart} className="primary soft-shadow">
        Confirm
      </button>
    );
  } else {
    return (
      <button disabled className="primary soft-shadow disabled">
        Confirm
      </button>
    );
  }
}
