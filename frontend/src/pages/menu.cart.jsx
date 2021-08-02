import React from "react";
import ConfirmCart from "./cart.confirm";
import Menu from "./snacks.menu"

export default function MenuCart() {
  return (
    <div className="container">
      <div className="menu-cart">
        <article>
          <Menu/>
        </article>
        <article>
          <ConfirmCart/>
        </article>
      </div>
    </div>
  )
}