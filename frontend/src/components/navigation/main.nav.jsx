import React from "react";
import { Link } from "react-router-dom";
import Routes from "../../routes/routes";
import MobileNav from "./mobile.nav";
import LoginButton from "./login.button";
import Logout from "./logout.button";
import useUser from "../../hooks/useUser";
import "../../styling/nav.css";

export default function MainNav() {
  const { isAuthenticated } = useUser();
  // <div className="whole-app">
  //   <div className="nav">
  return (
    <nav>
      {/* <MobileNav /> */}
      <ul>
        <li>
          <Link className="nav-link" to={Routes.HOME.path}>
            Find a van
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={Routes.SNACKS_MENU.path}>
            Menu
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={Routes.CUSTOMER_ORDERS.path}>
            My Orders
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link className="nav-link" to={Routes.MY_INFO.path}>
              My Account
            </Link>
          </li>
        ) : (
          <></>
        )}
        <li>
          <LoginButton />
          <Logout />
        </li>
      </ul>
    </nav>
  );
}
