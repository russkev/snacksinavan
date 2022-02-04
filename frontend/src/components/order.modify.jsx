import React from "react";
import { Link } from "react-router-dom";
import Modal from "./modal";
import Routes from "../routes/routes";
import useModal from "../hooks/useModal";
import useCart from "../hooks/useCart";
import useOrder from "../hooks/useOrder";
import CloseIcon from "../media/close.icon";

export default function OrderModify({ timeLeftDisplay, order }) {
  const { toggle, isShowing } = useModal();
  const { setOrderCart } = useCart();
  const { handleOrderCancel } = useOrder(order);

  function changeOrder() {
    setOrderCart(order);
  }

  function cancelOrder(event) {
    handleOrderCancel(event, timeLeftDisplay);
    toggle();
  }

  if (order.isFulfilled || order.isCancelled) {
    return <></>;
  } else {
    return (
      <div>
        <button className="secondary" onClick={toggle}>Modify Order</button>
        <Modal toggleOpen={toggle} isOpen={isShowing}>
          <button type="button" className="close" onClick={toggle}>
            <svg viewBox="0 0 24 24" className="close">
              <CloseIcon />
            </svg>
          </button>
          <div className="modify">
            <div>
              <h3>Modify order</h3>
              <p>Time remaining to change or cancel your order without fee: {timeLeftDisplay}</p>
            </div>
            <div>
              <Link
                to={Routes.SNACKS_MENU.path}
                className={`secondary button ${timeLeftDisplay ? "" : "disabled"}`}
                onClick={changeOrder}
              >
                Choose different items
              </Link>
            <button className="warning-color" onClick={cancelOrder}>CANCEL ORDER</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
