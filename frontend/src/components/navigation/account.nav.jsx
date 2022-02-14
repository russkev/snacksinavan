import React from "react";
import MobileNavButton from "./mobile.nav.button";
import Routes from "../../routes/routes";
import OrdersIcon from "../../media/orders.icon";
import useUser from "../../hooks/useUser";
import SettingsIcon from "../../media/settings.icon";

export default function AccountNav({ toggle }) {
  const { logoutUser } = useUser();

  function OrdersButton() {
    return (
      <MobileNavButton
        path={Routes.CUSTOMER_ORDERS.path}
        icon={OrdersIcon}
        name="My orders"
        toggle={toggle}
        className="orange-color"
      />
    );
  }

  function handleLogoutClicked(event) {
    if (event) {
      event.preventDefault();
    }
    logoutUser();
    toggle();
  }

  function AccountButton() {
    return (
      <MobileNavButton
        path={Routes.MY_INFO.path}
        icon={SettingsIcon}
        name="My details"
        toggle={toggle}
        className="orange-color"
      />
    );
  }

  return (
    <>
      <OrdersButton />
      <AccountButton />
      <button
        onClick={handleLogoutClicked}
        className="warning-color square nav-button button zero-bottom-margin"
      >
        Logout
      </button>
    </>
  );
}
