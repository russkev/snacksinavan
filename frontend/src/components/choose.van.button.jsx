import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { VanContext } from "../contexts/van.context";
import Routes from "../routes/routes"

export default function ChooseVanButton(props) {
  const {setVan} = useContext(VanContext);
  function chooseVan(){
    setVan(props.van.vanName);
  }
    return (
      <Link
        to={Routes.SNACKS_MENU.path}
        onClick={() => chooseVan()}
        className="primary button soft-shadow"
      >
        Select
      </Link>
    );  
}