// Heavily inspired by https://upmostly.com/tutorials/modal-components-react-custom-hooks
import { useState } from "react";

export function toggleMobileNav() {
  const nodalElement = document.getElementById("mobile-nav-modal-element");
  if (nodalElement) {
    if (nodalElement.className.includes("expanded")) {
      nodalElement.className = "nav-modal-wrapper";
    } else {
      nodalElement.className = "nav-modal-wrapper nav-modal-wrapper-expanded";
    }
  }
}

function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  // Return the isShowing state and function to toggle if it is showing
  return {
    isShowing,
    toggle,
  };
}

export default useModal;
