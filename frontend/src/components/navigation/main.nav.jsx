import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Routes from "../../routes/routes";
import MobileNav from "./mobile.nav";
import useUser from "../../hooks/useUser";
import useLogin from "../../hooks/useLogin";
import "../../styling/nav.css";
import MenuBookIcon from "../../media/menu.book.icon";
import AccountNav from "./account.nav";
import LocationIcon from "../../media/location.icon";
import AccountCircleIcon from "../../media/account.circle.icon";
import NavLogo from "./nav.logo";

export default function MainNav() {
  const { isAuthenticated } = useUser();
  const { toggleLoginIsOpen } = useLogin();
  const [accountIsOpen, setAccountIsOpen] = useState(false);

  function handleLoginClicked(event) {
    if (event) {
      event.preventDefault();
    }
    toggleLoginIsOpen();
  }

  const toggleAccount = (event) => {
    if (event) {
      event.preventDefault();
    }
    const element = document.getElementById("account-popover");
    if (accountIsOpen) {
      element.style.display = "none";
      setAccountIsOpen(false);
    } else {
      element.style.display = "unset";
      setAccountIsOpen(true);
    }
  };

  return (
    <nav className="customer">
      <MobileNav />
      <span className="desktop">
        <ul>
          <li>
            <NavLink
              className="desktop yellow-color nav-button button"
              activeClassName="active"
              exact
              to={Routes.VAN_CHOICE.path}
              onClick={(e) => e.currentTarget.blur()}
            >
              <svg viewBox="0 0 24 24">
                <LocationIcon />
              </svg>
              Find a van
            </NavLink>
          </li>
          <li>
            <NavLink
              className="desktop yellow-color nav-button button"
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
        </ul>
        <NavLogo />
        {isAuthenticated ? (
          <span className="account">
            <Link className="desktop pink-color nav-button button" to="#" onClick={toggleAccount}>
              <svg viewBox="0 0 24 24">
                <AccountCircleIcon />
              </svg>
              My Account
            </Link>
            <div id="account-popover">
              <div className="fill popover" onClick={toggleAccount} />
              <section>
                <AccountNav toggle={toggleAccount} />
              </section>
            </div>
          </span>
        ) : (
          <span className="sign-in">
            <Link
              onClick={handleLoginClicked}
              className="desktop pink-color nav-button button"
              to="#"
            >
              Login
            </Link>
            <Link className="desktop primary nav-button button" to={Routes.SIGNUP.path}>
              Signup
            </Link>
          </span>
        )}
      </span>
    </nav>
  );
}
