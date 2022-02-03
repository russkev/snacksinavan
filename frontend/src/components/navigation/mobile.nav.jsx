import React from "react";
import NavModal from "./nav.modal";
import useModal, { toggleMobileNav } from "../../hooks/useModal";
import HamburgerIcon from "../../media/hamburger.icon";
import NavLogo from "./nav.logo";


export default function MobileNav() {
  const { isShowing, setIsShowing } = useModal();
  function toggle() {
    toggleMobileNav(setIsShowing)
  }

  return (
    <div className="mobile-nav">
      {/* <h5>Snacks in a Van</h5> */}
      <NavLogo />
      <span onClick={toggle}>
        <svg viewBox="0 0 24 24">
          <HamburgerIcon />
        </svg>
      </span>
      <NavModal toggleMobileNav={toggle} isShowing={isShowing} />
    </div>
  );
  }
