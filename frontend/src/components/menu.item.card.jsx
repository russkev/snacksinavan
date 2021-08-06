import React, { useState, useEffect } from "react";
// import Modal from "./menu.modal";
import Modal from "./modal";
import useModal from "../hooks/useModal";
import useCart from "../hooks/useCart";
import useGlobals from "../hooks/useGlobals";

export default function MenuItemCard({ snack }) {
  const { isShowing, toggle } = useModal();
  const { cart, appendCart } = useCart();
  const [count, setCount] = useState(1);
  const { globals } = useGlobals();
  // !!! count should check existing cart

  useEffect(() => {
    if (cart[snack.name] && cart[snack.name]) {
      setCount(cart[snack.name]);
    }
  }, [cart, snack.name])

  return (
    <>
      <div className="menu-item-card" onClick={toggle} id={snack.name}>
        <img src={snack.photo} alt={snack.name} />
        <div>
          <section>
            <h3>{snack.name}</h3>
            <p className="menu-item-card-description">{snack.description}</p>
          </section>
          <h2>
            <div>{`$${snack.price.toFixed(2)}`}</div>
          </h2>
        </div>
      </div>

      <Modal toggleOpen={toggle} isOpen={isShowing}>
        <div className="menu-item-modal">
          <h3>{snack.name}</h3>
          <button type="button" className="close" onClick={toggle}>
            &times;
          </button>
          {/* <div> */}
            <p>{snack.description}</p>
          {/* </div> */}
          <img src={snack.photo} width="180px" alt={snack.name} />
          <p>Quantity</p>
          <div className="quantity">
            <button
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                }
              }}
            >
              <span>&#8722;</span>
            </button>

            <span>{count}</span>

            <button
              onClick={() => {
                if (count < globals.maxItems) {
                  setCount(count + 1);
                }
              }}
            >
              <span>&#43;</span>
            </button>
          </div>
          <section>
            <div>
              <h4>Total</h4>
              <h2>{`$${(snack.price * count).toFixed(2)}`}</h2>
            </div>
            <button
              className="primary soft-shadow"
              onClick={() => {
                // updateCart(snack, count);
                appendCart(snack, count);
                toggle();
              }}
            >
              &#10003;
            </button>
          </section>
        </div>
      </Modal>
    </>
  );
}
