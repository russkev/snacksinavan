import React from "react";
import Modal from "./nav.modal";
import useModal from "../../hooks/useModal";
import { toggleMobileNav } from "../../hooks/useModal";


export default function MobileNav() {
  const { isShowing } = useModal();

  return (
    <div className="mobile-nav">
      <span className="mobile-nav-button" onClick={toggleMobileNav}>
        &#9776;
      </span>
      <span className="mobile-nav-title">Snacks in a Van</span>
      <Modal isShowing={isShowing} hide={toggleMobileNav} />
    </div>
  );
  }
