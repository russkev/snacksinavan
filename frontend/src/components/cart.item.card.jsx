import React from "react";
import useCart from "../hooks/useCart";
import useSnacks from "../hooks/useSnacks";
import useGlobals from "../hooks/useGlobals";
import DeleteIcon from "../media/delete.icon";

export default function CartItemCard({ snackName }) {
  const { updateCart, deleteFromCart, cart } = useCart();
  const { snackFromName } = useSnacks();
  const { globals } = useGlobals();

  const snack = snackFromName(snackName);
  return (
    <div className="cart-item">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="var(--dark-text)"
          onClick={() => deleteFromCart(snackName)}
        >
          <DeleteIcon />
        </svg>
        <img src={snack.photo} width="50px" alt={snackName} />
        <section>
          {snackName}
          <div className="quantity">
            <button
              onClick={() => {
                if (cart[snackName] > 1) {
                  updateCart(snack, -1);
                }
              }}
            >
              <span>&#8722;</span>
            </button>
            <span>{cart[snackName]}</span>
            <button
              onClick={() => {
                if (cart[snackName] < globals.maxItems) {
                  updateCart(snack, 1);
                }
              }}
            >
              <span>&#43;</span>
            </button>
          </div>
        </section>
      </div>
      <h4>${(snack.price * cart[snackName]).toFixed(2)}</h4>
    </div>
  );
}
