import React from "react";
import ConfirmCart from "./cart.confirm";
import Menu from "./snacks.menu"
import "../styling/snack.menu.css";
import "../styling/cart.css";

export default function MenuCart() {
  return (
    <div className="container">
      <div className="menu-cart">
        <article>
          <Menu/>
        </article>
        <article id="confirm-cart" className="slide-menu">
          <ConfirmCart/>
        </article>
      </div>
    </div>
  )
}