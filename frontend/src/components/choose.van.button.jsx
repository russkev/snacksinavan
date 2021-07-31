import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { VanContext } from "../contexts/van.context";
import useCart from "../hooks/useCart.jsx";

export default function ChooseVanButton(props) {
  const { cart, cartSize } = useCart();
  const {setVan} = useContext(VanContext);
  function chooseVan(){
    var heading = document.getElementById("main-map-heading");
    heading.scrollIntoView();
    setVan(props.van.vanName);
  }
  if(Object.keys(cart).length !== 0 && cartSize() !== 0){
    return (
      <Link
        onClick={() => chooseVan()}
        to={{
          pathname: "/cart",
        }}
        className="primary button soft-shadow"
      >
        Select
      </Link>
    );
  } else {
    return (
      <Link
        onClick={() => chooseVan()}
        to={{
          pathname: "/menu",
        }}
        className="primary button soft-shadow"
      >
        Select
      </Link>
    );
  }
  
}