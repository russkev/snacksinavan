// Inspired by https://upmostly.com/tutorials/modal-components-react-custom-hooks
import React from "react";
import ReactDOM from "react-dom";
import useLogin from "../../hooks/useLogin";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";
import Routes from "../../routes/routes";
import Logout from "./logout.button";
import { toggleMobileNav } from "../../hooks/useModal";

function NavModal() {
  const { isAuthenticated } = useUser();
  const { toggleLoginIsOpen } = useLogin();

  function handleLoginClicked(event) {
    if (event) {
      event.preventDefault();
    }
    toggleLoginIsOpen();
    toggleMobileNav();
  }

  if (isAuthenticated) {
    return ReactDOM.createPortal(
      <>
        <div id="mobile-nav" className="nav-modal" tabIndex={-1}>
          <button
            type="button"
            className="nav-modal-close-button nav-modal-close-button-menu"
            onClick={toggleMobileNav}
          >
            &times;
          </button>
          <div className="mobile-nav-flex">
            <hr className="nav-line" />
            <Link
              onClick={toggleMobileNav}
              className="mobile-nav-link mobile-link-right"
              to={Routes.HOME.path}
            >
              Find a van
            </Link>
            <Link
              onClick={toggleMobileNav}
              className="mobile-nav-link mobile-link-right"
              to={Routes.SNACKS_MENU.path}
            >
              Menu
            </Link>
            <Link
              onClick={toggleMobileNav}
              className="mobile-nav-link mobile-link-right"
              to={Routes.CUSTOMER_ORDERS.path}
            >
              My Orders
            </Link>
            <Link
              onClick={toggleMobileNav}
              className="mobile-nav-link mobile-link-right" to={Routes.MY_INFO.path}
            >
              My Account
            </Link>
            <hr className="lower-nav-line" />
            <div className="mobile-lower-nav-link" onClick={toggleMobileNav}>
              <Logout />
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  } else {
    return ReactDOM.createPortal(
      <>
        <div id="mobile-nav" className="nav-modal" tabIndex={-1}>
          <button
            type="button"
            className="close"
            onClick={toggleMobileNav}
          >
            &times;
          </button>
          <div className="mobile-nav-flex">
            <hr className="nav-line" />
            <Link
              onClick={toggleMobileNav}
              className="mobile-nav-link mobile-link-right"
              to={Routes.HOME.path}
            >
              Find a van
            </Link>
            <Link
              onClick={toggleMobileNav}
              className="mobile-nav-link mobile-link-right"
              to={Routes.SNACKS_MENU.path}
            >
              Menu
            </Link>
            <hr className="lower-nav-line" />
            <Link to="#" onClick={handleLoginClicked} className="mobile-nav-link mobile-link-left">
              Login
            </Link>
            <Link onClick={toggleMobileNav} className="mobile-nav-link mobile-link-left" id="logged-out-mobile-nav-signup" to={Routes.SIGNUP.path}>
              Signup
            </Link>
          </div>
        </div>
      </>,
      document.body
    );
  } 
}

export default NavModal;
