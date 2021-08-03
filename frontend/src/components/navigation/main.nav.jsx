import React from "react";
import { Link, NavLink } from "react-router-dom";
import Routes from "../../routes/routes";
import MobileNav from "./mobile.nav";
import LoginButton from "./login.button";
import Logout from "./logout.button";
import useUser from "../../hooks/useUser";
import useLogin from "../../hooks/useLogin";
import "../../styling/nav.css";
import { toggleMobileNav } from "../../hooks/useModal";
import MenuBookIcon from "../../media/menu.book.icon";
import SearchIcon from "../../media/search.icon";

export default function MainNav() {
  const { isAuthenticated } = useUser();
  const { toggleLoginIsOpen } = useLogin();

  function handleLoginClicked(event) {
    if (event) {
      event.preventDefault();
    }
    toggleLoginIsOpen();
  }

  return (
    <nav>
      <MobileNav />
      <ul>
        <li>
          <NavLink
            className="nav-button desktop"
            activeClassName="active"
            exact
            to={Routes.HOME.path}
            onClick={(e) => e.currentTarget.blur()}
          >
            <svg viewBox="0 0 24 24">
              <SearchIcon />
            </svg>
            Find a van
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-button desktop"
            activeClassName="active"
            exact
            to={Routes.SNACKS_MENU.path}
            onClick={(e) => e.currentTarget.blur()}
          >
            <svg viewBox="0 0 24 24">
              <MenuBookIcon />
            </svg>
            Menu
          </NavLink>
        </li>
        {/* <li>
          <Link className="nav-link" to={Routes.CUSTOMER_ORDERS.path}>
            My Orders
          </Link>
        </li> */}
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
          {/* <LoginButton /> */}
          <Link onClick={handleLoginClicked} className="button">
            Login
          </Link>
          <Link className="primary button" to={Routes.SIGNUP.path}>
            Signup
          </Link>
          <Logout />
        </li>
      </ul>
    </nav>
  );
}
