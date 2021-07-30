// Inspired by https://upmostly.com/tutorials/modal-components-react-custom-hooks
import React from "react";
import ReactDOM from "react-dom";
import useOrders from "../hooks/useOrders"
import { useHistory } from "react-router-dom";

function Modal(props) {
  const { cancelOrder } = useOrders();
  const isShowing = props.isShowing;
  const hide = props.hide;
  const order = props.order;
  const history = useHistory();
  
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
          }}
        >
          {/* Do not propogate and therefore do not hide if clicked inside */}
          <div
            className="cancel-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="cancel-modal-top">
              <button
                type="button"
                className="cancel-modal-close-button"
                onClick={() => {
                  hide();
                }}
              >
                &times;
              </button>
            </div>
            <div className="cancel-modal-bottom">
                <h4>Warning</h4>
              <p className="modal-item-card-description">You are about to cancel your whole order. Are you sure this is what you want to do?</p>
              <div className="cancel-modal-buttons">
                <button
                  className="yes-cancel"
                  onClick={() => {
                    cancelOrder(order._id);
                    history.push("/customer/orders");
                    hide();
                  }}
                >
                  <span>Yep! Cancel it.</span>
                </button>
                <button
                  className="no-cancel"
                  onClick={() => {
                    hide();
                  }}
                >
                  <span>No, keep it.</span>
                </button>
              </div>
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
