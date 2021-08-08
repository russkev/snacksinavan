import React from "react";
import { Link } from "react-router-dom";
import LoadingButton from "./loading.button";
import useCart from "../hooks/useCart";

export default function ChooseVanButton(props) {
  const {updateVan, vanChoiceLoading } = useCart();
  function chooseVan(){
    updateVan(props.van.vanName);
  }
    return (
      <LoadingButton isLoading={vanChoiceLoading}>
        <Link
          to="#"
          onClick={() => chooseVan()}
          className="primary button soft-shadow"
        >
          Select
        </Link>
      </LoadingButton>
    );  
}