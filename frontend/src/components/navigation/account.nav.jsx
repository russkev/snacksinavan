import React from "react"
import MobileNavButton from "./mobile.nav.button"
import Routes from "../../routes/routes";
import OrdersIcon from "../../media/orders.icon";
import AccountIcon from "../../media/account.icon";
import useUser from "../../hooks/useUser";

export default function AccountNav({toggle}) {
  const { logoutUser } = useUser();
  function OrdersButton() {
    return (
      <MobileNavButton
        path={Routes.CUSTOMER_ORDERS.path}
        icon={OrdersIcon}
        name="My Orders"
        toggle={toggle}
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
        icon={AccountIcon}
        name="My Details"
        toggle={toggle}
      />
    );
  }

  return (
    <>
      <OrdersButton />
      <AccountButton />
      <button onClick={handleLogoutClicked} className="logout">
        Logout
      </button>
    </>
  );
}