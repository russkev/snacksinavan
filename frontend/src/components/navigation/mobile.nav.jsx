import React from "react";
import NavModal from "./nav.modal";
import useModal, { toggleMobileNav } from "../../hooks/useModal";


export default function MobileNav() {
  const { isShowing, setIsShowing } = useModal();
  function toggle() {
    toggleMobileNav(setIsShowing)
  }

  return (
    <div className="mobile-nav">
      <span className="mobile-nav-button" onClick={toggle}>
        &#9776;
      </span>
      <span className="mobile-nav-title">Snacks in a Van</span>
      <NavModal toggleMobileNav={toggle} isShowing={isShowing}/>
    </div>
  );
  }
