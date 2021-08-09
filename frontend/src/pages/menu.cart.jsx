import React from "react";
import ConfirmCart from "./cart.confirm";
import SnacksMenu from "./snacks.menu"
import "../styling/snack.menu.css";
import "../styling/cart.css";
import useCart from "../hooks/useCart";

export default function MenuCart() {
  const { isShowing, displayMenu, displayCart } = useCart();

  return (
    <div className="container">
      <div className="menu-cart">
        <article>
          <SnacksMenu displayCart={displayCart}/>
        </article>
        <article id="confirm-cart" className="slide-menu">
          <ConfirmCart isShowing={isShowing} displayMenu={displayMenu}/>
        </article>
      </div>
    </div>
  )
}