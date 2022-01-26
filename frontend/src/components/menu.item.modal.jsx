import React, { useState, useEffect } from 'react'
import CloseIcon from "../media/close.icon";
import useGlobals from "../hooks/useGlobals";
import Modal from "./modal";
import useCart from '../hooks/useCart';

export default function MenuItemModal({toggle, isShowing, snack}) {
  const { globals } = useGlobals();
  const { cart, appendCart } = useCart();
  const [count, setCount] = useState(1);

  useEffect(() => {
    const snackId = snack["_id"]
    if (cart[snackId]) {
      setCount(cart[snackId]);
    } else {
      setCount(1)
    }
  }, [cart, snack]);
  

  if (snack.name)
  {
    return (
      <Modal toggleOpen={toggle} isOpen={isShowing}>
        <div className="menu-item-modal">
          <h3>{snack.name}</h3>
          <button type="button" className="close" onClick={toggle}>
            <svg viewBox="0 0 24 24" className="close">
              <CloseIcon />
            </svg>
          </button>
          <p>{snack.description}</p>
          <img src={snack.photo.medium} alt={snack.name} />
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
                appendCart(snack, count);
                toggle();
              }}
            >
              &#10003;
            </button>
          </section>
        </div>
      </Modal>
    );
  } else {
    return <></>
  }
}
