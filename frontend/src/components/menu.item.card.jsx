import React from "react";
import Modal from "./menu.modal";
import useModal from "../hooks/useModal";

export default function MenuItemCard(props) {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <div className="menu-item-card" onClick={toggle} id={props.snack.name}>
        <img src={props.snack.photo} width="180px" alt={props.snack.name} />
        <div>
          <section>
            <h3>{props.snack.name}</h3>
            <p className="menu-item-card-description">{props.snack.description}</p>
          </section>
          <h2>
            <div>{`$${props.snack.price.toFixed(2)}`}</div>
          </h2>
        </div>
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        snack={props.snack}
        cart={props.cart}
        setCart={props.setCart}
        total={props.total}
        setTotal={props.setTotal}
      />
    </>
  );
}
