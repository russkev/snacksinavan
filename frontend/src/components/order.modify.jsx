import React from "react";
import { Link } from "react-router-dom";
import Modal from "./modal";
import Routes from "../routes/routes";
import useModal from "../hooks/useModal";
import useCart from "../hooks/useCart";
import useOrder from "../hooks/useOrder";

export default function OrderModify({ timeLeftDisplay, order }) {
  const { toggle, isShowing } = useModal();
  const { setOrderCart } = useCart();
  const { handleOrderCancel } = useOrder(order);

  function changeOrder() {
    setOrderCart(order);
  }

  function cancelOrder() {
    handleOrderCancel();
    toggle();
  }

  if (order.isFulfilled || order.isCancelled) {
    return <></>;
  } else {
    return (
      <div>
        <button onClick={toggle}>Modify Order</button>
        <Modal toggleOpen={toggle} isOpen={isShowing}>
          <div className="modify">
            <button type="button" className="close" onClick={toggle}>
              &times;
            </button>
            <p>How would you like to modify your order?</p>
            <p>Time remaining to change or cancel your order: {timeLeftDisplay}</p>
            <Link
              to={Routes.SNACKS_MENU.path}
              className="primary button soft-shadow"
              onClick={changeOrder}
            >
              Change order
            </Link>
            <button onClick={cancelOrder}>Cancel order</button>
          </div>
        </Modal>
      </div>
    );
  }
}
