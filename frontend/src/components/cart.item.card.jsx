import React from "react";
import useCart from "../hooks/useCart";
import useSnacks from "../hooks/useSnacks";
import useGlobals from "../hooks/useGlobals";
import DeleteIcon from "../media/delete.icon";

export default function CartItemCard({ snackId }) {
  const { updateCart, deleteFromCart, cart } = useCart();
  const { snackFromId } = useSnacks();
  const { globals } = useGlobals();

  const snack = snackFromId(snackId);
  return (
    <div className="cart-item">
      <div>
        <svg
          viewBox="0 0 24 24"
          onClick={() => deleteFromCart(snackId)}
        >
          <DeleteIcon />
        </svg>
        <img src={`../${snack.photo.small}`} width="50px" alt={snackId} />
        <section>
          {snack.name}
          <div className="quantity">
            <button
              onClick={() => {
                if (cart[snackId] > 1) {
                  updateCart(snack, -1);
                }
              }}
            >
              <span>&#8722;</span>
            </button>
            <span>{cart[snackId]}</span>
            <button
              onClick={() => {
                if (cart[snackId] < globals.maxItems) {
                  updateCart(snack, 1);
                }
              }}
            >
              <span>&#43;</span>
            </button>
          </div>
        </section>
      </div>
      <h4>${(snack.price * cart[snackId]).toFixed(2)}</h4>
    </div>
  );
}
