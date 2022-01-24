import React from "react";
import { Link } from "react-router-dom";
import LoadingButton from "./loading.button";
import useCart from "../hooks/useCart";
import Routes from "../routes/routes";

export default function ChooseVanButton(props) {
  const { updateVan, vanChoiceLoading } = useCart();

  const chooseVan = () => {
    updateVan(props.van.vanName);
  };

  return (
    <LoadingButton isLoading={vanChoiceLoading}>
      <Link
        to={Routes.SNACKS_MENU.path}
        onClick={chooseVan}
        className="primary button soft-shadow"
      >
        Select
      </Link>
    </LoadingButton>
  );
}
