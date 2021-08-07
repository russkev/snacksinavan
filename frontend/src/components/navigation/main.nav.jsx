import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Routes from "../../routes/routes";
import MobileNav from "./mobile.nav";
import useUser from "../../hooks/useUser";
import useLogin from "../../hooks/useLogin";
import "../../styling/nav.css";
import MenuBookIcon from "../../media/menu.book.icon";
import SearchIcon from "../../media/search.icon";
import AccountNav from "./account.nav";

export default function MainNav() {
  const { isAuthenticated } = useUser();
  const { toggleLoginIsOpen } = useLogin();
  const [accountIsOpen, setAccountIsOpen] = useState(false)

  function handleLoginClicked(event) {
    if (event) {
      event.preventDefault();
    }
    toggleLoginIsOpen();
  }

  const toggleAccount = ((event) => {
    if(event) {
      event.preventDefault();
    }
    const element = document.getElementById("account-popover")
    if (accountIsOpen) {
      element.style.display = "none";
      setAccountIsOpen(false)
    } else {
      element.style.display = "unset";
      setAccountIsOpen(true)
    }
  });

  return (
    <nav className="customer">
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
          <li className="account">
            <Link className="nav-link" to="#" onClick={toggleAccount}>
              My Account
            </Link>
            <div id="account-popover">
              <div className="fill popover" onClick={toggleAccount}/>
              <section>
                <AccountNav toggle={toggleAccount} />
              </section>
            </div>
          </li>
        ) : (
          <li>
            <Link onClick={handleLoginClicked} className="button" to="#">
              Login
            </Link>
            <Link className="primary button" to={Routes.SIGNUP.path}>
              Signup
            </Link>
          </li>
        )}
        {/* <li> */}
          {/* <LoginButton /> */}
          {/* <Logout /> */}
        {/* </li> */}
      </ul>
    </nav>
  );
}
