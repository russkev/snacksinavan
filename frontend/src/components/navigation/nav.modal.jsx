// Inspired by https://upmostly.com/tutorials/modal-components-react-custom-hooks
import React from "react";
import useLogin from "../../hooks/useLogin";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";
import Routes from "../../routes/routes";
import MenuBookIcon from "../../media/menu.book.icon";
import SearchIcon from "../../media/search.icon";
import ChevronLeftIcon from "../../media/chevron.left.icon";
import MobileNavButton from "./mobile.nav.button";
import AccountNav from "./account.nav";

function NavModal({ toggleMobileNav, isShowing }) {
  const { isAuthenticated } = useUser();
  const { toggleLoginIsOpen } = useLogin();

  function handleLoginClicked(event) {
    if (event) {
      event.preventDefault();
    }
    toggleLoginIsOpen();
    toggleMobileNav();
  }

  function FindAVanButton() {
    return (
      <MobileNavButton
        path={Routes.HOME.path}
        icon={SearchIcon}
        name="Find a van"
        toggle={toggleMobileNav}
      />
    );
  }

  function SnacksMenuButton() {
    return (
      <MobileNavButton
        path={Routes.SNACKS_MENU.path}
        icon={MenuBookIcon}
        name="Menu"
        toggle={toggleMobileNav}
      />
    );
  }

  if (isAuthenticated) {
    return (
      <>
        {isShowing ? (
          <div className="fill loading" onClick={toggleMobileNav}>
            {" "}
          </div>
        ) : (
          <></>
        )}
        <aside id="mobile-nav" className="nav-modal" tabIndex={-1}>
          <button type="button" className="close" onClick={toggleMobileNav}>
            <svg>
              <ChevronLeftIcon />
            </svg>
          </button>
          <div>
            <h2>Snacks in a Van</h2>
            <FindAVanButton />
            <SnacksMenuButton />
          </div>
          <div>
            <h4>Account</h4>
            <hr />
            <AccountNav toggle={toggleMobileNav} />
          </div>
        </aside>
      </>
    );
  } else {
    return (
      <>
        {isShowing ? (
          <div className="fill loading" onClick={toggleMobileNav}>
            {" "}
          </div>
        ) : (
          <></>
        )}

        <aside id="mobile-nav" className="nav-modal" tabIndex={-1}>
          <button type="button" className="close" onClick={toggleMobileNav}>
            <svg>
              <ChevronLeftIcon />
            </svg>
          </button>
          <div>
            <h2>Snacks in a Van</h2>
            <FindAVanButton />
            <SnacksMenuButton />
            <hr />
          </div>
          <div>
            <Link to="#" onClick={handleLoginClicked} className="button">
              Login
            </Link>
            <Link
              onClick={toggleMobileNav}
              className="primary button soft-shadow"
              id="logged-out-mobile-nav-signup"
              to={Routes.SIGNUP.path}
            >
              Signup
            </Link>
          </div>
        </aside>
      </>
    );
  }
}

export default NavModal;
