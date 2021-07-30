// Inspired by https://upmostly.com/tutorials/modal-components-react-custom-hooks
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import useCart from "../hooks/useCart";

function Modal(props) {
  const [count, setCount] = useState(1);
  const { updateCart } = useCart();
  const isShowing = props.isShowing;
  const hide = props.hide;
  const snack = props.snack;
  if (isShowing) {
    return ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay" />
        {/* Hide if clicked outside of modal */}
        <div
          className="modal-wrapper"
          tabIndex={-1}
          onClick={() => {
            hide();
            setCount(1);
          }}
        >
          {/* Do not propogate and therefore do not hide if clicked inside */}
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modal-top" style={{ backgroundImage: "url(" + snack.photo + ")" }}>
              <button
                type="button"
                className="modal-close-button"
                onClick={() => {
                  hide();
                  setCount(1);
                }}
              >
                &times;
              </button>
            </div>
            <div className="modal-bottom">
              <div className="modal-heading">
                <h4>{snack.name}</h4>
                <h4>$&#8201;{snack.price.toFixed(2)}</h4>
              </div>
              <p className="modal-item-card-description">{snack.description}</p>
              <div className="modal-total">
                <div className="modal-amount">
                  <button
                    className="menu-modal-quant"
                    onClick={() => {
                      if (count > 1) {
                        setCount(count - 1);
                      }
                    }}
                  >
                    <span>&#8722;</span>
                  </button>
                  <span id="quantity">{count}</span>
                  <button className="menu-modal-quant" onClick={() => setCount(count + 1)}>
                    <span>&#43;</span>
                  </button>
                </div>
                <h6>${(snack.price * count).toFixed(2)}</h6>
              </div>
              <button
                className="add-to-cart"
                onClick={() => {
                  updateCart(snack, count);
                  hide();
                  setCount(1);
                }}
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>,
      document.body
    );
  } else {
    return <></>;
  }
}

export default Modal;
