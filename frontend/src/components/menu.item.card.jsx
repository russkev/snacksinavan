import React from "react";
import Avatar from "./avatar";
import Modal from "./menu.modal";
import useModal from "../hooks/useModal";

export default function MenuItemCard(props) {
  const { isShowing, toggle } = useModal();
  return (
    <div className="menu-item-holder">
      <div className="menu-item-card" onClick={toggle}>
        <Avatar imageUrl={props.snack.photo} width="128px" hardRight={true} />
        <div className="menu-item-card-details">
          <div className="menu-item-card-heading">
            <h4>{props.snack.name}</h4>
            <h4>
              <div>{`$${props.snack.price.toFixed(2)}`}</div>
            </h4>
          </div>
          <hr className="menu-item-card-hr" />
          <p className="menu-item-card-description">{props.snack.description}</p>
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
    </div>
  );
}
