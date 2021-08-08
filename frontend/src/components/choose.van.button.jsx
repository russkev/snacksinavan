import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { VanContext } from "../contexts/van.context";
import Routes from "../routes/routes"
import LoadingButton from "./loading.button";
import useCart from "../hooks/useCart";

export default function ChooseVanButton(props) {
  // const {setVan} = useContext(VanContext);
  const {updateVan, vanChoiceLoading } = useCart();
  function chooseVan(){
    updateVan(props.van.vanName);
  }
    return (
      <LoadingButton isLoading={vanChoiceLoading}>
        <Link
          // to={Routes.SNACKS_MENU.path}
          to="#"
          onClick={() => chooseVan()}
          className="primary button soft-shadow"
        >
          Select
        </Link>
      </LoadingButton>
    );  
}